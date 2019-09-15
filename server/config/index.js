//Puerto
process.env.PORT = process.env.PORT || 3000;
const USER = process.env.MONGO_USER;
const PASS = process.env.MONGO_PASS;

//Entorno

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

let urlDB;

if (process.env.NODE_ENV === 'dev') {
	urlDB = 'mongodb://localhost:27017/cemas';
} else {
	urlDB = `mongodb+srv://${USER}:${PASS}@cafe-1ue16.mongodb.net/test?retryWrites=true`;
}

process.env.URLDB = urlDB;
