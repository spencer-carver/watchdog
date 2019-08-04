const buildSpeechletResponse = require("../util/buildSpeechletResponse");

function welcome() {
    const speechOutput = "Watchdog is a tool to help you track how long you've been away. " +
        "You can also ask how long it has been since someone else left. " +
        "For sample commands, say 'help'. Otherwise, try issuing a command now.";

    return {
        sessionAttributes: {},
        response: buildSpeechletResponse({
            cardTitle: "Welcome to Watchdog",
            speechOutput,
            repromptText: "For sample commands, say 'help'. Otherwise, try issuing a command now.",
            shouldEndSession: false
        })
    };
}

module.exports = welcome;
