from flask import Flask, render_template, request
from transformers import pipeline

import text_gen

app = Flask(__name__)

chat_history = []
sentiment_pipeline = pipeline(
    "text-classification", model="distilbert-base-uncased-finetuned-sst-2-english"
)


@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        user_input = request.form["user_input"]
        bot_response = text_gen.generate_text(user_input)
        chat_history.append({"sender": "user", "text": user_input})
        chat_history.append({"sender": "bot", "text": bot_response})

        sentiment = sentiment_pipeline(bot_response)[0]["label"]
        print(f"Sentiment score: {sentiment}")

    return render_template("index.html", chat_history=chat_history)


@app.route("/generate_response", methods=["POST"])
def generate_response():
    user_input = request.form["user_input"]
    bot_response = text_gen.generate_text(user_input)
    chat_history.append({"sender": "user", "text": user_input})
    chat_history.append({"sender": "bot", "text": bot_response})

    sentiment = sentiment_pipeline(bot_response)[0]["label"]
    print(f"Sentiment score: {sentiment}")

    return render_template("index.html", chat_history=chat_history)


if __name__ == "__main__":
    app.run(debug=True)
