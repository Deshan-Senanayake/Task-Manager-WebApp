import requests

token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NTcwYzI1ZTA2MzFkMWVhYzA3N2VmZSIsImVtYWlsIjoic21kZHNlbnlha2VAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzUwNTQyMTI1LCJleHAiOjE3NTA1NDU3MjV9.61vz8yhD49osNOJSMblw8u1oLEPnzRs34e-yqED7mK4"

headers = {
    "Authorization": f"Bearer {token}"
}

response = requests.get("http://localhost:5000/api/admin/users", headers=headers)

print("Status Code:", response.status_code)
print("Users:", response.json())
