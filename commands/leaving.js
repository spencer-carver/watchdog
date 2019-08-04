const db = require("../util/db");
const buildSpeechletResponse = require("../util/buildSpeechletResponse");
const { INTENT_ERROR } = require("../util/constants");

async function leaving(intent, session) {
    const userId = session.user.userId;
    const name = intent.slots.User.value;
    const timestamp = (new Date()).toString();

    try {
        await db.insertItem(userId, name, timestamp);

        return respond(name, "Have a good day");
    } catch (error) {
        console.log("SingleLeaveIntent Error: ", error);

        return respond(name, INTENT_ERROR);
    }
}

function respond(name, speechOutput) {
    return {
        sessionAttributes: {},
        response: buildSpeechletResponse({
            cardTitle: `${ name } is leaving`,
            speechOutput,
            repromptText: "",
            shouldEndSession: true
        })
    };
}

module.exports = leaving;
