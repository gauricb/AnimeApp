from transformers import pipeline
from transformers import LongformerTokenizer, LongformerForSequenceClassification
from fastapi import FastAPI, HTTPException
from typing import List
import httpx
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/analyze_sentiment")
async def analyze_sentiment(id: int):
    # Load the pre-trained sentiment analysis model
    sentiment_analyzer = pipeline("sentiment-analysis")

    cleaned_reviews = []
    cleaned_reviews = await get_anime_reviews(id)

    num_positive_reviews = 0
    num_negative_reviews = 0
    num_reviews = len(cleaned_reviews)

    result = sentiment_analyzer(cleaned_reviews)

    # from result array we can get the label and score
    for r in result:
        if r["label"] == "POSITIVE":
            num_positive_reviews += 1
        else:
            num_negative_reviews += 1

    percent_positive = (num_positive_reviews / num_reviews) * 100
    percent_negative = (num_negative_reviews / num_reviews) * 100

    return {
        "percent_positive_reviews": round(percent_positive),
        "percent_negative_reviews": round(percent_negative),
        "num_positive_reviews": round(num_positive_reviews),
        "num_negative_reviews": round(num_negative_reviews),
    }


def get_reviews_from_json(json_object):
    reviews = []

    if "data" in json_object:
        data = json_object["data"]
        for entry in data:
            if "review" in entry:
                review_text = entry["review"]
                review_text = truncate_text(review_text, 512)
                reviews.append(review_text)

    return reviews


def truncate_text(text, max_length):
    if len(text) > max_length:
        # Truncate text to fit within the maximum length
        truncated_text = text[:max_length]
        return truncated_text
    else:
        return text


async def get_anime_reviews(id: int):
    url = f"https://api.jikan.moe/v4/anime/{id}/reviews"

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url)
            response.raise_for_status()  # Raise an exception for HTTP errors

            json_data = response.json()
            reviews = get_reviews_from_json(json_data)
            return reviews

    except httpx.RequestError as error:
        print(f"Error fetching anime reviews: {error}")
        # Handle the error or return a default value
        return None
