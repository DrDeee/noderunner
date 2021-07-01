const readFile = require('fs/promises').readFile
const path = require('path')

module.exports = async function (filePath, fileName = '') {
    let finalPath = filePath
    if (fileName !== '') {
        finalPath = path.join(filePath, fileName)
    }
    try {
        const data = await readFile(finalPath)
        return JSON.parse(data)
    } catch(e) {
        return {}
    }
}