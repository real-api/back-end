const requestLimiter = require("express-rate-limit")
const MongoStore = require("rate-limit-mongo")
const limiter = requestLimiter({
    max: 20,
    windowMs: 1000 * 40,
    message: {
        status : 403,
        error : "Forbidden",
        message : "Too many send request", 
    },
    statusCode : 403,
    store: new MongoStore({
        uri: 'mongodb://localhost:27017/realApi',
        user: '',
        password: '',
        expireTimeMs: 15 * 60 * 1000,

    }),
})

module.exports = limiter