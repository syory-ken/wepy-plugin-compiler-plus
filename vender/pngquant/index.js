const os = require('os');
const fs = require('fs');
const { extend } = require('../../lib/base');
const childProcess = require('child_process');
const platform = os.platform();

const {WIN, MAC} = {
    WIN: {
        name: 'win32',
        cmd: __dirname + '/pngquant_win/pngquant.exe'
    },
    MAC: {
        name: 'darwin',
        cmd: __dirname + '/pngquant/pngquant'
    }
}

function runCompress(cmd, args) {
    try {
        fs.accessSync(cmd, fs.constants.X_OK);
    } catch(e) {
        throw new Error(`${cmd} Permission denied`);
    }
    childProcess.execSync(cmd + ' ' + args);
}

module.exports = {
    compress(file, out = '', config = {}) {
        if ((!file || !out) || (typeof file !== 'string' || typeof out !== 'string') ) {
            throw new Error('compress file or out is undefined');
        }
        let defConf = extend({
            ext: '--compress.png'
        }, config);
        if (!out) {
            out = file + '_out_';
        }
        let args = ` --ext ${defConf.ext} --output ${out} ${file}`;
        if (platform === WIN.name) {
            runCompress(WIN.cmd, args);
        } else {
            runCompress(MAC.cmd, args);
        }
        return out + defConf.ext;
    }
}