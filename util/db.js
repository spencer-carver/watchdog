const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB();

const ORIGINAL_DATABASE = {
    tableName: "departureTimes",
    partitionKey: "username",
    value: "dateTime"
};

const CURRENT_DATABASE = {
    tableName: "watchdogUsers",
    partitionKey: "echoDeviceId",
    sortKey: "personName",
    value: "departureTimestamp"
};

function generateOriginalParams(userId, name, timestamp) {
    const QUERY_TYPE = timestamp ? "Item" : "Key";

    const params = {
        [QUERY_TYPE]: {
            [ORIGINAL_DATABASE.partitionKey]: { S: `${ userId }~${ name }` }
        },
        TableName: ORIGINAL_DATABASE.tableName
    };

    if (timestamp) {
        params[QUERY_TYPE][ORIGINAL_DATABASE.value] = { S: timestamp };
    }

    return params;
}

function generateCurrentParams(userId, name, timestamp) {
    const QUERY_TYPE = timestamp ? "Item" : "Key";

    const params = {
        [QUERY_TYPE]: {
            [CURRENT_DATABASE.partitionKey]: { S: userId },
            [CURRENT_DATABASE.sortKey]: { S: name }
        },
        TableName: CURRENT_DATABASE.tableName
    };

    if (timestamp) {
        params[QUERY_TYPE][CURRENT_DATABASE.value] = { S: timestamp };
    }

    return params;
}

async function insertItem(userId, name, timestamp) {
    return new Promise(function(resolve, reject) {
        dynamo.putItem(generateCurrentParams(userId, name, timestamp), function (err, data) {
            if (err) {
                return reject(err);
            }
    
            return resolve(data.Item);
        });
    });
}

async function queryItem(userId, name) {
    let result = undefined;

    try {
        result = await queryItemWithParams(generateOriginalParams(userId, name));

        if (!result) {
            throw new Error("Failed to find item in Original DB");
        }
    } catch (error) {
        result = await queryItemWithParams(generateCurrentParams(userId, name)); 
    }

    return result;
}

async function queryItemWithParams(params) {
    return new Promise(function(resolve, reject) {
        dynamo.getItem(params, function (err, data) {
            if (err) {
                return reject(err);
            }

            return resolve(data.Item);
        });
    });
}

async function queryItems(userId) {
    const params = {
        ExpressionAttributeValues: {
            ":partitionkeyval": { S: userId }
        },
        KeyConditionExpression: "echoDeviceId = :partitionkeyval",
        TableName: CURRENT_DATABASE.tableName
    };

    return new Promise(function(resolve, reject) {
        dynamo.query(params, function(err, data) {
            if (err) {
                return reject(err);
            }

            return resolve(data.Items);
        });
    });
}

// function updateItem() { }

async function deleteItem(userId, name) {
    let result = undefined;

    try {
        result = await deleteItemWithParams(generateOriginalParams(userId, name));

        if (!result) {
            throw new Error("Failed to find item in Original DB");
        }
    } catch (error) {
        result = await deleteItemWithParams(generateCurrentParams(userId, name));
    }

    return result;
}

async function deleteItemWithParams(params) {
    return new Promise(function(resolve, reject) {
        dynamo.deleteItem(params, function (err, data) {
            if (err) {
                return reject(err);
            }

            return resolve(data.Item);
        });
    });
}

module.exports = {
    insertItem,
    queryItem,
    queryItems,
    /* updateItem, */
    deleteItem
};
