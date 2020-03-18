/* jshint esversion: 8 */

const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

const {Translate} = require('@google-cloud/translate').v2;
const translate = new Translate();

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
exports.translateInitialMessage = functions.firestore.document(`messages/{id}`)
  .onCreate(async (snapshot, context) => {
    // Check that message and language exist
    if (snapshot.data().isTextBased === null) {
      console.log('Error: isTextBased field is invalid');
      return null;
    }

    if (snapshot.data().isTextBased) {
      // Text-based
      if (snapshot.data().originalLanguage === null
          || snapshot.data().oldMessage === null) {
        console.log('Error: originalLanguage or originalMessage field is invalid');
        return null;
      }
      
      const getTranslatedMessage = (_oldMessage, _oldLanguage, _newLanguage) => {
        // Might need return await (blah blah);
        // return `Translation goes here. (${_newLanguage})`;
        return translate.translate(_oldMessage, _newLanguage);
      };

      // Allowed languages
      const allowedLanguages = [
        'en-US',
        'ko-KR',
        'es-ES',
      ];

      // All Translations to update into document
      let allTranslations = new Object;
      const oldLanguage = snapshot.data().originalLanguage;
      const oldMessage = snapshot.data().originalMessage;

      for (const language of allowedLanguages) {
        if (language === oldLanguage) {
          allTranslations[oldLanguage] = oldMessage;
        } else {
          allTranslations[language] = getTranslatedMessage(oldMessage, oldLanguage, language);
        }
      }

      return admin.firestore().doc(`messages/${context.params.id}`).set({
        translations: allTranslations,
      }, {merge: true});
    } else {
      // Chat-based
      if (snapshot.data().originalVoice === null) {
        console.log('Error: originalVoice field is invalid');
        return null;
      }

      // Translate here and add to firebase in a promise
      
      return null;
    }
  });
