# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from src.Python.Machine_Learning.image_recognition import process_images  # Adjust the import path

# app = Flask(__name__)
# CORS(app)

# @app.route('/image_recognition', methods=['POST'])
# def image_recognition():
    # data = request.get_json()
    # image_urls = data['image_urls']
    
    # recognition_result = process_images(image_urls)
    
    # return jsonify(result=recognition_result)

# if __name__ == '__main__':
    # app.run()
