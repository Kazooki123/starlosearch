# This is a test file. PLEASE DO NOT MODIFY IT
# Import os, dotenv, and supabase modules
import os
from dotenv import load_dotenv
import supabase # Import the module itself instead of specific objects

# Load the environment variables from the .env file
load_dotenv()

# Get the supabase URL and key from the environment variables
url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")

# Create a supabase client object
supabase_client = supabase.create_client(url, key) # Use the module name before the function name

# Use the supabase client to perform various operations on the database
# For example, insert a new record into the countries table
data = supabase_client.table("countries").insert({"name": "Poland"}).execute()

# Print the result
print(data)
