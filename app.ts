//DEPENDENCY
/// <reference path="./@types/module.d.ts" />

import'module-alias/register.js'
import '@/Helpers/global.helper.js'
import express, {Express} from 'express'
import dotenv from 'dotenv'
import mongo from 'mongoose'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import http from 'http'
import es6Renderer from 'express-es6-template-engine'

//IMPORT_FILE
import web from '@/Routes/web.route'
import api from '@/Routes/api.route'
import cmdConsole from '@/Routes/console.route'
import test from '@/Routes/test.route'


//CONFIGURE
dotenv.config();
const app:Express = express();
const server = http.createServer(app);

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
const mongoUrl = process.env.MONGO_LOCAL_URL || process.env.MONGO_URL||'';
const backlog=process.env.BACK_LOG || 511

//DATABASE CONNECTION CHECK
mongo
    .connect(mongoUrl)
    .then(() => {
        console.log("Database Connection Successful");
    })
    .catch(() => {
        console.log("Error occured While connecting database");
    });

//ROUTE
app.use("/api", api);
app.use("/console", cmdConsole);
app.use("/test", test)
app.use(["/", "/index.php"], web);
// app.use("/web",web)

//SERVER
server.listen(+port, host, +backlog,() => {
    console.log(`Server Running On http://${host}:${port}`)
})


