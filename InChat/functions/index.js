/* jshint esversion: 8 */

const functions = require('firebase-functions');
const userFunctions = require('./user.functions')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

exports.createUser = userFunctions.createUser;
exports.deleteUser = userFunctions.deleteUser;