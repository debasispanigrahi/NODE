const fs = require('fs')

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const getSessionFile = param => JSON.parse(fs.readFileSync(param))

const makeUndefined = (target, ...args) => !args.forEach(key => target[key] = undefined) && target

const getFromObject = (target, fields, payload = {}) => !fields.forEach(key => payload[key] = target[key]?.toString()) && payload

const getObjectToArray = (target, fields, payload = []) => !fields.forEach(key => payload.push({ [key]: "" + target[key] })) && payload


module.exports = { delay, getSessionFile, makeUndefined, getFromObject, getObjectToArray }