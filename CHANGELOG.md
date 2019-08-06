## Changelog

# v1.1.1 - 2019-08-06

* fix response builder input paramters to correct echo response
* re-submit update

# v1.1.0 - 2019-08-05

* added `queryAll` command code, sample utterances, and intent schema entry
* changed from AMAZON.US_FIRST_NAME to AMAZON.FirstName to try and improve detection

# v1.0.2 - 2019-08-03

* Refactored code again (now async/await instead of callbacks)
* Connected new DynamoDB table (db helper is backwards-compatible with old table)

# v1.0.1 - 2019-08-01

* Refactored code (no functionality changes) in preparation for renewed development

# v1.0.0 - 2016-08-18

* Accepted to Amazon Alexa Skills Portal

# v0.0.4

* Fixes based on Amazon Skill Feedback.
* Added unique Welcome Intent for when skill is started without specifying a command. Ties into Help Intent.
* Added delete from db when return query completes.
* Changed db storage to be `userId~name` instead of just name to prevent collisions.

# v0.0.3

* Fixes based on Amazon Skill Feedback.
* Changed default (Help) Intent to not end session. Added Sample Utterance for just a username that performs a query.

# v0.0.2

* Fixes based on Amazon Skill Feedback.
* Added Help/Cancel Intents, and cleaned up the Sample Utterances and card text.

# v0.0.1

* Basic functionality