const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB();
const Reply = require("../reply");

function singleReturnReply(intent, session, callback) {
    const user = intent.slots.User;
    const options = {
        cardTitle: "" + user.value + " has returned",
        speechOutput: "",
        repromptText: "",
        sessionAttributes: {},
        shouldEndSession: true
    };

    personReturning(options, session, user, callback);
}

function personReturning(options, session, user, callback) {
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
            dynamo.deleteItem(params, function(err2, removedData) {
                if (err2) {
                    console.log("err2" + err2);
                }
                Reply.processReturnData(options, data.Item, callback);
            });

        }
    });
}

module.exports = singleReturnReply;
