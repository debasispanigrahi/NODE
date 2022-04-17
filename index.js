//DEPENDENCY
require('module-alias/register')
const express = require('express');
const dotenv = require('dotenv');
const mongo = require("mongoose");
const cors = require('cors');
const fileUpload = require("express-fileupload");
const socketIO = require("socket.io");
const http = require("http");
const es6Renderer = require('express-es6-template-engine')


//IMPORT_FILE
const web = require("./Routes/web");
const api = require("./Routes/api");
const cmdConsole = require("./Routes/console");
const test = require("./Routes/test");

//CONFIGURE
dotenv.config();
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origins: "*:*"
    },
    rejectUnauthorized: false,
    disableHostCheck: true,
    secure: true,
    transports: ['websocket',
        'flashsocket',
        'htmlfile',
        'xhr-polling',
        'jsonp-polling',
        'polling'
    ]
});

//SERVER_USE
app.engine('html', es6Renderer)
app.set('views', 'Views');
app.set('view engine', 'html');
app.use(express.static(__dirname + '/Public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true }));
app.use(fileUpload())


//VARIABLE
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || '8080';
const mongoUrl = process.env.MONGO_LOCAL_URL || process.env.MONGO_URL;

//DATABASE CONNECTION CHECK
mongo
    .connect(mongoUrl)
    .then(() => {
        console.log("Database Connection Successful");
    })
    .catch((err) => {
        console.log("Error occured While connecting database");
    });

//ROUTE
app.use("/api", api);
app.use("/console", cmdConsole);
app.use("/test", test)
app.use(["/", "/index.php"], web);

//SERVER
server.listen(port, host, () => {
    console.log(`Server Running On http://${host}:${port}`)
})