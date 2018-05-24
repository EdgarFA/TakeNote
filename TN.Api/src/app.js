const  express = require('express');
const app = express();
const routes = require('./routes');
const cors = require('cors');

//MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//ROUTES
app.use('/api', routes)


module.exports = app;