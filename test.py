import requests

url = "http://localhost:5000/api/auth/verify-otp"
data = {
    "email": "",
    "otp": ""  # Replace with the real OTP from your Gmail
}

response = requests.post(url, json=data)
print("Status Code:", response.status_code)
print("Response JSON:", response.json())
