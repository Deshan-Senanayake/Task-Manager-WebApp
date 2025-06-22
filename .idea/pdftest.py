import requests

token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NTcwYzI1ZTA2MzFkMWVhYzA3N2VmZSIsImVtYWlsIjoic21kZHNlbnlha2VAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzUwNjEwMDIwLCJleHAiOjE3NTA2MTM2MjB9.SLfvqfkhvVGx8oITuax0A3mX9u9P7qlK8HwNcebhTNo"



headers = {
    "Authorization": f"Bearer {token}"
}

response = requests.get("http://localhost:5000/api/tasks/pdf", headers=headers)

with open("tasks_report.pdf", "wb") as f:
    f.write(response.content)

print("✅ PDF saved as tasks_report.pdf")
