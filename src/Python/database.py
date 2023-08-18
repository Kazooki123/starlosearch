import os
import json

# Path to the file on the external SSD
db_file_path = 'Assets\data\Json\search_data.json'

# Check if the file exists, if not create it
if not os.path.exists(db_file_path):
    with open(db_file_path, 'w') as f:
        json.dump([], f)

def save_search_query(query):
    with open(db_file_path, 'r') as f:
        data = json.load(f)
    
    data.append(query)
    
    with open(db_file_path, 'w') as f:
        json.dump(data, f)

def get_search_history():
    with open(db_file_path, 'r') as f:
        data = json.load(f)
    
    return data

def clear_search_history():
    with open(db_file_path, 'w') as f:
        json.dump([], f)
