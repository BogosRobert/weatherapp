import React from "react";
import css from "./WeatherDisplay.module.css";

const WeatherDisplay = (props) => {
  const { location } = props;
  if (!location) {
    return null;
  }

  const { temperature, name } = location;

  return (
    <div className={css.wrapper}>
      <h4 className={css.label}>
        Current temperature in <strong>{name}</strong> is:{" "}
        <strong>{temperature}°C</strong>
      </h4>
    </div>
  );
};

export default WeatherDisplay;
