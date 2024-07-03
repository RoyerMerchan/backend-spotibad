const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/authmodel");

// Registro de usuario
exports.signup = async (req, res) => {
  try {
    const { username, email, password, autor } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('password enviada:' ,password)
    const newUser = new User({ username, email, password: hashedPassword, autor});
    await newUser.save();
        
      res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error al registrar el usuario" });
  }
};

// Inicio de sesión
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    const validPassword = bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ userId: user._id }, "royerSecret", {
      expiresIn: "1h",
    });
    res.status(200).json({msg: "este es el token a usar", token});
    // res.json(token)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};
