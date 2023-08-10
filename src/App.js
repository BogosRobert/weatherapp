import { useState } from "react";
import css from "./App.module.css";
import CloudsWidget from "./components/CloudsWidget/CloudsWidget";
import SearchBar from "./components/SearchBar/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay/WeatherDisplay";
import defaultBackgroundImage from "./assets/images/defaultBackgroundImage.jpg";

function App() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const backgroundImage =
    selectedLocation?.locationImage || defaultBackgroundImage;
  const showCloudsWidget = !selectedLocation?.locationImage;

  return (
    <div
      className={css.wrapper}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    url(${backgroundImage})`,
      }}
    >
      {showCloudsWidget && <CloudsWidget />}
      <div className={css.content}>
        <h1 className={css.title}>Weather app</h1>
        <h4 className={css.subtitle}>Search for a city below</h4>
        <SearchBar onSelect={setSelectedLocation} />
        <WeatherDisplay location={selectedLocation} />
      </div>
    </div>
  );
}

export default App;
