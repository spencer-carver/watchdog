const getDifference = require("./util/getDifference");

function processLeaveData(options, row, callback) {
    const speechOutput = "Have a good day!";

    callback(options.sessionAttributes,
        buildSpeechletResponse( options.cardTitle,
                                speechOutput,
                                options.repromptText,
                                options.shouldEndSession));
}

function processQueryData(options, username, row, callback) {
    const departureTime = new Date(row.dateTime.S);
    const returnTime = new Date();

    const awayTime = getDifference(departureTime, returnTime);
    const speechOutput =  "My records indicate that " + username + " has been gone for " + awayTime;

    callback(options.sessionAttributes,
        buildSpeechletResponse( options.cardTitle,
                                speechOutput,
                                options.repromptText,
                                options.shouldEndSession));
}

function processReturnData(options, row, callback) {
    const departureTime = new Date(row.dateTime.S);
    const returnTime = new Date();

    const awayTime = getDifference(departureTime, returnTime);
    const speechOutput =  "Welcome back. You have been gone for " + awayTime;

    callback(options.sessionAttributes,
        buildSpeechletResponse( options.cardTitle,
                                speechOutput,
                                options.repromptText,
                                options.shouldEndSession));
}

function processEmptyResponse(options, name, callback) {
    const speechOutput =  "Unfortunately my records don't seem to have a departure time saved for "+ name;

    callback(options.sessionAttributes,
        buildSpeechletResponse( options.cardTitle,
                                speechOutput,
                                options.repromptText,
                                options.shouldEndSession));
}

function processError(options, callback) {
    const speechOutput =  "Whoops, something went wrong. Please try again.";

    callback(options.sessionAttributes,
        buildSpeechletResponse( options.cardTitle,
                                speechOutput,
                                options.repromptText,
                                options.shouldEndSession));
}

// --------------- Helpers that build all of the responses -----------------------

function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        card: {
            type: "Simple",
            title: title,
            content: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
}

module.exports = {
    processLeaveData,
    processReturnData,
    processQueryData,
    processEmptyResponse,
    processError,
    buildSpeechletResponse,
    buildResponse
};
