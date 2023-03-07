'use strict';

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config();

const {
  PORT,
  HOST,
  HOST_URL,
  API_KEY,
  PROJECT_ID,
  AUTH_DOMAIN,
  MESSAGING_SEBDER_ID,
  STORAGE_BUCKET,
  MEASUREMENT_ID,
  APP_ID,
} = process.env;


assert(PORT,'PORT is required');
assert(HOST,'HOST is required');


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

module.exports={
  port:PORT,
  host:HOST,
  url:HOST_URL,
  firebaseConfig : {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SEBDER_ID,
    appId: APP_ID,
    measurementId: MEASUREMENT_ID,
  },
}


// Initialize Firebase