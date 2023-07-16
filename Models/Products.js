const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true
        },
        img:{
            type: String,
            require: true
        },
        description:{
            type: String,
            require: true
        },
        price:{
            type: Number,
            require: true
        },
        brand:{
            type: String,
            require: true
        }
    }
);

const productModel = mongoose.model('products', productSchema);

module.exports = productModel;