# TEST IS A TEST FILE
# PLEASE DO NOT MODIFY IT

import requests
from bs4 import BeautifulSoup

# Define the URL to scrape
url = "https://starlosearch.vercel.app/Pages/about.html"

# Send a GET request to the URL and store the response
response = requests.get(url)

# Check if the response status code is 200 (OK)
if response.status_code == 200:
    # Parse the response content as HTML using BeautifulSoup
    soup = BeautifulSoup(response.content, "html.parser")

    # Find the title element and print its text
    title = soup.find("title")
    print(title.text)

    # Find all the links in the page and print their URLs
    links = soup.find_all("a")
    for link in links:
        print(link["href"])
else:
    # Print an error message if the response status code is not 200
    print("Error: Unable to access the URL")
