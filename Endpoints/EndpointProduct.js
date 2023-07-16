const express = require('express');
const routers = express.Router();

const productModel = require('../Models/Products');
//middleware
const upload = require('../Middlewares/Cloudinary');

//get

routers.get('/products', async (req, res) => {
  const product = await productModel.find();
  return res.status(200).json(product);
});

routers.post('/products', upload.single('img'), async (req, res) => {
  const { title, description, price, brand } = req.body;
  const image = req.file ? req.file.path : '';

  try {
    const titleOld = await productModel.findOne({ title });
    if (titleOld) {
      return res.json({ error: 'Product Exists' });
    }
    await productModel.create({
      title,
      img: image, 
      description,
      price,
      brand,
    });
    res.send({ status: 'Product Registered' });
  } catch (error) {
    res.send({ status: 'error' });
  }
});

routers.put('/products/:id', async (request, response, next) => {
    const id = request.params.id;
    const obj = request.body;
    try {
      const editProduct = await productModel.findByIdAndUpdate(id, obj);
      if (editProduct) {
        return response.status(200).json(editProduct);
      } else {
        return response.status(404).json({ error: 'Prodotto non trovato' });
      }
    } catch (err) {
      next(err);
    }
  });


  routers.delete('/product/:id', async (req, res, next) => {
    try {
      const deletedProduct = await productModel.findByIdAndDelete(req.params.id);
      if (deletedProduct) {
        res.status(200).json(deletedProduct);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (err) {
      next(err);
    }
  });


module.exports = routers;
