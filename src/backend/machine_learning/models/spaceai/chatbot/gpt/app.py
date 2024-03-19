from flask import Flask, jsonify, request

from text_gen import generate_text

# from flask_cors import CORS

app = Flask(__name__)
# CORS(app, resources={r"/generate": {"origins": "https://starlosearch.vercel.app"}})


# @app.route("/")
# def index():
#    # No need to include 'templates/' since Flask automatically searches this folder
#    return render_template("index.html")


# @app.route("/generate", methods=["POST"])
# def generate_text():
#    input_text = request.form["input_text"]
#    generated_text = text_gen.generate_text(input_text)
#    return render_template("index.html", generated_text=generated_text)

@app.route('/chatbot', method=['POST'])
def chatbot():
    data = request.json
    prompt = data['prompt']
    response = generate_text(prompt)
    return jsonify({'response': response})


if __name__ == "__main__":
    app.run(debug=True)
