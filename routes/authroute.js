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
     *     - Auth Controller
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
     *                type: boolean
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

 /** POST Methods */
    /**
     * @openapi
     * '/ap/auth/login':
     *  post:
     *     tags:
     *     - Auth Controller
     *     summary: Login
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - email
     *              - password
     *            properties:
     *              email:
     *                type: string
     *                required: true
     *              password:
     *                type: string
     *                required: true
     *     responses:
     *       200:
     *         description: Login Sucefful
     *         content:
     *           application/json:
     *             example:
     *               token: "My-Token-JWT"
     *       401:
     *         description: invalid credentials
     *         content:
     *           application/json:
     *             example:
     *               error: "user not found"
     *       500:
     *         description: Server Error
     *         content:
     *           application/json:
     *             example:
     *               error: Error to login
     */

router.post('/login', authController.login);
router.use(tokenM)

/** DELETE Methods */
    /**
     * @openapi
     * '/ap/auth/delete/:id':
     *  delete:
     *     tags:
     *     - Auth Controller
     *     summary: delete user
     *     parameters :
     *        name: userId
     *        in: path
     *        required: true
     *        type: string
     *     responses:
     *       200:
     *         description: user eliminated
     *         content:
     *           application/json:
     *             example:
     *               msg: "user eliminated"
     *       404:
     *         description: "not found user"
     *         content:
     *           application/json:
     *             example:
     *               error: "user not found"
     *       500:
     *         description: Server Error
     *         content:
     *           application/json:
     *             example:
     *               error: Error to delete
     */

router.delete('/delete/:id', deleteU)

router.put('/edit/:id', editU)



module.exports = router;