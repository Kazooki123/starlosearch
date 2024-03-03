# Install libraries for making HTTP requests and JSON handling
import requests
import json

# Replace with your actual Google Cloud project API key
API_KEY = "YOUR_API_KEY"

# Gemini API endpoint URL
GEMINI_ENDPOINT = "https://vertex-ai.googleapis.com/v1/projects/{project_id}/locations/{location}/models/{model_name}"

def generate_text_with_gemini(prompt, project_id="search-engine-35047", location="us-central1", model_name="projects/your-project-id/locations/us-central1/models/gemini-1.0-pro"):
  """
  Calls the Gemini API to generate text based on a prompt.

  Args:
      prompt: The text prompt to provide to the model.
      project_id: Your Google Cloud project ID.
      location: The region where your Gemini model is deployed.
      model_name: The name of the Gemini model to use.

  Returns:
      A dictionary containing the generated text or an error message.
  """

  # Construct the API request URL
  url = GEMINI_ENDPOINT.format(project_id=project_id, location=location, model_name=model_name)

  # Prepare request body
  request_body = {
      "inputs": prompt
  }

  # Set headers with API key
  headers = {
      "Authorization": f"Bearer {API_KEY}"
  }

  # Send the request and handle response
  try:
      response = requests.post(url, headers=headers, json=request_body)
      response.raise_for_status()  # Raise exception for non-2xx status codes

      # Parse JSON response
      response_data = json.loads(response.text)
      generated_texts = response_data.get("outputs", [])
      
      if generated_texts:
          return generated_texts[0].get("text", "")
      else:
          return "Failed to generate text."

  except requests.exceptions.RequestException as e:
      return f"Error calling Gemini API: {e}"


# Replace with your desired prompt
prompt = "Write a short poem about a cat."

# Call the function
generated_text = generate_text_with_gemini(prompt)

# Print the generated text
print(generated_text)
