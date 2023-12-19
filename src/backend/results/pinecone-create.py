import pinecone
from dotenv import load_dotenv
import os

load_dotenv()

# Replace with your actual Pinecone API key
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
# Initialize Pinecone client
pinecone.init(PINECONE_API_KEY)

def create_search_index(index_name='search', dimension=512):
    # Create the Pinecone index
    pinecone.create_index(index_name, dimension)

def add_vectors_to_index(index_name='search'):
    # Assuming you have a list of vectors (e.g., vectors_list) and corresponding IDs
    vectors_list = [...]  # List of vectors
    ids_list = [...]  # List of corresponding IDs

    # Add vectors to the index
    pinecone.upsert(index_name=index_name, data=vectors_list, ids=ids_list)

if __name__ == "__main__":
    # Customize the index name and dimension as needed
    index_name = 'search'
    dimension = 512

    # Create the search index
    create_search_index(index_name, dimension)

    # Add vectors to the index
    add_vectors_to_index(index_name)
