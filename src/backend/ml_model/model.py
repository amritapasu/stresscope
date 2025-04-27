import numpy as np
import cv2
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.models import load_model
from PIL import Image

# Function to load pre-trained model
def load_pre_trained_model():
    # Adjust the model path according to your folder structure
    model_path = "./backend/ml_model/fer2013_mini_XCEPTION.102-0.66.hdf5"
    
    # Load the model
    pre_trained_model = load_model(model_path, compile=False)

    # Compile the model with an Adam optimizer
    learning_rate = 0.0001  # Use the same learning rate as before
    pre_trained_model.compile(optimizer=Adam(learning_rate=learning_rate), 
                              loss='categorical_crossentropy', metrics=['accuracy'])
    
    return pre_trained_model

# Preprocess the input image (normalize and scale)
def preprocess_input(x):
    x = x / 255.0  # Normalize to [0, 1]
    x = x - 0.5    # Center to [-0.5, 0.5]
    x = x * 2.0    # Scale to [-1, 1]
    return x

# Function to predict stress score based on the frame
def predict_stress(model, frame):
    print("Predicting...")

    # Convert PIL Image to NumPy array (BGR format, OpenCV expects this)
    frame_np = np.array(frame)

    # Convert from RGB to BGR (Pillow uses RGB, OpenCV uses BGR by default)
    frame_bgr = cv2.cvtColor(frame_np, cv2.COLOR_RGB2BGR)

    # Convert to grayscale
    gray_frame = cv2.cvtColor(frame_bgr, cv2.COLOR_BGR2GRAY)

    # Resize the frame to 64x64 pixels (input size expected by the model)
    resized_frame = cv2.resize(gray_frame, (64, 64))

    # Preprocess the resized frame
    resized_frame = preprocess_input(resized_frame)

    # Add batch dimension (1 sample in batch)
    resized_frame = np.expand_dims(resized_frame, axis=0)  # Add batch dimension
    resized_frame = np.expand_dims(resized_frame, axis=-1)  # Add channel dimension (for grayscale)

    # Make prediction using the model
    preds = model.predict(resized_frame, verbose=0)

    return preds[0]

def calculate_stress_level(emotion_probs):
    Angry, Disgust, Fear, Happy, Sad, Surprise, Neutral = emotion_probs
    stress_level = 0.4 * Angry + 0.3 * Fear + 0.2 * Sad + 0.1 * Disgust - 0.3 * Happy - 0.1 * Neutral
    stress_level = np.clip(stress_level, 0, 1)
    return int(stress_level * 100)
