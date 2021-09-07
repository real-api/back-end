const autoBind = require("auto-bind")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const fs = require("fs")
module.exports = class Controller {
    constructor() {
        autoBind(this)
    }
    hashPassword(password) {
        const salt = bcrypt.genSaltSync(15);
        const hashed = bcrypt.hashSync(password, salt);
        return hashed
    }
    setCookie(res, token1) {
        res.cookie("user-token", token1, { signed: true, httpOnly: true, expires: new Date(Date.now() + (1000 * 60 * 60 * 24)) })
        // res.cookie("refresh-token", this.refreshTokenGenerator(), { signed: true, httpOnly: true, expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 6)) })
    }
    jwtGenerator(id, email) {
        const token = jwt.sign({ id, email }, `${process.env.JWT_SECRET}`, { expiresIn: Date.now() + (1000 * 60 * 60 * 24), algorithm: "HS256" });
        return token
    }
    async verifyJWTToken(token) {
        return jwt.verify(token, `${process.env.JWT_SECRET}`, { algorithms: "HS256" });
    }
    errorHandler(errors, errorList) {
        Object.values(errors).forEach(err => {
            errorList[err.param] = err.msg;
        })
    }
    removeEmptyProperty(object) {
        Object.keys(object).forEach(key => {
            if (!object[key] || object[key].length < 1) delete object[key]
        })
    }
    /**
     * 
     * @param {set status code for show correct message } code 
     * @param {optional object you want to show in response for user} object 
     * @returns 
     */
    Exception(code, object = {}) {
        if (code === 200) {
            return {
                status: code,
                success: true,
                message: 'OK',
                ...object
            }
        } else if (code === 400) {
            return {
                status: code,
                success: false,
                error: 'Bad Request',
                ...object
            }
        } else if (code === 401) {
            return {
                status: code,
                success: false,
                error: 'Unauthorized',
                ...object
            }
        } else if (code === 403) {
            return {
                status: code,
                success: false,
                error: 'Forbidden',
                ...object
            }
        } else if (code === 404) {
            return {
                status: code,
                success: false,
                error: 'Not Found',
                ...object
            }
        } else if (code === 500) {
            return {
                status: code,
                success: false,
                error: 'InternalServerError',
                ...object
            }
        } else if (code === 503) {
            return {
                status: code,
                success: false,
                error: 'ServerUnavailable',
                ...object
            }
        } else {
            return {
                status: 599,
                success: false,
                error: 'SomeThingWrong',
                ...object
            }
        }
    }
    removeFile(Req_File) {
        if (Req_File) {
            let path = `${Req_File.destination}/${Req_File.filename}`
            if (fs.existsSync(path)) {
                fs.unlinkSync(path, (err) => {
                    if (err) {
                        throw { status: 500, message: 'Deleting uploaded file Failed', err }
                    } else {
                        return true;
                    }
                })
            } else {
                return true;
            }
        }

    }
    removeImage(imageField) {
        if (imageField) {
            let indexOf = imageField.indexOf(`${process.env.BaseURL}`)
        let length = `${process.env.BaseURL}`.length;
            let path = "./public" + imageField.substr(length);
            if (fs.existsSync(path)) {
                fs.unlinkSync(path, (err) => {
                    if (err) {
                        throw { status: 500, message: 'Deleting uploaded file Failed', err }
                    } else {
                        return true;
                    }
                })
            } else {
                return true;
            }
        }

    }
    getFileName(Req_File) {
        if (Req_File) {
            let filePath = `${Req_File.destination}/${Req_File.filename}`.substring(8);
            let host = `${process.env.BaseURL}${filePath}`
            return host
        }
        return undefined

    }
}