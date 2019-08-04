const buildSpeechletResponse = require("../util/buildSpeechletResponse");

function stop() {
    return {
        sessionAttributes: {},
        response: buildSpeechletResponse({
            cardTitle: "Stop",
            speechOutput: "Goodbye.",
            repromptText: "",
            shouldEndSession: true
        })
    };
}

module.exports = stop;
