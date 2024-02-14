import { AnimateMap, Coordinates } from "./AnimateMap";

function App() {
  const initialMapCenter: Coordinates = { lat: 57.505, lng: 14.09 };

  return (
    <div className="App">
      <div className="w-full h-full">
        <h1>Welcome to max wave height map. </h1>
        <p>
          Click on the water area in the map to see the marker. When you click
          to the marker you can see max wave height
        </p>

        <AnimateMap initialMapCenter={initialMapCenter} />
      </div>
    </div>
  );
}

export default App;
