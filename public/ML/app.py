from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
import os

# Disable automatic .env loading
os.environ['FLASK_SKIP_DOTENV'] = '1'

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# Load the pre-trained classification model
classification_model = pickle.load(open('model/classification_model.pkl', 'rb'))

# Define the feature names in the correct order
feature_names = [
    'reading_speed',
    'task_difficulty',
    'reading_comprehension',
    'engagement_level',
    'error_rate',
    'task_completion_time',
    'mood_engagement_score',
    'success_rate'
]

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Parse user data from request
        data = request.get_json()
        print('Received Data:', data)

        # Validate the number of features
        if len(data['features']) != len(feature_names):
            raise ValueError(f"Expected {len(feature_names)} features, but got {len(data['features'])}")

        # Create a DataFrame with the correct feature names
        features = pd.DataFrame([data['features']], columns=feature_names)
        print('Features for Prediction:', features)

        # Perform classification prediction
        probabilities = classification_model.predict_proba(features).tolist()
        print('Predicted Probabilities:', probabilities)

        # Return predictions
        return jsonify({'probabilities': probabilities})
    except Exception as e:
        print('Error:', str(e))
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)