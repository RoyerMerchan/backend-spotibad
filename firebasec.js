const admin = require('firebase-admin');

const serviceAccount = require('./firebasecredentials.json'); // Ruta a tu archivo JSON de credenciales

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://your-project-id.fhttps://spoti-bad-default-rtdb.firebaseio.com/     irebaseio.com' // URL de tu base de datos Firestore
});

module.exports = admin;