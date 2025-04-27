from fastapi import FastAPI, Request
from pydantic import BaseModel
import base64
from io import BytesIO
from PIL import Image
from src.backend.ml_model.model import load_pre_trained_model, predict_stress

# FastAPI initialization
app = FastAPI()

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
        # Decode the base64 image and process it for prediction
        img_data = base64.b64decode(image_data.split(",")[1])
        image = Image.open(BytesIO(img_data))
        
        # Predict the stress score using the model
        predicted_score = predict_stress(model, np.array(image))

        # Return the stress score
        return {"stressScore": predicted_score}

    except Exception as e:
        return {"error": f"Error processing the image: {str(e)}"}, 500
