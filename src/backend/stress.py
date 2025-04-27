from fastapi import FastAPI, Request
from pydantic import BaseModel
import numpy as np
import cv2
import base64
from io import BytesIO
from PIL import Image
from .ml_model.model import load_pre_trained_model, predict_stress, calculate_stress_level
from fastapi.middleware.cors import CORSMiddleware

# FastAPI initialization
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specify your frontend URL here
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Model initialization
model = None

# Load model when the serverless function is invoked
def load_model():
    global model
    if model is None:
        model = load_pre_trained_model()
        print("Model loaded successfully!")

# Pydantic model to parse incoming data
class StressRequest(BaseModel):
    image: str

# Optionally, you can add a health check or root endpoint:
@app.get("/")
async def read_root():
    return {"message": "Welcome to the Stress API"}

# Define the endpoint to process the image and get the stress score
@app.post("/api/stress")
async def handler(request: Request):
    # Load model on first request if not already loaded
    load_model()

    # Parse incoming JSON
    data = await request.json()
    image_data = data.get("image")

    if not image_data:
        return {"error": "No image provided"}, 400

    try:
        """
        # Decode the base64 image and process it for prediction
        img_data = base64.b64decode(image_data.split(",")[1])
        image = Image.open(BytesIO(img_data))

        image_np = np.array(image)

        if image_np.shape[-1] == 4:
            image_np = cv2.cvtColor(image_np, cv2.COLOR_RGBA2RGB)

        # Predict the stress score using the model
        predicted_score = predict_stress(model, image)
        print("Predicted score:", predicted_score)
        """
       
        #stress_level = calculate_stress_level(predicted_score)
        stress_level = 75
        print("Stress level:", stress_level)

        # Return the stress score
        return {"stressScore": stress_level}

    except Exception as e:
        return {"error": f"Error processing the image: {str(e)}"}, 500
