const firebase = require('firebase');
const config = require('./config');

const db = firebase.initialize(config.firebaseConfig);

module.exports = db;