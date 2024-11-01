import { Hour } from "../models";

export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "2-digit",
    month: "short",
  };
  const date: Date = new Date(dateString);
  return date.toLocaleDateString("en-US", options);
};

export const getHourList = (currentHour: number): number[] => {
  const rangeSize = 5;
  const halfRange = Math.floor(rangeSize / 2);
  const startHour = Math.max(0, currentHour - halfRange);
  const endHour = Math.min(23, currentHour + halfRange);
  const adjustedStartHour =
    endHour - startHour + 1 < rangeSize
      ? Math.max(0, endHour - rangeSize + 1)
      : startHour;
  const hourList: number[] = [];
  for (let i = adjustedStartHour; i <= endHour; i++) {
    hourList.push(i);
  }
  return hourList;
};

const formatTo12HourTime = (dateString: string) => {
  const date = new Date(dateString);
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  return { value: `${hours}:${minutes}`, format: ampm };
};

const getHourRange = (arr: Hour[], currentHour: number) => {
  const hours = getHourList(currentHour);
  const start = hours[0];
  const end = hours[hours.length - 1];
  const range = arr.slice(start, end + 1);
  return range.map((r) => {
    const timeFormat = formatTo12HourTime(r.time);
    r.time12 = timeFormat.value;
    r.time12Format = timeFormat.format;
    return r;
  });
};

export const getCurrentDayForecastHours = (forecastHours: Hour[]) => {
  const currentHour = new Date().getHours();
  return getHourRange(forecastHours, currentHour);
};
