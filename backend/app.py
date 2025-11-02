import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import google.generativeai as genai
from googlesearch import search

# ----------------------------
# Load environment variables
# ----------------------------
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("⚠️ No GEMINI_API_KEY found in .env file")

genai.configure(api_key=GEMINI_API_KEY)

# ----------------------------
# Initialize Flask
# ----------------------------
app = Flask(__name__)
CORS(app)

# ----------------------------
# Helper Functions
# ----------------------------

def google_query_summary(query, num_results=3):
    """Perform Google search and summarize the top results using Gemini."""
    try:
        links = list(search(query, num_results=num_results, stop=num_results, pause=1))
    except Exception as e:
        print("⚠️ Google search failed:", e)
        links = []

    model = genai.GenerativeModel(model_name="gemini-2.5-flash")
    summaries = []

    if not links:
        response = model.generate_content(f"Summarize briefly: {query}")
        return [{"link": "N/A", "summary": response.text.strip()}]

    for link in links:
        prompt = f"""
        Summarize the webpage at {link} in 3–5 short bullet points.
        Focus only on points relevant to: "{query}".
        Output plain bullet points.
        """
        try:
            response = model.generate_content(prompt)
            summaries.append({"link": link, "summary": response.text.strip()})
        except Exception as e:
            summaries.append({"link": link, "summary": "Summary unavailable."})

    return summaries


def market_intelligence_summary(product):
    """Generate dynamic pros and cons for top 5 trade countries."""
    countries = ["Germany", "Mexico", "United States", "Indonesia", "Vietnam"]
    model = genai.GenerativeModel(model_name="gemini-2.5-flash")
    results = []

    for country in countries:
        prompt = f"""
        Analyze exporting "{product}" to {country}.
        Provide exactly 3 bullet points each for Pros and Cons.
        Return valid JSON format:
        {{
            "Country": "{country}",
            "Pros": ["...", "...", "..."],
            "Cons": ["...", "...", "..."]
        }}
        """
        try:
            response = model.generate_content(prompt)
            data = json.loads(response.text)
        except Exception:
            data = {
                "Country": country,
                "Pros": ["High demand", "Good logistics", "Stable trade policy"],
                "Cons": ["Import tariffs", "Local competition", "Certification rules"]
            }
        data["demand_index"] = 100 - countries.index(country) * 15
        results.append(data)

    return results


def hs_code_lookup(product):
    """Get HS code classification summaries."""
    query = f"{product} HS code classification and export category"
    return google_query_summary(query, num_results=3)


def tariff_policies_summary(country, product):
    """Summarize tariffs and trade policies for given product and country."""
    query = f"{country} {product} import export tariff and trade policies 2025"
    policies = google_query_summary(query, num_results=3)
    base_value = 1000  # Example
    tariff_rate = 5.0
    tariff_amount = base_value * tariff_rate / 100
    return {
        "tariff_rate": tariff_rate,
        "tariff_amount_usd": tariff_amount,
        "policies": policies
    }


def product_recommendations_by_country(country):
    """Get top 5 products in demand for a given country dynamically."""
    query = f"top 5 most demanded export products in {country} 2025 with reasons"
    summaries = google_query_summary(query, num_results=3)

    model = genai.GenerativeModel(model_name="gemini-2.5-flash")
    prompt = f"""
    Based on the following data, list top 5 export products for {country}.
    For each product, provide a short 'summary' and 'tips'.
    Return valid JSON list:
    [
      {{"title": "...", "summary": "...", "tips": "..."}},
      ...
    ]
    Data: {summaries}
    """
    try:
        response = model.generate_content(prompt)
        return json.loads(response.text)
    except Exception:
        return [
            {"title": "Electronics", "summary": "High demand for tech gadgets.", "tips": "Focus on quality assurance."},
            {"title": "Textiles", "summary": "Growing fashion exports.", "tips": "Highlight sustainable materials."},
            {"title": "Pharmaceuticals", "summary": "Strong healthcare imports.", "tips": "Ensure compliance and safety."},
            {"title": "Machinery", "summary": "Industrialization surge.", "tips": "Promote heavy-duty equipment."},
            {"title": "Food Products", "summary": "Organic goods on rise.", "tips": "Market healthy and local options."}
        ]


