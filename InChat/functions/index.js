/* jshint esversion: 8 */

const functions = require('firebase-functions');
const admin = require('firebase-admin');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send('Hello from Firebase!');
});

// This event handler will run whenever a new account is created
// through the Firebase authentication mechanisms
exports.createUser = functions.auth.user().onCreate(event => {
    const user = event.data || null;
    const id = user.uid || '';
    const displayName = user.displayName || null;
    const photoURL = user.photoURL || null;

    if (user === null|| id === null || displayName === null || photoURL === null) {
        return false;
    }

    try {
        admin.database().ref(`/users/${id}/name`).set(`${displayName}`);
        admin.database().ref(`/users/${id}/chatIds`).set('');
        admin.database().ref(`/users/${id}/friends`).set('');
    } catch (error) {
        console.log('Error during createUser(): ' + error);
        return false;
    }

    return true;
});

// This HTTPS request must include a parameter labelled 'userId'
exports.deleteUser = functions.https.onRequest((request, response) => {
    let userIdentifier = request.body.userId || null;
    let FieldValue = admin.firestore.FieldValue || null;
    let usersReference = db.collection('users').doc(`${userIdentifier}`) || null;

    if (userIdentifier === null || FieldValue === null || usersReference === null) {
        response.send(false);
    }
    
    try {
        usersReference.update({
            userIdentifier: FieldValue.delete()
        });
    } catch (error) {
        console.log('Error during deleteUser(): ' + error);
        response.send(false);
    }

    response.send(true);
});

// Promise-based check to find if a user does exist in the database system
exports.doesUserExist = functions.https.onRequest((request, response) => {
    let userIdentifier = request.body.userId || null;

    if (userIdentifier === null) {
        response.send(false);
    }

    let userReference = db.collection('users').doc(`${userIdentifier}`);
    docRef.get().then((doc) => {
        if (doc.exists) {
            response.send(true);
            return true;
        } else {
            response.send(false);
            return true;
        }
    }).catch((error) => {
        console.log('Error during doesUserExist(): ' + error);
        response.send(null);
        return false;
    });
});

// Get each new message creation event and translate it, then add back to Firestore
exports.translateInitialMessage = functions.firestore.document(`messages/{newMessage}`)
  .onCreate(async (snapshot, context) => {
    if (snapshot.data().translations === null) {
      console.error('Translations map does not exist, no translations could be performed.');
      return;
    }

    // Allowed languages
    const allowedLanguages = [
      'en-US',
      'ko-KR',
      'es-ES',
    ];

    const localTranslationsMap = snapshot.data().translations;
    for (const property in localTranslationsMap) {
      if (allowedLanguages.includes(`${property}`)) {
        console.log(`${property}: ${localTranslationsMap[property]}`);
      }
    }

    return;
});

//Google Translate Api URL
