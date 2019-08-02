const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB();
const Reply = require("../reply");

function singleLeavingReply(intent, session, callback) {
    const user = intent.slots.User;
    const options = {
        cardTitle: "" + user.value + " is leaving",
        speechOutput: "",
        repromptText: "",
        sessionAttributes: {},
        shouldEndSession: true
    };

    personLeaving(options, session, user, callback);
}

function personLeaving(options, session, user, callback) {
    //Configure DB query
    const params = {
        Item: {
            "username": {
                S: session.user.userId + "~" + user.value
            },
            "dateTime": {
                S: (new Date()).toString()
            }
        },
        TableName: "departureTimes"
    };

    dynamo.putItem(params, function (err, data) {
        if (err) {
            Reply.processError(options, callback);
        } else {
            Reply.processLeaveData(options, data.Item, callback);
        }
    });
}

module.exports = singleLeavingReply;
