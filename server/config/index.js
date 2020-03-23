//Puerto
const dotenv = require('dotenv');
dotenv.config();

process.env.PORT = process.env.PORT;
const USER = process.env.MONGO_USER;
const PASS = process.env.MONGO_PASS;

//Entorno

const NODE_ENV = process.env.NODE_ENV;

let urlDB;

if (NODE_ENV === 'dev') {
	urlDB = `mongodb://${USER}:${PASS}@localhost/cemas`;
} else {
	urlDB = `mongodb+srv://${USER}:${PASS}@cluster0-4fmpq.mongodb.net/test?retryWrites=true&w=majority`;
}

process.env.URLDB = urlDB;
