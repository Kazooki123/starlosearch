from flask import Flask, render_template, request

from vector import get_results_from_pinecone

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/search", methods=["POST"])
def search():
    query = request.form.get("query")
    results = get_results_from_pinecone(query)
    return render_template("index.html", results=results)


if __name__ == "__main__":
    app.run(debug=True)
