const db = require("../util/db");
const buildSpeechletResponse = require("../util/buildSpeechletResponse");
const timestampFromDataItem = require("../util/timestampFromDataItem");
const getDifference = require("../util/getDifference");
const { INTENT_ERROR, MISSING_PREFIX } = require("../util/constants");

async function returning(intent, session, callback) {
    const userId = session.user.userId;
    const name = intent.slots.User.value;

    try {
        const dataItem = await db.queryItem(userId, name);
        
        if (!dataItem) {
            return respond(name, `${ MISSING_PREFIX }${ name }`);
        }

        try {
            await db.deleteItem(userId, name);
        } catch (error2) {
            console.log("Delete Item Error: ", error2);
        }

        const departureTime = new Date(timestampFromDataItem(dataItem));
        const returnTime = new Date();
        const awayTime = getDifference(departureTime, returnTime);

        return respond(name, `Welcome back. You have been gone for ${ awayTime }`);
    } catch (error) {
        console.log("SingleReturnIntent Error: ", error);

        return respond(name, INTENT_ERROR);
    }
}

function respond(name, speechOutput) {
    return {
        sessionAttributes: {},
        response: buildSpeechletResponse({
            cardTitle: `${ name } has returned`,
            speechOutput,
            repromptText: "",
            shouldEndSession: true
        })
    };
}

module.exports = returning;
