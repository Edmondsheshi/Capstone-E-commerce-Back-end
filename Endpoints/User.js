const express = require('express');
const router = express.Router();

// Models
const UserModel = require("../Models/User");

// Middlewares
const auth = require("../Endpoints/Auth")

router.get('/users', auth, async (req, res, next) => {
    const allUsers = await UserModel.find();
    return res.status(200).json(allUsers);
})

router.post('/user', async (req, res, next) => {
    try {
    const { name, lastname, phone, email, password } = req.body;
  
      // Creazione di un nuovo utente utilizzando il modello User
    const newUser = new UserModel({
        name,
        lastname,
        phone,
        email,
        password,
    });
  
      // Salvataggio del nuovo utente nel database
    await newUser.save();
  
    res.status(200).json(newUser);
    } catch (error) {
    res.status(400).json({ error: "User creation failed" });
    }
});

// Export Router
module.exports = router;