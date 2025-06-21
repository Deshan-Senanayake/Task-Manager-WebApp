import requests

token = ""
data = {
    "title": "Finish frontend",
    "description": "Build the login page UI",
    "deadline": "2025-06-30T00:00:00Z",
    "assignedTo": "Deshan",
    "status": "pending"
}

headers = {
    "Authorization": f"Bearer {token}"
}

response = requests.post("http://localhost:5000/api/tasks", json=data, headers=headers)

print("Status Code:", response.status_code)
print("Response:", response.json())
