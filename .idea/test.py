import requests

url = "http://localhost:5000/api/auth/login"
data = {
    "email": "smddsenyake@gmail.com",
    "password": "test12345"
}

response = requests.post(url, json=data)
print("Status Code:", response.status_code)
print("Response JSON:", response.json())
