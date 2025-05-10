from backend.services.recommender import PerfumeRecommender

def preferences_to_prompt(preferences: dict) -> str:
    prompt_parts = []

    if "scents" in preferences:
        prompt_parts.append("I like " + ", ".join(preferences["scents"]) + " scents")

    if "context" in preferences:
        prompt_parts.append("I'm looking for a fragrance suitable for " + ", ".join(preferences["context"]))

    if "season" in preferences:
        prompt_parts.append("Best for " + preferences["season"] + " season")

    if "intensity" in preferences:
        prompt_parts.append("with " + preferences["intensity"].lower() + " intensity")

    return ". ".join(prompt_parts) + "."

class QuizRecommender:
    def __init__(self, df):
        self.df = df

    def recommend(self, preferences: dict):
        prompt = preferences_to_prompt(preferences)
        recommender = PerfumeRecommender(self.df)
        return recommender.recommend(prompt)