const router = require('express').Router();
const usuarioCtrl = require('../controllers/usuario')
const loginCtrl = require('../controllers/login')
const auth = require('../middlewares/auth')

//INDEX
router.get('/',(req,res,next)=>{
    res.send('API WORK!!!');
});

//USUARIOS
router.get('/usuarios',auth,usuarioCtrl.getAllUser);
router.get('/usuarios/:email/:password',usuarioCtrl.getUser);

//LOGIN
router.post('/signIn',loginCtrl.signIn);
router.post('/signUp',loginCtrl.signUp);

router.get('/private', auth, (req, res) => {
    res.status(200).send(
        { 
            message: 'Tienes acceso',
            id: req.user
        }
    )
})
module.exports = router;