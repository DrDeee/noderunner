const fs = require('fs-extra')
const path = require('path')

const DEFAULT_CONFIG = {
    directories: {
        instanceDir: 'instances',
        appDir: 'apps',
        logDir: 'logs'
    }
}

const configPath = 'config.json'

let config
let isLoaded = false

exports.load = function () {
    if (!fs.existsSync(configPath)) {
        fs.ensureDirSync(path.join(configPath, '..'))
    }

    let doValidate = false
    try {
        config = JSON.parse(fs.readFileSync(configPath, 'UTF-8'))
        doValidate = true
    } catch (err) {

        fs.ensureDirSync(path.join(configPath, '..'))
        config = DEFAULT_CONFIG
        exports.save()
    }
    if (doValidate) {
        config = validateKeySet(DEFAULT_CONFIG, config)
        exports.save()
    }

    isLoaded = true
    console.log('Config successfully Loaded')
}

exports.save = function () {
    fs.writeFileSync(configPath, JSON.stringify(config, null, 4), 'UTF-8')
}

function validateKeySet(srcObj, destObj) {
    if (srcObj == null) {
        srcObj = {}
    }
    const keys = Object.keys(srcObj)
    for (let i = 0; i < keys.length; i++) {
        if (typeof destObj[keys[i]] === 'undefined') {
            destObj[keys[i]] = srcObj[keys[i]]
        } else if (typeof srcObj[keys[i]] === 'object' && srcObj[keys[i]] != null && !(srcObj[keys[i]] instanceof Array)) {
            destObj[keys[i]] = validateKeySet(srcObj[keys[i]], destObj[keys[i]])
        }
    }
    return destObj
}

exports.isLoaded = function () {
    return isLoaded
}

exports.getConfig = function () {
    return config
}
