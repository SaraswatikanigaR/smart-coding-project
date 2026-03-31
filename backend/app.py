from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import time

app = Flask(__name__)
CORS(app)  # Allow frontend fetches

# Load users.json
try:
    with open("users.json") as f:
        users = json.load(f)
except:
    users = {}

# Submit practice
@app.route("/api/practice/<user_id>/submit", methods=["POST"])
def submit_practice(user_id):
    data = request.json
    correct = data.get("correct", False)
    topic = data.get("topic")
    duration = data.get("duration", 0)  # seconds spent in this session

    user = users.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    # Update streak & problems solved
    user["streak"] = user.get("streak", 0) + 1 if correct else 0
    user["problemsSolved"] = user.get("problemsSolved", 0) + 1

    # Update topic progress
    if topic in user["topicsProgress"]:
        user["topicsProgress"][topic] = min(user["topicsProgress"][topic] + (10 if correct else 2), 100)

    # Update active coding time
    user["activeCodingTime"] = user.get("activeCodingTime", 0) + duration

    # Save
    with open("users.json", "w") as f:
        json.dump(users, f, indent=4)

    return jsonify({"updatedUser": user})


# Get user
@app.route("/api/user/<user_id>", methods=["GET"])
def get_user(user_id):
    user = users.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify(user)


# Leaderboard
@app.route("/api/leaderboard", methods=["GET"])
def leaderboard():
    leaderboard = sorted(users.values(), key=lambda x: x["xp"], reverse=True)
    return jsonify(leaderboard)


# Get all problems (including hot question)
@app.route("/api/problems", methods=["GET"])
def get_problems():
    try:
        with open("problems.json") as f:
            problems = json.load(f)
    except:
        problems = []
    return jsonify(problems)


if __name__ == "__main__":
    app.run(port=5000, debug=True)