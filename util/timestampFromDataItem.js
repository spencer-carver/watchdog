function timestampFromDataItem(dataItem) {
    // original db format
    if (dataItem.dateTime) {
        return dataItem.dateTime.S;
    }

    // current db format
    return dataItem.departureTimestamp.S;
}

module.exports = timestampFromDataItem;
