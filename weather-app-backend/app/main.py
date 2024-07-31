from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import requests
import os

load_dotenv()

weather_api_key = os.getenv('WEATHER_API_KEY')
weather_base_url = os.getenv('BASE_URL')
app = FastAPI()

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/weather/{city}")
def get_weather(city: str):
    url = f"{weather_base_url}?q={city}&appid={weather_api_key}&units=metric"
    response = requests.get(url)
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail="Error fetching weather data")
    return response.json()

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8000)