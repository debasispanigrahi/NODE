//DEPENDENCY
const express = require('express');
const dotenv = require('dotenv');

//CONFIGURE
dotenv.config();
const app = express();

//VARIABLE
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || '8080';

//ROUTE


//SERVER
app.listen(port, host, () => {
    console.log(`Server Running On http://${host}:${port}`)
})