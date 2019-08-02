const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB();
const Reply = require("../reply");

function singleQueryReply(intent, session, callback) {
    const user = intent.slots.User;
    const options = {
        cardTitle: "How long has " + user.value + " been away?",
        speechOutput: "",
        repromptText: "",
        sessionAttributes: {},
        shouldEndSession: true
    };

    queryPersonStatus(options, session, user, callback);
}

function queryPersonStatus(options, session, user, callback) {
    //Configure DB Query
    const params = {
        Key: {
            "username": {
                S: session.user.userId + "~" + user.value
            }
        },
        TableName: "departureTimes"
    };

    dynamo.getItem(params, function (err, data) {
        if (err) {
            Reply.processError(options, callback);
        } else if (data.Item === undefined) {
            Reply.processEmptyResponse(options, user.value, callback);
        } else {
            Reply.processQueryData(options, user.value, data.Item, callback);
        }
    });
}

module.exports = singleQueryReply;
