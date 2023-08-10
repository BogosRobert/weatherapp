import axios from "axios";
const OWM_APP_ID = process.env.REACT_APP_OWM_APP_ID;
const UNSPLASH_CLIENT_ID = process.env.REACT_APP_UNSPLASH_CLIENT_ID;

export const fetchLocationSuggestions = async (query) => {
  try {
    if (!query) {
      return [];
    }
    const response = await axios.get(
      "https://api.openweathermap.org/geo/1.0/direct",
      {
        params: {
          q: query,
          limit: 5,
          appid: OWM_APP_ID,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching location suggestions: ${error.message}`);
  }
};

export const fetchLocationData = async (lat, lon, name) => {
  try {
    const currentWeatherData = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          lat,
          lon,
          units: "metric",
          appid: OWM_APP_ID,
        },
      }
    );

    const locationImageData = await axios.get(
      "https://api.unsplash.com/search/photos",
      {
        params: {
          query: name,
          per_page: 1,
          client_id: UNSPLASH_CLIENT_ID,
        },
      }
    );

    const temperature = currentWeatherData?.data?.main?.temp?.toFixed(1);
    const locationImage =
      Array.isArray(locationImageData?.data?.results) &&
      locationImageData.data.results[0] &&
      locationImageData.data.results[0].urls.regular;
    return {
      temperature,
      locationImage,
    };
  } catch (e) {
    throw new Error(`Error fetching location data: ${e.message}`);
  }
};

let debounceTimer;
export const debounceApiCall = (delay, apiCallFunction) => {
  return new Promise((resolve, reject) => {
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      apiCallFunction()
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    }, delay);
  });
};
