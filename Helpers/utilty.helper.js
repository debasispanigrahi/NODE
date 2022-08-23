const fs = require('fs')
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
const getSessionFile = param => { return JSON.parse(fs.readFileSync(param)) }
const makeUndefined=(target,...args)=>{
    args.forEach(key=>{
        target[key]=undefined
    })
    return target
}


module.exports = { delay, getSessionFile,makeUndefined }