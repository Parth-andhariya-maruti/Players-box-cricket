import { addHours, format, parse } from "date-fns";

export function addHoursToTimeString(timeString, hoursToAdd) {
    // Parse the time string to a Date object
    const parsedTime = parse(timeString, "HH:mm", new Date());

    // Add hours to the parsed time
    const updatedTime = addHours(parsedTime, hoursToAdd);

    // Format the updated time back to a time string
    return format(updatedTime, "HH:mm");
}

export function getStartAndEndTImeFromDate(date, hours) {
    console.log('getStartAndEndTImeFromDate');
    console.log(date)
    console.log(hours)
    let start_time = "00:00", end_time = "00:00";
    //2024-05-20T15:3A35
    start_time = date.split('T')[1];
    end_time = addHoursToTimeString(
        start_time,
        hours
    )
    return { start_time, end_time };
}