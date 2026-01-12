from flask import Flask, request, jsonify
from flask_cors import CORS
from forensics import AntigravityEngine
from domains import get_interpreter
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend integration

engine = AntigravityEngine()

@app.route('/verify', methods=['POST'])
def verify_image():
    if 'image' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400
    
    image = request.files['image']
    domain = request.form.get('domain', 'fake-news')
    
    # Read image data (simulated processing)
    image_data = image.read()
    
    # Process through forensics engine
    result = engine.process(image_data)
    
    # Add domain-specific insight
    interpreter = get_interpreter(domain)
    result["domain_insight"] = interpreter.interpret(result)
    
    return jsonify(result)

if __name__ == '__main__':
    app.run(port=5000, debug=True)
