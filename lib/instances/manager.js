const loadFile = require('../util/fileloader.js')
const saveFile = require('../util/filesaver')

class InstanceManager {
    constructor(rootDir) {
        this.config = {}
        this.rootDir = rootDir
        this._init()
    }

    async _init() {
        this.config = await loadFile(this.rootDir, 'instances.json')
    }

    async saveConfig() {
        const success = await saveFile(this.rootDir, this.config, 'instances.json')
        if (!success) console.error('Error while saving instance index.')
    }
}

module.exports = InstanceManager