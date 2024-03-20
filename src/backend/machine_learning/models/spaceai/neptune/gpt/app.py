from flask import Flask, render_template, request

import text_gen

app = Flask(__name__)

chat_history = []


@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        user_input = request.form["user_input"]
        bot_response = text_gen.generate_text(user_input)
        chat_history.append({"sender": "user", "text": user_input})
        chat_history.append({"sender": "bot", "text": bot_response})

    return render_template("index.html", chat_history=chat_history)


@app.route("/generate_response", methods=["POST"])
def generate_response():
    user_input = request.form["user_input"]
    bot_response = text_gen.generate_text(user_input)
    chat_history.append({"sender": "user", "text": user_input})
    chat_history.append({"sender": "bot", "text": bot_response})
    return render_template("index.html", chat_history=chat_history)


if __name__ == "__main__":
    app.run(debug=True)
