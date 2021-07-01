const fs = require('fs-extra')
const path = require('path')

module.exports = function (filePath, content, fileName = '') {
    let finalPath = filePath
    if (fileName !== '') {
        finalPath = path.join(filePath, fileName)
    }

    if (!fs.existsSync(finalPath)) {
        fs.ensureDirSync(path.join(finalPath, '..'))
    }

    try {
        const data = fs.writeFileSync(finalPath, JSON.stringify(content))
        return data == undefined
    } catch (e) {
        return false
    }
}