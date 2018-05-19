const  express = require('express');
const app = express();
const cors = require('cors');

const indexRoutes = require('./routes/index');
const usuarioRoutes = require('./routes/usuario');

//SETTINGS
app.set('port',process.env.PORT || 7171);

//MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//ROUTES
app.use(indexRoutes);
app.use('/api',usuarioRoutes);

app.listen(app.get('port'),()=>{
    console.log(`Server on port`,app.get('port'));
});