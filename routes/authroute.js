const express = require('express');
const router = express.Router();
const authController = require('../controllers/authcontroller');
const {deleteU} = require('../controllers/deleteuser')
const {editU} = require('../controllers/edituser')
const tokenM = require('../middlewares/tokenM');
const { swaggerDocs } = require('../swaggercontroller');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
// router.use(tokenM)
router.delete('/delete/:id',tokenM, deleteU)
router.put('/edit/:id',tokenM, editU)



module.exports = router;