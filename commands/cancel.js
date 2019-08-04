const buildSpeechletResponse = require("../util/buildSpeechletResponse");

function cancel() {
    return {
        sessionAttributes: {},
        response: buildSpeechletResponse({
            cardTitle: "Cancel",
            speechOutput: "Watchdog command cancelled. Exiting.",
            repromptText: "",
            shouldEndSession: true
        })
    };
}

module.exports = cancel;
