/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills Kit.
 * The Intent Schema, Custom Slots, and Sample Utterances for this skill, as well as
 * testing instructions are located at http://amzn.to/1LzFrj6
 *
 * For additional samples, visit the Alexa Skills Kit Getting Started guide at
 * http://amzn.to/1LGWsLG
 */

const singleLeavingReply = require("./commands/leaving");
const singleReturnReply = require("./commands/returning");
const queryReply = require("./commands/queryOne");
const Reply = require("./reply");

// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = function (event, context) {
    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);

        /**
         * Uncomment this if statement and populate with your skill's application ID to
         * prevent someone else from configuring a skill that sends requests to this function.
         */
        /*
        if (event.session.application.applicationId !== "amzn1.echo-sdk-ams.app.[unique-value-here]") {
             context.fail("Invalid Application ID");
        }
        */

        if (event.session.new) {
            onSessionStarted({requestId: event.request.requestId}, event.session);
        }

        if (event.request.type === "LaunchRequest") {
            onLaunch(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(Reply.buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "IntentRequest") {
            onIntent(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(Reply.buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "SessionEndedRequest") {
            onSessionEnded(event.request, event.session);
            context.succeed();
        }
    } catch (e) {
        context.fail("Exception: " + e);
    }
};

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    console.log("onSessionStarted requestId=" + sessionStartedRequest.requestId +
        ", sessionId=" + session.sessionId);
}

/**
 * Called when the user launches the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    console.log("onLaunch requestId=" + launchRequest.requestId +
        ", sessionId=" + session.sessionId);

    // Dispatch to your skill's launch.
    getWelcomeResponse(callback);
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
    console.log("onIntent requestId=" + intentRequest.requestId +
        ", sessionId=" + session.sessionId);

    const intent = intentRequest.intent,
        intentName = intentRequest.intent.name;

    // Dispatch to your skill's intent handlers
    if ("SingleLeaveIntent" === intentName) {
        singleLeavingReply(intent, session, callback);
    } else if ("SingleReturnIntent" === intentName) {
        singleReturnReply(intent, session, callback);
    } else if ("AbsenceQueryIntent" === intentName) {
        queryReply(intent, session, callback);
    } else if ("AMAZON.HelpIntent" === intentName) {
        getHelpResponse(callback);
    } else if ("AMAZON.StopIntent" === intentName) {
        getStopResponse(callback);
    } else if ("AMAZON.CancelIntent" === intentName) {
        getCancelResponse(callback);
    } else {
        throw "Invalid intent";
    }
}

/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {
    console.log("onSessionEnded requestId=" + sessionEndedRequest.requestId +
        ", sessionId=" + session.sessionId);
    // Add cleanup logic here
}

// --------------- Functions that control the skill's behavior -----------------------

function getStopResponse(callback) {
    const cardTitle = "Stop";
    const speechOutput = "Goodbye.";
    const repromptText = "";
    const shouldEndSession = true;
    callback({}, Reply.buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function getCancelResponse(callback) {
    const cardTitle = "Cancel";
    const speechOutput = "Watchdog command cancelled. Exiting.";
    const repromptText = "";
    const shouldEndSession = true;
    callback({}, Reply.buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function getWelcomeResponse(callback) {
    // If we wanted to initialize the session to have some attributes we could add those here.
    const sessionAttributes = {};
    const cardTitle = "Welcome to Watchdog";
    const speechOutput = "Watchdog is a tool to help you track how long you've been away. " +
        "You can also ask how long it has been since someone else left. " +
        "For sample commands, say 'help'. Otherwise, try issuing a command now.";
    const repromptText = "For sample commands, say 'help'. Otherwise, try issuing a command now.";
    const shouldEndSession = false;

    callback(sessionAttributes,
        Reply.buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function getHelpResponse(callback) {
    // If we wanted to initialize the session to have some attributes we could add those here.
    const sessionAttributes = {};
    const cardTitle = "Watchdog Help";
    const speechOutput = "Start Watchdog tracking by telling WatchDog 'Someone is leaving'. " +
        "Finish a session by telling WatchDog 'Someone is back'. " +
        "You can also check how long tracked people have been away by asking WatchDog " +
        "'How long has Someone been away'.";
    const repromptText = "Try issuing WatchDog a command now.";
    const shouldEndSession = false;

    callback(sessionAttributes,
        Reply.buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}
