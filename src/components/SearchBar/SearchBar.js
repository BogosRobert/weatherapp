import React, { useState } from "react";
import css from "./SearchBar.module.css";
import { debounceApiCall, fetchLocationSuggestions } from "../../utils/api";
import LocationSuggestions from "../LocationSuggestions/LocationSuggestions";

const SearchBar = (props) => {
  const { onSelect } = props;
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleInputOnChange = async (e) => {
    try {
      setQuery(e.target.value);
      setIsOpen(true);
      if (!e.target.value) {
        return;
      }
      setLoading(true);
      const locationSuggestions = await debounceApiCall(1000, () =>
        fetchLocationSuggestions(e.target.value)
      );
      setSuggestions(locationSuggestions);
      setError(null);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setError("Woops! Some error has occured, please try again.");
      setLoading(false);
    }
  };

  return (
    <div className={css.wrapper}>
      <input
        className={css.inputField}
        placeholder="Search city"
        value={query}
        onChange={handleInputOnChange}
      />

      <LocationSuggestions
        loading={loading}
        query={query}
        onSelect={onSelect}
        suggestions={suggestions}
        error={error}
        setError={setError}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      {error && <p className={css.error}>{error}</p>}
    </div>
  );
};

export default SearchBar;
