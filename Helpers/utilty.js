const fs = require('fs')
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
const getSessionFile = param => { return JSON.parse(fs.readFileSync(param)) }


module.exports = { delay, getSessionFile }