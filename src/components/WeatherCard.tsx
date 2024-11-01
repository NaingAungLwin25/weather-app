import { memo } from "react";
import { Current, Hour, Location } from "../models";

interface WeatherCardProps {
  weatherLocation: Location;
  currentWeather: Current;
  currentDayForecast: Hour[];
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  weatherLocation,
  currentWeather,
  currentDayForecast,
}) => {
  return (
    <div className="w-full max-w-screen-sm bg-white p-10 rounded-xl ring-8 ring-white ring-opacity-40">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <span className="text-6xl font-bold">
            {Math.floor(currentWeather.temp_c)}°C
          </span>
          <span className="font-semibold mt-1 text-gray-500">
            {weatherLocation.name}, {weatherLocation.region},{" "}
            {weatherLocation.country}
          </span>
        </div>
        <div className="ml-auto">
          <img
            src={`https:${currentWeather.condition.icon}`}
            alt="current weather image"
            className="w-15 h-15 sm:w-20 sm:h-20"
          />
        </div>
      </div>
      <div className="flex flex-wrap mt-12">
        {currentDayForecast && currentDayForecast.length ? (
          <>
            {currentDayForecast.map((c, i) => (
              <div
                key={i}
                className="flex flex-col items-center w-24 mb-8 sm:w-28"
              >
                <span className="font-semibold text-lg">{c.temp_c}°C</span>
                <img
                  src={`https:${c.condition.icon}`}
                  alt="weather image"
                  className="w-15 h-15 sm:w-20 sm:h-20"
                />
                <span className="font-semibold mt-1 text-sm">{c.time12}</span>
                <span className="text-xs font-semibold text-gray-400">
                  {c.time12Format}
                </span>
              </div>
            ))}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default memo(WeatherCard);
