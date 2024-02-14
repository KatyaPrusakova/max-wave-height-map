import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

@pytest.mark.parametrize("latitude, longitude", [
    (10.0, 20.0),  # Example coordinates and expected max wave height
  
])
def test_get_max_wave_height(latitude, longitude, expected_max_wave_height):
    response = client.get(f"/max_wave_height?latitude={latitude}&longitude={longitude}")
    assert response.status_code == 200
    assert response.json() == {"max_wave_height": expected_max_wave_height}
