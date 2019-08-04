const buildSpeechletResponse = require("../util/buildSpeechletResponse");

function help() {
    const speechOutput = "Start Watchdog tracking by telling WatchDog 'Someone is leaving'. " +
        "Finish a session by telling WatchDog 'Someone is back'. " +
        "You can also check how long tracked people have been away by asking WatchDog " +
        "'How long has Someone been away'.";

    return {
        sessionAttributes: {},
        response: buildSpeechletResponse({
            cardTitle: "Watchdog Help",
            speechOutput,
            repromptText: "Try issuing WatchDog a command now.",
            shouldEndSession: false
        })
    };
}

module.exports = help;
