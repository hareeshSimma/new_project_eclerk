import * as functions from 'firebase-functions';
export const login = functions.https.onRequest((request, response) => {
    response.send("login success");
   });