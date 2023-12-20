from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/v1/users", methods=["GET"])
def users():
    return jsonify({"users": ["user1", "user2", "user3"]})

@app.route("/api/v1/users/<user_id>", methods=["GET"])
def user(user_id):
    return jsonify({"user": {"id": user_id, "name": "user{}".format(user_id)}})

@app.route("/api/v1/users", methods=["POST"])
def create_user():
    user = request.get_json()
    return jsonify({"user": user})

@app.route("/api/v1/users/<user_id>", methods=["PUT"])
def update_user(user_id):
    user = request.get_json()
    return jsonify({"user": user})

@app.route("/api/v1/users/<user_id>", methods=["DELETE"])
def delete_user(user_id):
    return jsonify({"success": True})
