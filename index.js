require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const {errorHandler} = require('./middleware/validateRequest');
// const multer = require('multer');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
const route = require('./router/route');
const passport =  require('passport');
app.use(passport.initialize());
app.use(upload.any()); 
app.use(express.static('uploads'));
app.use('/uploads', express.static('uploads'));

app.use('/user', route);

app.use(errorHandler);

app.listen(8080, () => console.log('Server listening on port ' + 8080));