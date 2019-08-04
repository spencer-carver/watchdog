function getDifference(date1, date2) {
    // Convert both dates to milliseconds
    const date1_ms = date1.getTime();
    const date2_ms = date2.getTime();

    // Calculate the difference in milliseconds
    let difference_ms = date2_ms - date1_ms;

    // take out milliseconds
    difference_ms = difference_ms / 1000;
    const seconds = Math.floor(difference_ms % 60);
    difference_ms = difference_ms / 60;
    const minutes = Math.floor(difference_ms % 60);
    difference_ms = difference_ms / 60;
    const hours = Math.floor(difference_ms % 24);
    const days = Math.floor(difference_ms / 24);

    // create partial strings in desired language
    const dayString = partialTimeString(days, "day");
    const hourString = partialTimeString(hours, "hour");
    const minuteString = partialTimeString(minutes, "minute");
    const secondString = partialTimeString(seconds, "second");

    // combine
    let output = `${ dayString }`;
    output += output ? `, ${ hourString }` : hourString;
    output += output ? `, ${ minuteString }` : minuteString;
    output += output ? ` and ${ secondString }` : secondString;

    return output;
}

function partialTimeString(value, label) {
    if (value === 0) {
        return "";
    }

    if (value === 1) {
        return `1 ${ label }`;
    }

    return `${ value } ${ label }s`;
}

module.exports = getDifference;
