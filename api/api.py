from flask import Flask, request
import pymongo
from bson.objectid import ObjectId
from flask_cors import CORS, cross_origin
import os
from dotenv import load_dotenv
from string import capwords

load_dotenv()

# use your own api
client = pymongo.MongoClient(
    os.getenv('MONGO_CLIENT_URL'))
print(os.getenv('MONGO_CLIENT_URL'))
print(os.getenv('API_URL'))
db = client["overlord"]
col = db["characters"]
col_token = db["tokens"]

app = Flask(__name__)
# allow all cross origins with routes that start with /api/*
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})


def verify_token(token):
    verify = col_token.find_one({'token': token})
    if verify is None:
        return False
    else:
        return True


@app.route("/")
def home():
    return "Flask Overlord API - Ask admin for a token"


@app.route("/api/<token>/characters")
def get_characters(token):
    if not verify_token(token):
        return 'Invalid Token'
    characters = col.find().sort("name")
    characters = [{"_id": str(character["_id"]),
                   "name": character["name"],
                   "race": character["race"],
                   "level": character["level"],
                   "job": character["job"],
                   "residence": character["residence"],
                   "alignment": character["alignment"],
                   "img": character["img"]
                   }
                  for character in
                  characters]
    return {"characters": characters}


@app.route("/api/<token>/characters/<id>")
def get_character(id, token):
    if not verify_token(token):
        return 'Invalid Token'
    if not ObjectId.is_valid(id):
        return {"message": "Invalid ID"}
    find = {"_id": ObjectId(id)}
    character = col.find_one(find)
    if character is None:
        return {"error": "character not found"}

    character = {"_id": str(character["_id"]),
                 "name": character["name"],
                 "race": character["race"],
                 "level": character["level"],
                 "job": character["job"],
                 "residence": character["residence"],
                 "alignment": character["alignment"],
                 "img": character["img"]
                 }
    return character


@app.route("/api/<token>/search/<name>")
def search_character(name, token):
    if not verify_token(token):
        return 'Invalid Token'
    find = {"name": {"$regex": f'^{name.title()}'}}
    character = col.find_one(find)
    # character = col.find_one({'name': re.compile('^' + name + '$', re.IGNORECASE)})
    if character is None:
        return {"error": "character not found"}

    character = {"_id": str(character["_id"]),
                 "name": character["name"],
                 "race": character["race"],
                 "level": character["level"],
                 "job": character["job"],
                 "residence": character["residence"],
                 "alignment": character["alignment"],
                 "img": character["img"]
                 }
    return character


@app.route("/api/<token>/characters", methods=["POST"])
def add_character(token):
    if not verify_token(token):
        return 'Invalid Token'
    character = {
        "name": request.json["name"].title(),
        "race": request.json["race"].title(),
        "level": request.json["level"].title(),
        "job": request.json["job"].title(),
        "residence": request.json["residence"].title(),
        "alignment": request.json["alignment"].title(),
        "img": request.json["img"]
    }

    col.insert_one(character)
    return {"message": "character created"}


@app.route("/api/<token>/characters", methods=["PUT"])
def update_character(token):
    if not verify_token(token):
        return 'Invalid Token'
    id = request.json["_id"]
    if not ObjectId.is_valid(id):
        return {"message": "Invalid ID"}
    to_update = {
        "_id": ObjectId(id)
    }
    values = {"$set": {
        "name": request.json["name"],
        "race": request.json["race"],
        "level": request.json["level"],
        "job": request.json["job"],
        "residence": request.json["residence"],
        "alignment": request.json["alignment"],
        "img": request.json["img"]
    }}
    col.update_one(to_update, values)
    return {"message": "character updated"}


@app.route("/api/<token>/characters/<id>", methods=["DELETE"])
def delete_character(id, token):
    if not verify_token(token):
        return 'Invalid Token'
    to_delete = {
        "_id": ObjectId(id)
    }
    col.delete_one(to_delete)
    return {"message": "character deleted"}


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
