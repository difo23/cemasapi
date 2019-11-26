//Puerto
const dotenv = require('dotenv');
dotenv.config();

process.env.PORT = process.env.PORT || 3000;
const USER = process.env.MONGO_USER;
const PASS = process.env.MONGO_PASS;
const URLDB = process.env.URLDB;
//Entorno

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB;

if (process.env.NODE_ENV === 'dev') {
	urlDB = URLDB;
} else {
	urlDB = `mongodb+srv://${USER}:${PASS}@cafe-1ue16.mongodb.net/test?retryWrites=true`;
}

process.env.URLDB = urlDB;
