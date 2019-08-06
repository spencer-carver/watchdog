## Privacy Policy

This application stores a name associated with a user from the list of names available in AMAZON.US_FIRST_NAMES. In order to make the app better serve the user, this information is combined with a unique identifier (`userId`) from the user's session, so that two users with the same first name won't collide in the table and cause the older data to be erased.

This information is stored in a dynamoDB table used only for this application, and the entries are removed when the user indicates they have returned. Entries are stored for the sole purpose of being queriable  while they are gone and upon return.


## Latest Update

# v1.1.0 - 2019-08-05

* added `queryAll` command code, sample utterances, and intent schema entry
