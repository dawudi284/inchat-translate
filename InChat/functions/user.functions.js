/* jshint esversion: 8 */

const functions = require('firebase-functions');
const admin = require('firebase-admin');

// This event handler will run whenever a new account is created
// through the Firebase authentication mechanisms
createUser = functions.auth.user().onCreate(event => {
    const user = event.data || null;
    const id = user.uid || null;
    const displayName = user.displayName || null;
    const photoURL = user.photoURL || null;

    if (user === null|| id === null || displayName === null || photoURL === null) {
        return false;
    }

    try {
        admin.database().ref('/users/${id}/name').set('${displayName}');
        admin.database().ref('/users/${id}/chatIds').set('');
        admin.database().ref('/users/${id}/friends').set('');
    } catch (error) {
        console.log("Error during createUser(): " + error);
        return false;
    }

    return true;
});

// This HTTPS request must include a parameter labelled 'userId'
deleteUser = functions.https.onRequest((request, response) => {
    let userIdentifier = request.body.userId || null;
    let FieldValue = admin.firestore.FieldValue || null;
    let usersReference = db.collection('users').doc('${userIdentifier}') || null;

    if (userIdentifier === null || FieldValue === null || usersReference === null) {
        response.send(false);
    }
    
    try {
        usersReference.update({
            '${userIdentifier}': FieldValue.delete()
        });
    } catch (error) {
        console.log("Error during deleteUser(): " + error);
        response.send(false);
    }

    response.send(true);
});

exports.createUser = this.createUser;
exports.deleteUser = this.deleteUser;