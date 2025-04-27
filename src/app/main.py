from fastapi import FastAPI, File, UploadFile
from pydantic import BaseModel
import uvicorn
from src.app.ml_model.model import load_pre_trained_model, predict_stress
from PIL import Image
import base64
from io import BytesIO

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",  # Adjust the frontend's URL if it's running on a different port
    "http://stresscope.vercel.app",  # Add additional allowed origins if necessary
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variable to hold the model
model = None

# Startup event to load the model before handling any requests
@app.on_event("startup")
async def startup():
    global model
    # Load the pre-trained model when the app starts
    model = load_pre_trained_model()
    print("Model loaded successfully!")

# Prediction endpoint to accept base64-encoded image
@app.post("/api/stress")
async def predict(data: dict):
    print(f"Received image data: {data.image}")
    return {"stressScore": 75}
    global model

    if model is None:
        model = load_pre_trained_model()
    
    base64_image = data.get("image")
    if not base64_image:
        return {"error": "No image provided"}, 400

    try:
        img_data = base64.b64decode(base64_image.split(",")[1])  
        image = Image.open(BytesIO(img_data))
        predicted_score = predict_stress(image)
        print("Predicted score: ", predicted_score)
        return {"stressScore": predicted_score}
    except Exception as e:
        return {"error": f"Error processing the image: {str(e)}"}, 500

if __name__ == "__main__":
    # Run FastAPI with Uvicorn when this script is executed
    uvicorn.run(app, host="127.0.0.1", port=8000)