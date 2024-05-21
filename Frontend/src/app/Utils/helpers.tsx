import { addHours, format, parse } from "date-fns";

export const createEndpoint = (
  BASE_API_URL: string,
  path: string,
  query: any = {}
) => {
  if (typeof path !== "string") {
    throw new Error("Path must be a string.");
  }
  if (typeof query !== "object" || query === null) {
    throw new Error("Query parameters must be an object.");
  }
  //delete null queries
  Object.keys(query).forEach((key) => {
    if (query[key] === null || query[key] === undefined) {
      delete query[key];
    }
  });
  const queryString = Object.entries(query)
    .map(
      ([key, value]: any) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");

  return `${BASE_API_URL}${path}${queryString ? `?${queryString}` : ""}`;
};

export function getlocalISOString() {
  const currentDate = new Date();
  const localDate = new Date(
    currentDate.getTime() - currentDate.getTimezoneOffset() * 60000
  ); // Convert to local time
  const localISOString = localDate.toISOString(); // Convert to local ISO string format
  const today = localISOString.slice(0, localISOString.length - 8);
  return today;
}

export function addHoursToTimeString(timeString: string, hoursToAdd: number) {
  // Parse the time string to a Date object
  const parsedTime = parse(timeString, "HH:mm", new Date());

  // Add hours to the parsed time
  const updatedTime = addHours(parsedTime, hoursToAdd);

  // Format the updated time back to a time string
  return format(updatedTime, "HH:mm");
}
