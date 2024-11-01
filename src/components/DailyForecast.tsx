import { memo } from "react";
import { Forecastday } from "../models";
import { formatDate } from "../services/date";

interface DailyForecastProps {
  forecastday: Array<Forecastday>;
}

const DailyForecast: React.FC<DailyForecastProps> = ({ forecastday }) => {
  return (
    <div className="flex flex-col space-y-6 w-full max-w-screen-sm bg-white p-10 mt-10 rounded-xl ring-8 ring-white ring-opacity-40">
      {forecastday.map((day, index) => (
        <div key={index} className="flex flex-wrap items-center">
          <div className="font-semibold text-lg lg:w-1/4 xs:text-2xl">
            {formatDate(day.date)}
          </div>
          <div className="flex w-96 lg:w-3/4 justify-center items-center">
            <div className="flex items-center justify-end w-1/4 pr-10">
              <span className="font-semibold">
                {day.day.daily_chance_of_rain}%
              </span>
              <svg
                className="w-6 h-6 fill-current ml-1"
                viewBox="0 0 16 20"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g transform="matrix(1,0,0,1,-4,-2)">
                  <path d="M17.66,8L12.71,3.06C12.32,2.67 11.69,2.67 11.3,3.06L6.34,8C4.78,9.56 4,11.64 4,13.64C4,15.64 4.78,17.75 6.34,19.31C7.9,20.87 9.95,21.66 12,21.66C14.05,21.66 16.1,20.87 17.66,19.31C19.22,17.75 20,15.64 20,13.64C20,11.64 19.22,9.56 17.66,8ZM6,14C6.01,12 6.62,10.73 7.76,9.6L12,5.27L16.24,9.65C17.38,10.77 17.99,12 18,14C18.016,17.296 14.96,19.809 12,19.74C9.069,19.672 5.982,17.655 6,14Z" />
                </g>
              </svg>
            </div>
            <img
              src={`https:${day.day.condition.icon}`}
              alt="current weather image"
              className="w-14 h-14"
            />
            <span className="font-semibold sm:text-lg w-1/3 text-right">
              {Math.floor(day.day.mintemp_c)}° / {Math.floor(day.day.maxtemp_c)}
              °
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(DailyForecast);
