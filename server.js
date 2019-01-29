const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const port = process.env.PORT || 3001;
const app = express();
const db = mongoose.connection;
const mongo_uri = process.env.MONGODB_URI || 'mongodb://localhost/mongoscraper';
const routes = require('./routes');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(routes);

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

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
