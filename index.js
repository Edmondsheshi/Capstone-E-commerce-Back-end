const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// middlewares start

const debug = require("./Middlewares/debug")
app.use(debug.logUrl);

// endpoints

const Auth = require("./Endpoints/Auth");
app.use(Auth);

const productsRouter = require( "./Endpoints/EndpointProduct");
app.use(productsRouter);

const authEndpoints = require('./Endpoints/Auth')
app.use(authEndpoints);

const userEnpoint = require("./Endpoints/UserEndpoints");
app.use(userEnpoint);


// middleware end

// middleware error
app.use(debug.errorHandler)

// start

mongoose.connect(process.env.MONGODB_PORT) 
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () => {
                    console.log(`Server is running on port ${port}`);
                });
    })
    .catch(err => {
        console.log(err);
    } )
