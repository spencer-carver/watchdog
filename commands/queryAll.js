const db = require("../util/db");
const buildSpeechletResponse = require("../util/buildSpeechletResponse");
const { INTENT_ERROR } = require("../util/constants");

async function queryOne(intent, session) {
    const userId = session.user.userId;

    try {
        const dataItems = await db.queryItems(userId);

        if (!dataItems || dataItems.length === 0) {
            return respond("Hmm, my records appear to be empty. Is everyone home?");
        }

        const names = concatenateNames(dataItems);
        const pronoun = dataItems.length > 1 ? "are" : "is";

        return respond(`My records indicate that ${ names } ${ pronoun } currently away.`);
    } catch (error) {
        console.log("AbsenceQueryIntent Error: ", error);

        return respond(INTENT_ERROR);
    }
}

function concatenateNames(dataItems) {
    const personCount = dataItems.length;

    if (personCount === 1) {
        return dataItems[0].personName.S;
    }

    return dataItems.reduce(function(output, dataItem, index) {
        let joiner = ", ";

        if (index === 0) {
            joiner = "";
        } else if (index + 1 === personCount) {
            joiner = " and ";
        }
        
        return `${ output }${ joiner }${ dataItem.personName.S }`;
    }, "");
}

function respond(speechOutput) {
    return {
        sessionAttributes: {},
        response: buildSpeechletResponse({
            cardTitle: `Who is away?`,
            speechOutput,
            repromptText: "",
            shouldEndSession: true
        })
    };
}

module.exports = queryOne;
