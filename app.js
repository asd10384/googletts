
require('dotenv').config();
const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const sessionParser = require('express-session');

require('./googlettsapi').getkeyfile();

const app = express();
const DOMAIN = process.env.DOMAIN || 'http://localhost';
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/ejs'));

app.use(cors({
  origin: '*',
  // methods: ['GET','POST']
}));
app.use(flash());
app.use(sessionParser({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/file', express.static(__dirname + '/'));

const route = fs.readdirSync('./route').filter(file => file.endsWith('.js'));
route.forEach((file) => {
  app.use(require(`./route/${file.replace('.js', '')}`));
});

// app.use(function (req, res, next) {
//   return res.status(404).send({err: '오류발생'});
// });
// app.use(function (err, req, res, next) {
//   return res.status(500).send({err: '오류발생'});
// });

app.listen(PORT, async function () {
  return console.log(`NODEJS Route IS ONLINE (HTTP)\n${DOMAIN}:${PORT}`);
});
