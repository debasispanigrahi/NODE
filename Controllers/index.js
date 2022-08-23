const fs = require('fs');
const path = require('path')
const controllers = {}
fs.readdirSync(__dirname).filter((file) => {
    return (file.indexOf(".") !== 0) && (file != "index.js");
}).map((file) => {
    controllers[file.replace('.controller.js', '')] = require(path.join(__dirname, file));
})
module.exports = controllers