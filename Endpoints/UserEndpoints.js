const express = require('express');
const router = express.Router();

// Models
const userModel = require("../Models/User")


router.get('/users', async (req, res, next) => {
    res.status(200).json(await userModel.find());
})

router.get('/users/:id', async (req, res, next) => {
    try {
        res.status(200).json(
            await userModel.findById(
                req.params.id
            )
        );
    } catch (err) {
        //res.status(400).json({error: "User ID not found"}, ...err);
        next();
    }
})

router.post('/users', async (req, res, next) => {
    try {
      const user = new userModel({
        name: req.body.name,
        lastname: req.body.lastname,
        phone: Number(req.body.phone),
        email: req.body.email,
        password: req.body.password
      });
  
      const newUser = await user.save();
      res.status(200).json(newUser);
    } catch (error) {
      res.status(400).json({ error: "User creation failed" });
    }
  });


router.put('/users/:id', async (req, res, next) => {
    //const id = req.params.id;
    //const obj = req.body;
    //const user = await userModel.findByIdAndUpdate(id, obj)
    try {
    res.status(200).json(
        await userModel.findByIdAndUpdate(
                        req.params.id, 
                        req.body))
    } catch (err) {
        //res.status(400).json({error: "User ID not found"}, ...err);
        next();
    }
})

router.delete('/users/:id', async (req, res, next) => {
    try {
    res.status(200).json(
        await userModel.findByIdAndDelete(req.params.id))
    } catch (err) {
        //res.status(400).json({error: "User ID not found"}, ...err);
        next();
    }
})

module.exports = router;


