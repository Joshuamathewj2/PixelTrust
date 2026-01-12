from flask import Flask, request, jsonify
from flask_cors import CORS
from forensics import AntigravityEngine
from domains import get_interpreter

app = Flask(__name__)
CORS(app)

engine = AntigravityEngine()

@app.route("/", methods=["GET"])
def health_check():
    return jsonify({"status": "PixelTrust backend running"}), 200

@app.route('/verify', methods=['POST'])
def verify_image():
    if 'image' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400
    
    image = request.files['image']
    domain = request.form.get('domain', 'fake-news')
    
    image_data = image.read()
    result = engine.process(image_data)
    
    interpreter = get_interpreter(domain)
    result["domain_insight"] = interpreter.interpret(result)
    
    return jsonify(result)
