from flask import Flask, render_template, request
from flask_cors import CORS
import text_gen  # Ensure text_gen.py is in the same directory as app.py

app = Flask(__name__)
CORS(app, resources={r"/generate": {"origins": "https://starlosearch.vercel.app"}})

@app.route('/')
def index():
    # No need to include 'templates/' since Flask automatically searches this folder
    return render_template('index.html')

@app.route('/generate', methods=['POST', 'OPTIONS'])
def generate_text():
    # Get input text from the form
    input_text = request.form['input_text']
    # Generate text using your script
    generated_text = text_gen.generate_text(input_text)  # Make sure this matches the function name in text_gen.py
    # Send the generated text back to the frontend
    return render_template('index.html', generated_text=generated_text)

if __name__ == '__main__':
    app.run(debug=True)
