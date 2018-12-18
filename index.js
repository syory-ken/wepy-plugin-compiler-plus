const fs = require('fs');
const path = require('path');
const { extend } = require('./lib/base');
const { compress } = require('./vender/pngquant/index');

exports.__esModule = true;

exports.default = class {
    constructor(config = {}) {
        this.config = extend({
            ext: '-compress.png',
            path: './images'
        }, config);
        let absPath = path.resolve(this.config.path);
        if (!fs.existsSync(absPath)) {
            throw new Error(absPath + ': is not a directory');
        }
        this.map = {};
        readPathToMap(this.config.path, this.map);
    }

    apply(op) {
        for (let key in this.map) {
            if (key.indexOf(op.code)) {
                let item = this.map[key],
                    regexp = new RegExp(`"([^"]${key})"`, 'ig'),
                    newCode = op.code.replace(regexp, item);
                fs.writeFileSync(op.file, newCode, {
                    flag: 'w'
                });
                op.output('[IMG]replace to ' + item);
            }
        }
        op.next();
    }
};

function readPathToMap(path, res) {
    let files = fs.readdirSync(path, {
            withFileTypes: true
        });
    for (let file of files) {
        if (file.isDirectory()) {
            res[file.name] = readPathToMap(path + '/' + file.name);
        } else {
            res[file.name] = compress(path + '/' + file.name);
        }
    }
}