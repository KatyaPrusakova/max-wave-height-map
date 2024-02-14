# Max Wave Height Map

This application provides a backend and frontend interface to visualize the maximum wave height data from the file waves_2019-01-01.nc. It operates on the provided NetCDF file to display the maximum wave height for a specific date, January 1, 2019.

## Backend
To set up and run the backend, follow these steps:

Navigate to the backend directory:

```bash
cd backend
```


Install dependencies using Poetry (ensure Poetry is installed):


```bash
poetry install --no-root
```

Run the backend server using uvicorn:

```bash
poetry run uvicorn main:app --reload
```

To test if the backend is working, you can send a request to the server using curl:

```bash
curl -X GET "http://localhost:8000/max_wave_height?latitude=0.0&longitude=0.0"
```

## Frontend
To set up and run the frontend, follow these steps:

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies using npm:

```bash
npm install
```

Run the frontend server using npm:

```bash
npm start
```

Open your browser and navigate to http://localhost:3000 to view the frontend interface.



# Showcase

![til](assets/web.gif) 


# Improvement for Future


The future improvement for this application is to calculate the maximum wave height since 1979 instead of just for a single day.

## Approach
To achieve this, we would need to:

1. Data Aggregation: Aggregate the wave height data from all available files or sources covering the period from 1979 to the present.

2. Time Series Analysis: Analyze the aggregated data to identify the maximum wave height recorded over the specified time period.

3. Data Integration: Integrate the analysis into the existing application framework, ensuring compatibility with the input data format and processing pipeline.

4. Performance Optimization: Optimize the algorithms and data processing pipelines to handle large datasets efficiently.

5. User Interface Enhancement: Enhance the user interface to allow users to specify the time period of interest and visualize the maximum wave height over that period.

## Concerns

1. Data Availability: Ensure that sufficient historical data is available to cover the entire period from 1979 to the present.

2. Computational Resources: Address potential challenges related to computational resources required for processing large datasets and performing complex analyses.

3. Accuracy and Reliability: Validate the accuracy and reliability of the results obtained from the analysis, considering factors such as data quality and potential biases.

# Contribute

Feel free to fork the repository, make your changes, and submit a pull request. Your contributions are super welcome!