# ----------------------------
# API Routes
# ----------------------------

@app.route("/news", methods=["GET"])
def news():
    query = "latest global trade and export news 2025"
    return jsonify(google_query_summary(query, num_results=5))


@app.route("/market-intelligence", methods=["POST"])
def market_intelligence():
    data = request.json
    product = data.get("product", "").strip()
    if not product:
        return jsonify({"error": "No product provided"}), 400

    results = market_intelligence_summary(product)
    forecast_data = [
        {"year": 2024, "demand": 200000},
        {"year": 2025, "demand": 350000},
        {"year": 2026, "demand": 500000},
        {"year": 2027, "demand": 650000},
        {"year": 2028, "demand": 800000}
    ]
    return jsonify({"product": product, "results": results, "forecast_data": forecast_data})


@app.route("/hs-code", methods=["POST"])
def hs_code():
    data = request.json
    product = data.get("product", "").strip()
    if not product:
        return jsonify({"error": "No product provided"}), 400
    return jsonify(hs_code_lookup(product))


@app.route("/tariff-policies", methods=["POST"])
def tariff_policies():
    data = request.json
    product = data.get("product", "").strip()
    country = data.get("country", "").strip()
    if not product or not country:
        return jsonify({"error": "Product and country required"}), 400
    return jsonify(tariff_policies_summary(country, product))


@app.route("/documentation", methods=["GET"])
def documentation():
    query = "global trade export import documentation requirements 2025"
    return jsonify(google_query_summary(query, num_results=5))


@app.route("/product-recommender", methods=["POST"])
def product_recommender_route():
    data = request.json
    country = data.get("country", "").strip()
    if not country:
        return jsonify({"error": "Country required"}), 400

    try:
        products = product_recommendations_by_country(country)
        return jsonify({"country": country, "products": products})
    except Exception as e:
        print("⚠️ Product recommendation failed:", e)
        # fallback static response
        fallback_products = [
            {"title": "Electronics", "summary": "High demand for tech gadgets.", "tips": "Focus on quality assurance."},
            {"title": "Textiles", "summary": "Growing fashion exports.", "tips": "Highlight sustainable materials."},
            {"title": "Pharmaceuticals", "summary": "Strong healthcare imports.", "tips": "Ensure compliance and safety."},
            {"title": "Machinery", "summary": "Industrialization surge.", "tips": "Promote heavy-duty equipment."},
            {"title": "Food Products", "summary": "Organic goods on rise.", "tips": "Market healthy and local options."}
        ]
        return jsonify({"country": country, "products": fallback_products})

@app.route("/match-making", methods=["POST"])
def match_making():
    data = request.json
    product = data.get("product", "").strip()
    if not product:
        return jsonify({"error": "Product required"}), 400

    model = genai.GenerativeModel(model_name="gemini-2.5-flash")
    prompt = f"""
    For the product "{product}", identify 5 best country pairs for trade matchmaking.
    Each entry should have:
    - exporting_country
    - importing_country
    - reason
    Return valid JSON list:
    [
      {{"exporting_country": "...", "importing_country": "...", "reason": "..."}},
      ...
    ]
    """

    try:
        response = model.generate_content(prompt)
        pairs = json.loads(response.text)
    except Exception:
        pairs = [
            {"exporting_country": "India", "importing_country": "Germany", "reason": "Strong machinery import demand."},
            {"exporting_country": "Vietnam", "importing_country": "USA", "reason": "High textile export synergy."},
            {"exporting_country": "Brazil", "importing_country": "UK", "reason": "Coffee import growth."},
            {"exporting_country": "Indonesia", "importing_country": "Japan", "reason": "Electronics and parts trade."},
            {"exporting_country": "Mexico", "importing_country": "Canada", "reason": "Automotive supply chain integration."}
        ]

    return jsonify({"product": product, "matches": pairs})



# ----------------------------
# Run Flask
# ----------------------------
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # Get port from environment or default 5000
    app.run(host="0.0.0.0", port=port, debug=True)
