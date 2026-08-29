import os
import json
import re
from flask import Flask, request, jsonify, render_template
from dotenv import load_dotenv
from groq import Groq

load_dotenv()

app = Flask(__name__)
_groq_client = None

with open("static/data/schemes.json") as f:
    SCHEMES = json.load(f)  # keyed by id: "micro", "term", "edu"

SYSTEM_PROMPT = (
    "You are a plain-language explainer for a government financial scheme portal in India. "
    "You will be given a set of FACTS about a scheme match that has ALREADY been decided by "
    "the application's rule engine. Your only job is to explain these given facts warmly and "
    "simply — you must NOT decide eligibility, NOT suggest a different scheme, NOT mention any "
    "interest rate, loan limit, document, deadline, or eligibility criterion that is not "
    "explicitly listed in the facts below. If information needed to fully answer isn't in the "
    "facts, write around it in general terms rather than inventing specifics. "
    "Respond ONLY with a valid JSON object, no markdown, no code fences, no extra text. "
    'The JSON must have exactly two string keys: "en" (English) and "hi" (Hindi), each holding '
    "the same explanation in that language."
)


def get_groq_client():
    global _groq_client
    if _groq_client is None:
        _groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))
    return _groq_client


def extract_fallback(raw):
    match = re.search(r'\{.*\}', raw, re.DOTALL)
    if match:
        try:
            return json.loads(match.group())
        except Exception:
            pass
    return None


def build_user_prompt(scheme, project_type, project_cost, income):
    cost_within_limit = project_cost <= scheme["maxLoan"]
    income_within_limit = income <= scheme["eligibility"]["maxAnnualIncome"]
    return (
        "FACTS (use only these, do not add anything else):\n"
        f"- Scheme name: {scheme['name']}\n"
        f"- Maximum loan amount: \u20b9{scheme['maxLoan']:,}\n"
        f"- Interest rate: {scheme['rate']}% per annum\n"
        f"- Moratorium period: {scheme['moratoriumMonths']} months\n"
        f"- Government coverage: {scheme['coveragePercent']}% of project cost\n"
        f"- Applicant's project type: {project_type}\n"
        f"- Applicant's estimated project cost: \u20b9{project_cost:,}\n"
        f"- Applicant's annual family income: \u20b9{income:,}\n"
        f"- Project cost is within this scheme's loan limit: {cost_within_limit}\n"
        f"- Income is within this scheme's eligibility limit: {income_within_limit}\n\n"
        "Write 3-4 short, warm sentences (no jargon, no bullet points) explaining why this "
        "specific scheme fits this specific applicant, referencing only the facts above. "
        'Reply with JSON only: {"en": "<English explanation>", "hi": "<Hindi explanation>"}'
    )


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/explain", methods=["POST"])
def explain():
    data = request.get_json(force=True)
    scheme_id    = data.get("schemeId", "")
    income       = data.get("income")
    project_cost = data.get("projectCost")
    project_type = data.get("projectType", "")

    # Look up authoritative scheme data server-side — never trust client-sent scheme facts
    scheme = SCHEMES.get(scheme_id)
    if not scheme:
        return jsonify({"error": f"Unknown schemeId: {scheme_id}"}), 400

    try:
        income = float(income)
        project_cost = float(project_cost)
        if income < 0 or project_cost < 0:
            raise ValueError
    except (TypeError, ValueError):
        return jsonify({"error": "income and projectCost must be non-negative numbers"}), 400

    user_prompt = build_user_prompt(scheme, project_type, project_cost, income)

    try:
        client = get_groq_client()
        response = client.chat.completions.create(
            model="openai/gpt-oss-120b",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user",   "content": user_prompt},
            ],
            max_tokens=800,
            temperature=0.6,
            timeout=8,  # don't let a slow AI call hang the whole request
        )
        raw = response.choices[0].message.content.strip()
        clean = re.sub(r"^```(?:json)?\s*|\s*```$", "", raw, flags=re.MULTILINE).strip()

        try:
            parsed = json.loads(clean)
        except json.JSONDecodeError:
            parsed = extract_fallback(clean)

        if not parsed:
            raise ValueError(f"Could not parse model response: {raw[:120]}")

        en_text = str(parsed.get("en", "")).strip()
        hi_text = str(parsed.get("hi", "")).strip()

        if not en_text and hi_text:
            en_text = hi_text
        if not hi_text and en_text:
            hi_text = en_text
        if not en_text:
            raise ValueError("Model returned empty explanation")

        return jsonify({"en": en_text, "hi": hi_text})

    except Exception as exc:
        # Frontend should already be showing the rule-engine's match while this loads —
        # a failure here should never block the core recommendation.
        return jsonify({"error": str(exc)}), 500


if __name__ == "__main__":
    app.run(debug=os.getenv("FLASK_DEBUG", "false").lower() == "true")