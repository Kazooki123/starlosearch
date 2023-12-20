import os
from supabase import create_client

supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_KEY")

client = create_client(supabase_url, supabase_key)
database = client.create_database()

database.insert("users", {"username": "user1", "password": "password1"})
database.insert("users", {"username": "user2", "password": "password2"})