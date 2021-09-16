const express = require('express')
const app = express();
const http = require('http');
const mongoose = require("mongoose")
const cookieParser = require('cookie-parser');
require('dotenv').config()
const DB_URI = `${process.env.DB_URI}/${process.env.DB_DBNAME}`
const AppRoutes = require("app/routes/routes");
const passport = require('passport');
const session = require("express-session");
const rememberLogin = require("app/http/middlewares/user.token.middleware");

module.exports = class Application {
    constructor() {
        this.configApplication();
        this.createRouting();
        this.errorHandler();
        this.createServer();
        this.connectToDatabase();
    }
    createServer() {
        const server = http.createServer(app);
        server.listen(process.env.PORT, () => {
            console.log(`run server on port ${process.env.PORT}`);
        })
    }
    connectToDatabase() {
        mongoose.connect(DB_URI, error => {
            if (!error) return console.log('connect to DB successful');
            console.log('cannot connect to DB');
        })
    }
    configApplication() {
        require("app/helpers/passport/passport.local")
        app.use(express.static("public"))
        app.use(express.json())
        app.use(express.urlencoded({ extended: true }))
        app.use(cookieParser(`${process.env.SECRET_STRING}`))
        app.set(session({
            secret: `${process.env.SECRET_STRING}`,
            resave: true,
            saveUninitialized: true,
            cookie: {
                secure: true
            }
        }));
        app.use(passport.initialize())
        app.use(passport.session())
        app.use(rememberLogin.login)
    }
    createRouting() {
        app.use(AppRoutes)
    }
    errorHandler() {
        app.use("*", (req, res, next) => {
            return res.status(404).json({
                status: 404,
                error: "Not Found Route"
            })
        })
        app.use((err, req, res, next) => {
            if (!err.status) err = { status: 504, success: false, error: 'SomeThingWrong' }
            return res.status(err.status).json(err)
        })

    }
}