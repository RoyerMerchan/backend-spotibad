const express = require('express');
const router = express.Router();
const authController = require('../controllers/authcontroller');
const {deleteU} = require('../controllers/deleteuser')
const {editU} = require('../controllers/edituser')
const tokenM = require('../middlewares/tokenM');
const { swaggerDocs } = require('../swaggercontroller');

  /** POST Methods */
    /**
     * @openapi
     * '/ap/auth/signup':
     *  post:
     *     tags:
     *     - User Controller
     *     summary: Create a user
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - username
     *              - email
     *              - password
     *              - autor
     *            properties:
     *              username:
     *                type: string 
     *                required: true
     *              email:
     *                type: string
     *                required: true
     *              password:
     *                type: string
     *                required: true
     *              autor:
     *                type: Boolean
     *                required: true
     *     responses:
     *       201:
     *         description: Created
     *         content:
     *           application/json:
     *             example:
     *               message: Usuario registrado correctamente
     *       500:
     *         description: Server Error
     *         content:
     *           application/json:
     *             example:
     *               error: Error al registrar el usuario
     */
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.use(tokenM)
router.delete('/delete/:id', deleteU)
router.put('/edit/:id', editU)



module.exports = router;