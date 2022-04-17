//DEPENDENCY
const express = require('express');
const dotenv = require('dotenv');

//IMPORT_FILE
const web = require("./Routes/web");
const api = require("./Routes/api");
const cmdConsole = require("./Routes/console");
const test = require("./Routes/test");

//CONFIGURE
dotenv.config();
const app = express();

//VARIABLE
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || '8080';

//ROUTE
app.use("/api", api);
app.use("/console", cmdConsole);
app.use("/test", test)
app.use("/", web);

//SERVER
app.listen(port, host, () => {
    console.log(`Server Running On http://${host}:${port}`)
})