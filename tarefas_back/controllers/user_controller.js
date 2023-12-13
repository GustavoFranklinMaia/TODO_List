const express = require("express");
const router = express.Router();
const UserSchema = require("../models/user");

// GET / => retornar todos os registros
router.get('/', async (req, res) => {
  res.json(await UserSchema.find());
});

// GET /:id => retornar todos UM registro com o id informado
router.get('/:id', async (req, res) => {
  res.json(await UserSchema.findById(req.params.id));
});

// GET /:id => retornar todos UM registro com o id informado
router.get('/username/:userName', async (req, res) => {
  res.json(await UserSchema.findOne({userName: req.params.userName}));
});

// DELETE /:id => remover UM registro com o id informado
router.delete('/:id', async (req, res) => {
    res.json(await UserSchema.findByIdAndRemove(req.params.id));
});

router.delete('/delete/all', async (req, res) => {
    res.json(await UserSchema.deleteMany({}));
});


module.exports = router;
