const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const UserSchema = require("../models/user");

router.post("/signup", async (req, res) => {
  try {
    console.log('req.body', req.body);
    const { userName, firstName, lastName, email, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);
    const userFound = await UserSchema.findOne({ email });

    if (userFound) {
      res.status(409).json({ massage: "Já existe um usuário com o mesmo e-mail" })
    }

    const user = new UserSchema({
      userName,
      firstName,
      lastName,
      email,
      password: hashPassword,
    });
    await user.save();
    res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await UserSchema.findOne({ userName });

    if (!user) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const token = jwt.sign({ userName: user.userName }, "secret-key");
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
