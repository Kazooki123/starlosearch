from flask import Flask, render_template, request
import text_gen  # Ensure text_gen.py is in the same directory as app.py

app = Flask(__name__)

@app.route('/')
def index():
    # No need to include 'templates/' since Flask automatically searches this folder
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate_text():
    # Get input text from the form
    input_text = request.form['input_text']
    # Generate text using your script
    generated_text = text_gen.generate_text(input_text)  # Make sure this matches the function name in text_gen.py
    # Send the generated text back to the frontend
    return render_template('index.html', generated_text=generated_text)

if __name__ == '__main__':
    app.run(debug=True)
