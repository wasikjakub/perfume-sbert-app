from flask import Blueprint, request, jsonify
from sqlalchemy import create_engine, text
import pandas as pd
from flask_cors import CORS
from backend.services.recommender import PerfumeRecommender
from backend.services.quiz_recommender import QuizRecommender
from dotenv import load_dotenv
import os

load_dotenv()

username = os.getenv("DB_USER")
password = os.getenv("DB_PASSWORD")
host =  os.getenv("DB_HOST")
port = os.getenv("DB_PORT")
database =  os.getenv("DB_DATABASE")

api = Blueprint('api', __name__)
CORS(api)

connection_string = f'mysql+pymysql://{username}:{password}@{host}:{port}/{database}'
engine = create_engine(connection_string)

@api.route('/api/recommend', methods=['POST'])
def recommend_perfumes():
    data = request.get_json()
    user_prompt = data.get("prompt", "").strip()

    if not user_prompt:
        return jsonify({"error": "No prompt provided"}), 400

    query = text("SELECT * FROM Perfumes")
    with engine.connect() as connection:
        result = connection.execute(query)
        perfumes = [dict(row._mapping) for row in result]

    df = pd.DataFrame(perfumes)

    if df.empty or 'Name' not in df.columns:
        return jsonify({"error": "No valid perfume data found"}), 500

    recommender = PerfumeRecommender(df)
    recommendations = recommender.recommend(user_prompt)

    return jsonify(recommendations)


@api.route('/api/quiz', methods=['POST'])
def quiz():
    data = request.get_json()
    preferences = data.get("preferences", {})

    if not preferences:
        return jsonify({"error": "No preferences provided"}), 400

    query = text("SELECT * FROM Perfumes")
    with engine.connect() as connection:
        result = connection.execute(query)
        perfumes = [dict(row._mapping) for row in result]

    df = pd.DataFrame(perfumes)

    if df.empty or 'Name' not in df.columns:
        return jsonify({"error": "No valid perfume data found"}), 500

    recommender = QuizRecommender(df)
    recommendations = recommender.recommend(preferences)

    return jsonify(recommendations)
