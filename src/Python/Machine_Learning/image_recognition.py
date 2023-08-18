import os
from google.cloud import vision
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

def detect_nsfw(image_path):
    # Set up the Vision API client using environment variables
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = os.getenv('GOOGLE_APPLICATION_CREDENTIALS')
    client = vision.ImageAnnotatorClient()

    # Load the image
    with open(image_path, 'rb') as image_file:
        content = image_file.read()

    # Perform image content analysis
    image = vision.Image(content=content)
    response = client.safe_search_detection(image=image)
    
    # Check if the image contains NSFW content
    nsfw_likelihood = response.safe_search_annotation.nsfw_likelihood
    return nsfw_likelihood

if __name__ == '__main__':
    image_path = 'Images\\furrygirl.jpg'
    nsfw_likelihood = detect_nsfw(image_path)

    if nsfw_likelihood == vision.Likelihood.LIKELY or nsfw_likelihood == vision.Likelihood.VERY_LIKELY:
        print("NSFW content detected")
    else:
        print("SFW content detected")
