const db = require("../util/db");
const buildSpeechletResponse = require("../util/buildSpeechletResponse");
const timestampFromDataItem = require("../util/timestampFromDataItem");
const getDifference = require("../util/getDifference");
const { INTENT_ERROR, MISSING_PREFIX } = require("../util/constants");

async function queryOne(intent, session, callback) {
    const userId = session.user.userId;
    const name = intent.slots.User.value;

    try {
        const dataItem = await db.queryItem(userId, name);

        if (!dataItem) {
            return respond(name, `${ MISSING_PREFIX }${ name }`)
        }

        const departureTime = new Date(timestampFromDataItem(dataItem));
        const returnTime = new Date();
        const awayTime = getDifference(departureTime, returnTime);

        return respond(name, `My records indicate that ${ name } has been gone for ${ awayTime }.`);
    } catch (error) {
        console.log("AbsenceQueryIntent Error: ", error);

        return respond(name, INTENT_ERROR);
    }
}

function respond(name, speechOutput) {
    return {
        sessionAttributes: {},
        response: buildSpeechletResponse({
            cardTitle: `How long has ${ name } been away?`,
            speechOutput,
            repromptText: "",
            shouldEndSession: true
        })
    };
}

module.exports = queryOne;
