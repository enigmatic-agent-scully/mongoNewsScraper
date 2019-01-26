import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';

const port = 3001;
const app = express();
const db = mongoose.connection;
const mongo_uri = process.env.MONGODB_URI || 'mongodb://localhost/mongoscraper';

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect(
  mongo_uri,
  { useNewUrlParser: true }
);

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('Connected!');
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
