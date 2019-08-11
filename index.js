/**
 * This is the sole entrypoint for the watchdog Alexa Skill.
 * Each valid command is partitioned to it's own file, and mapped to the call by the intent name
 */

 const enforceAuth = require("./enforceAuth");
const leaving = require("./commands/leaving");
const returning = require("./commands/returning");
const queryOne = require("./commands/queryOne");
const queryAll = require("./commands/queryAll");
const welcome = require("./commands/welcome");
const help = require("./commands/help");
const stop = require("./commands/stop");
const cancel = require("./commands/cancel");

const INTENTS = {
    "SingleLeaveIntent": leaving,
    "SingleReturnIntent": returning,
    "AbsenceQueryIntent": queryOne,
    "MultiQueryIntent": queryAll,
    "AMAZON.HelpIntent": help,
    "AMAZON.StopIntent": stop,
    "AMAZON.CancelIntent": cancel
};

function unknownIntentHandler() {
    throw new Error("Invalid Intent");
}

// Route the incoming request based on type (LaunchRequest, IntentRequest, etc.)
// The JSON body of the request is provided in the event parameter.
exports.handler = async function (event, context) {
    try {
        enforceAuth(event, context); // security through obscurity

        // Called when the session starts.
        if (event.session.new) {
            console.log("onSessionStarted requestId=" + event.request.requestId + ", sessionId=" + event.session.sessionId);
        }

        // Called when the user launches the skill without specifying what they want.
        if (event.request.type === "LaunchRequest") {
            console.log("onLaunch requestId=" + event.request.requestId + ", sessionId=" + event.session.sessionId);

            return context.succeed(await welcome());
        }

        // Called when the user ends the session. Is not called when the skill return shouldEndSession=true
        if (event.request.type === "SessionEndedRequest") {
            console.log("onSessionEnded requestId=" + event.request.requestId + ", sessionId=" + event.session.sessionId);

            // Add cleanup logic here

            return context.succeed();
        }

        if (event.request.type !== "IntentRequest") {
            return;
        }

        // Called when the user specifies an intent for this skill.
        console.log("onIntent requestId=" + event.request.requestId + ", sessionId=" + event.session.sessionId);

        const intentHandler = INTENTS[event.request.intent.name] || unknownIntentHandler;

        context.succeed(await intentHandler(event.request.intent, event.session));
    } catch (e) {
        context.fail("Exception: " + e);
    }
};
