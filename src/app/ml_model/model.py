import numpy as np
import cv2
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.models import load_model

def load_pre_trained_model():
    model_path = "src/app/ml_model/fer2013_mini_XCEPTION.102-0.66.hdf5"
    pre_trained_model = load_model(model_path, compile=False)

    learning_rate = 0.0001  # Use the same learning rate as before
    pre_trained_model.compile(optimizer=Adam(learning_rate=learning_rate), loss='categorical_crossentropy', metrics=['accuracy'])
    return pre_trained_model

# Initialize lists to store image data and labels
emotion_vec = []
labels = []

def preprocess_input(x):
    x = x / 255.0  # Normalize to [0, 1]
    x = x - 0.5    # Center to [-0.5, 0.5]
    x = x * 2.0    # Scale to [-1, 1]
    return x

def predict_stress(model, frame):
    # Convert to grayscale
    gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Resize to (64, 64)
    resized_frame = cv2.resize(gray_frame, (64, 64))

    # Preprocess frame for model (grayscale)
    resized_frame = preprocess_input(resized_frame)

    # Add batch dimension (1 sample in batch)
    resized_frame = np.expand_dims(resized_frame, axis=0)  # Add batch dimension
    resized_frame = np.expand_dims(resized_frame, axis=-1)  # Add channel dimension

    preds = model.predict(frame, verbose=0)

    return preds[0]