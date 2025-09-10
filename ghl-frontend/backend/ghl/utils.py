import requests

GHL_BASE_URL = "https://rest.gohighlevel.com/v1"
PRIVATE_TOKEN = "TU_PRIVATE_TOKEN_AQUI"  # 👈 reemplaza con tu token real

def ghl_request(endpoint, method="GET", data=None):
    headers = {
        "Authorization": f"Bearer {PRIVATE_TOKEN}",
        "Content-Type": "application/json",
    }
    url = f"{GHL_BASE_URL}{endpoint}"

    if method == "GET":
        resp = requests.get(url, headers=headers)
    else:
        resp = requests.post(url, json=data, headers=headers)

    if resp.status_code == 401:
        return {"detail": "Unauthorized"}, 401

    return resp.json(), resp.status_code
