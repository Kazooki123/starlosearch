import requests
import pinecone
from dotenv import load_dotenv
import os

load_dotenv()

# PINECONE KEYS
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
PINECONE_INDEX_NAME = 'search'
PINECONE_ENVIRONMENT = 'gcp-starter'

# Pinecone API endpoint
PINECONE_API_URL = f'https://pinecone.{PINECONE_ENVIRONMENT}.pinecone.io'

def initialize_pinecone():
    # Initialize Pinecone client
    pinecone.init(api_key=PINECONE_API_KEY)
    index = pinecone.Index(index_name=PINECONE_INDEX_NAME)
    return index

def add_data_to_pinecone(index, vectors_list, ids_list):
    try:
        # Add vectors to the Pinecone index
        index.upsert(data=vectors_list, ids=ids_list)
    except pinecone.core.exceptions.PineconeException as e:
        print(f"Pinecone Error: {e}")
        raise

def get_results_from_pinecone(query_vector, k=5):
    headers = {
        'Authorization': f'Api-Key {PINECONE_API_KEY}',
        'Content-Type': 'application/json',
    }

    payload = {
        'top_k': k,
        'queries': [{'vector': query_vector}],
    }

    try:
        # Query the Pinecone index
        response = requests.post(f'{PINECONE_API_URL}/v1/index/{PINECONE_INDEX_NAME}/query', headers=headers, json=payload)
        response.raise_for_status()  # Raise an error for HTTP errors (non-2xx responses)
        data = response.json()

        results = []
        for result in data.get('data', []):
            results.append({
                'id': result['id'],
                'score': result['score'],
                'data': result['vector'],
            })

        return results
    except requests.exceptions.RequestException as e:
        print(f"Request Error: {e}")
        raise