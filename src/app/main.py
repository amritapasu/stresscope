from fastapi import FastAPI, File, UploadFile
from pydantic import BaseModel
import uvicorn
from src.app.ml_model.model import load_pre_trained_model, predict_stress
from PIL import Image
import base64
from io import BytesIO

# FastAPI app
app = FastAPI()

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