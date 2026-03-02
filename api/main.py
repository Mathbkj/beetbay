from dotenv import load_dotenv

load_dotenv()

import os
ITUNES_URL = os.environ.get("ITUNES_URL")

from flask import Flask,jsonify,request
from flask_cors import CORS
from bs4 import BeautifulSoup

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DATABASE_URL")
app.config['SECRET_KEY'] = os.environ.get("SECRET_KEY")

from models.db import database

database.init_app(app)

with app.app_context():
    database.create_all()

CORS(app,origins=[os.environ.get("FRONTEND_URL")])

import requests

musics = []

from models.user import User

@app.get('/api/releases')
def get_releases():
    headers = {'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}    
    response = requests.get(ITUNES_URL,headers=headers)
    parsed = BeautifulSoup(response.text,'html.parser')
    items = parsed.find_all('div',class_='feed-item')
    for item in items:
        title = item.find('cite',class_='title').text
        artist = item.find('em',class_='artist').text
        audio_src = item.find('source').get('src')
        image_src = item.find('img').get('src')
        musics.append({
            'ranking':len(musics)+1,
            'title': title,
            'artist': artist,
            'audio_src': audio_src,
            'cover': image_src
        })  
    return jsonify({'message':'Succesfully fetched songs','musics':musics})

@app.get('/api/releases/<int:ranking>')
def get_music_by_ranking(ranking):
    music = next((m for m in musics if m['ranking']==ranking),None)
    if not music:
        return jsonify({'message':'Music not found'})
    return jsonify({'message':'Succesfully fetched song','music':music})
    
@app.post('/api/users')
async def create_user(user:User):
    body = request.get_json()
    print(body)

    return jsonify({'message':'Account created successfully'})
if __name__ == '__main__':
    app.run(debug=True)
    