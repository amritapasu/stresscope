from fastapi import FastAPI
from pydantic import BaseModel
import base64
from io import BytesIO
from PIL import Image
from src.app.ml_model.model import load_pre_trained_model, predict_stress

# Model initialization
model = None

# Load model when the serverless function is invoked
def load_model():
    global model
    if model is None:
        model = load_pre_trained_model()
        print("Model loaded successfully!")

class StressRequest(BaseModel):
    image: str

async def handler(request):
    # Load model on first request if not already loaded
    load_model()
    
    # Parse incoming JSON
    data = await request.json()
    image_data = data.get("image")
    
    if not image_data:
        return {"error": "No image provided"}, 400
    
    try:
        # Decode base64 image and predict stress score
        img_data = base64.b64decode(image_data.split(",")[1])
        image = Image.open(BytesIO(img_data))
        predicted_score = predict_stress(image)
        return {"stressScore": predicted_score}
    
    except Exception as e:
        return {"error": f"Error processing the image: {str(e)}"}, 500