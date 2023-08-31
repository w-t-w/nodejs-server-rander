const fs = require('fs');
const path = require('path');
const EasySock = require('easy_sock');
const protobuf = require('protocol-buffers');

const PROTO_PATH = path.resolve(__dirname, '../../../proto/column.proto');

const IP = '127.0.0.1',
    PORT = 4000,
    TIMEOUT = 500;

const minPackageHeaderLength = 8,
    seqLength = 4;

const socket = new EasySock({
    ip: IP,
    port: PORT,
    timeout: TIMEOUT,
    keepAlive: true
});

const {List, Condition} = protobuf(fs.readFileSync(PROTO_PATH, 'utf-8'));

socket.encode = function (data, seq) {
    const body = Condition.encode(data);
    const bodyLength = body.length;
    const header = Buffer.alloc(8);
    header.writeInt32BE(seq);
    header.writeInt32BE(bodyLength, seqLength);
    return Buffer.concat([header, body]);
};

socket.decode = function (buffer) {
    const seq = buffer.readInt32BE();
    const body = buffer.slice(minPackageHeaderLength);
    const result = List.decode(body);
    return {
        seq,
        result
    };
};

socket.isReceiveComplete = function (buffer) {
    if (buffer.length <= minPackageHeaderLength)
        return 0;
    const bodyLength = buffer.readInt32BE(seqLength);
    if (buffer.length >= bodyLength + minPackageHeaderLength)
        return bodyLength + minPackageHeaderLength;
    else
        return 0;
};

module.exports = socket;