import { useEffect, useState, useCallback } from "react";
import {
  DailyForecast,
  SearchBar,
  WeatherCard,
  ErrorDialog,
  Loading,
} from "../components";
import Wrapper from "../layouts/Wrapper";
import api from "../services/api";
import { Forecast, Hour } from "../models";
import { getCurrentDayForecastHours } from "../services/date";

const MainPage: React.FC = () => {
  const [isShowError, setIsShowError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [location, setLocation] = useState("");
  const [wealtherData, setWealtherData] = useState<Forecast>();
  const [currentDayForecast, setCurrentDayForecast] = useState<Hour[]>([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position?.coords?.latitude || 0;
          const longitude = position?.coords?.longitude || 0;
          try {
            setLoading(true);
            const currentRegion = await api.get("/search.json", {
              params: { q: `${latitude},${longitude}` },
            });
            const region = currentRegion?.data[0].name;
            setLocation(region);
          } catch {
            showError(
              "Can't get current location. Check your internet connection."
            );
          }
        },
        (error) => {
          showError(error?.message);
        }
      );
    } else {
      showError("Geolocation is not supported by this browser.");
    }
  }, []);

  const fetchWeather = useCallback(async () => {
    setLoading(true);
    try {
      setWealtherData(undefined);
      const currentWealther: { data: Forecast } = await api.get(
        "/forecast.json",
        {
          params: { q: location, days: 5 },
        }
      );
      currentWealther.data.forecast.forecastday[0].hour.forEach((fd) => {
        fd.hour = new Date(fd.time).getHours();
      });
      setWealtherData(currentWealther.data);
      const forecastHours = currentWealther.data.forecast.forecastday[0].hour;
      const currentDayForecastHours = getCurrentDayForecastHours(forecastHours);
      setCurrentDayForecast(currentDayForecastHours);
    } catch {
      showError("Can't get weather for location.");
    }
    setLoading(false);
  }, [location]);

  useEffect(() => {
    if (!location) return;
    fetchWeather();
  }, [fetchWeather, location]);

  const closeDialog = () => {
    setErrorMessage("");
    setIsShowError(false);
  };

  const showError = (message: string = "") => {
    setErrorMessage(message);
    setIsShowError(true);
  };

  const handleSearch = async (searchValue: string) => {
    setLocation(searchValue);
  };

  return (
    <Wrapper>
      <SearchBar location={location} handleSearch={handleSearch} />
      {loading && <Loading />}
      {wealtherData && !loading && (
        <>
          <WeatherCard
            weatherLocation={wealtherData.location}
            currentWeather={wealtherData.current}
            currentDayForecast={currentDayForecast}
          />
          <DailyForecast forecastday={wealtherData.forecast.forecastday} />
        </>
      )}
      {isShowError && (
        <ErrorDialog message={errorMessage} closeDialog={closeDialog} />
      )}
    </Wrapper>
  );
};

export default MainPage;
