# Import os, dotenv, and supabase modules
import os
from dotenv import load_dotenv
from supabase import create_client, Client

# Load the environment variables from the .env file
load_dotenv()

# Get the supabase URL and key from the environment variables
url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")

# Create a supabase client object
supabase: Client = create_client(url, key)

# Define a function to sign up a new user with email and password
def sign_up(email: str, password: str):
    # Use the auth feature of the supabase client to sign up the user
    user = supabase.auth.sign_up({"email": email, "password": password})
    # Check if the sign up was successful
    if user.error:
        # Print the error message
        print(user.error.message)
    else:
        # Print the user data
        print(user.data)

# Define a function to sign in an existing user with email and password
def sign_in(email: str, password: str):
    # Use the auth feature of the supabase client to sign in the user
    user = supabase.auth.sign_in_with_password({"email": email, "password": password})
    # Check if the sign in was successful
    if user.error:
        # Print the error message
        print(user.error.message)
    else:
        # Print the user data
        print(user.data)
