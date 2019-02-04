const crypto = require('crypto');

module.exports = function giveRandomSocketId() {
    return new Promise((res) => {
        crypto.randomBytes(200, (err, buf) => {
            res(buf.toString('hex').substring(0, 20));
        });
    });
};
