import requests

token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NTcwYzI1ZTA2MzFkMWVhYzA3N2VmZSIsImVtYWlsIjoic21kZHNlbnlha2VAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NTA1MzYxMDgsImV4cCI6MTc1MDUzOTcwOH0.Hwh5VUmcmRUL4jz0suZbiiLL9TaZGwsOB_UAZpb9y1Q"

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
