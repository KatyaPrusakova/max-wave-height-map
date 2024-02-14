from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict
import xarray as xr
import math

# Open the netCDF file
data = xr.open_dataset('waves_2019-01-01.nc')

app = FastAPI()

origins = [
    "http://localhost:3000",  # React app
    "http://localhost:8000",  # FastAPI server
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/max_wave_height")
async def get_max_wave_height(latitude: float, longitude: float) -> Dict[str, float]:

    wave_height = data['hmax']

    # Filter the data for January 1, 2019
    # wave_height_2019_01_01 = wave_height.sel(time='2019-01-01')
  
    # Extract wave height at the specified coordinates
    wave_height_at_location = wave_height.sel(latitude=latitude, longitude=longitude, method='nearest')
    max_wave_height = float(wave_height_at_location.max(skipna=True).values)

    return {"max_wave_height": max_wave_height}





