const client = require('../lib');

module.exports = (o) => {
    return new Promise((resolve, reject) => {
        client.write({
            ...o
        }, (err, data) => {
            err ? reject(err) : resolve(data);
        });
    });
};