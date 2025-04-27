import numpy as np
import cv2
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.models import load_model

# Function to load pre-trained model
def load_pre_trained_model():
    # Adjust the model path according to your folder structure
    model_path = "src/backend/ml_model/fer2013_mini_XCEPTION.102-0.66.hdf5"
    
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
    # Convert the frame to grayscale
    gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

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
