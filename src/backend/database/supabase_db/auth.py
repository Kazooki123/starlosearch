import os
from flask import Flask, redirect, render_template, request, session, url_for

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY")

@app.route("/")
def index():
    if "user" in session:
        return render_template("index.html", user=session["user"])
    else:
        return render_template("login.html")

@app.route("/login", methods=["POST"])
def login():
    username = request.form["username"]
    password = request.form["password"]

    if username == "user" and password == "password":
        session["user"] = username
        return redirect(url_for("index"))
    else:
        return render_template("login.html", error="Invalid credentials")

@app.route("/logout")
def logout():
    session.pop("user", None)
    return redirect(url_for("index"))
