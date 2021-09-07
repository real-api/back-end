const multer = require('multer');
const mkdir = require("mkdirp")
const fs = require('fs')
function createDirectory() {
    const date = new Date()
    const YEAR = date.getFullYear();
    const MONTH = date.getMonth();
    const DAY = date.getDate();
    const location = `./public/upload/images/${YEAR}/${MONTH}/${DAY}`;
    return location
}
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let location = createDirectory();
        mkdir(location).then(made => {
            cb(null, location)
        }).catch(err => {
            return undefined
        })
    },
    filename: (req, file, cb) => {
        const fileLocation = `${createDirectory()}/${file.originalname}`
        const fileName = file.originalname.replace(/[\s(){}#%@]/gi, "")
        if (fs.existsSync(fileLocation)) {
            cb(null, Date.now() + fileName);
        } else {
            cb(null, fileName)
        }
    }
})
if (!storage) throw { status: 400, error: "Bad Request", message: 'Not Found File in Your Directory' }

const upload = multer({ storage });
module.exports = upload