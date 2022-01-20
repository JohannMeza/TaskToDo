const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors')
const path = require('path');
// const multer = require('multer');

const routerTask = require('./router/task.js');
const routerUser = require('./router/user.js');


// --- Setting 
app.set('port', 3000);

// --- Use Files Static
app.use(express.static(path.join(__dirname, '..', 'dist')));

// --- Middleswares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


// --- Rutas 
app.use('/api', routerTask);
app.use('/api', routerUser);

module.exports = app