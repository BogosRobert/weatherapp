import React, { useEffect, useRef } from "react";
import css from "./LocationSuggestions.module.css";
import { fetchLocationData } from "../../utils/api";

const LocationSuggestions = (props) => {
  const {
    suggestions = [],
    onSelect,
    loading,
    error,
    query,
    isOpen,
    setIsOpen,
    setError,
  } = props;

  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsOpen]);

  const handleSelectSuggestion = async (lat, lon, name) => {
    try {
      const { temperature, locationImage } = await fetchLocationData(
        lat,
        lon,
        name
      );

      onSelect({ temperature, locationImage, name });
      setIsOpen(false);
    } catch (e) {
      console.log(e);
      setError("Woops! Some error has occured, please try again.");
    }
  };

  if (error || !query || !isOpen) {
    return null;
  }

  if (!error && !loading && query && suggestions.length === 0) {
    return (
      <ul className={css.wrapper} ref={wrapperRef}>
        <li key="noResultsItem" className={css.noResultsItem}>
          {"No results found :("}
        </li>
      </ul>
    );
  }

  if (loading) {
    return (
      <ul className={css.wrapper}>
        <li key="loadingItem" className={css.loadingItem}></li>
      </ul>
    );
  }

  return (
    <ul className={css.wrapper} ref={wrapperRef}>
      {suggestions.map((s, index) => {
        const { country, name, lat, lon } = s;
        const composedLabel = name + ", " + country;
        return (
          <li
            onClick={() => handleSelectSuggestion(lat, lon, name)}
            key={index}
            className={css.listItem}
          >
            {composedLabel}
          </li>
        );
      })}
    </ul>
  );
};

export default LocationSuggestions;
