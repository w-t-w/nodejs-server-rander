const RPC = require('../lib');

const minPackageHeaderLength = 8,
    seqLength = 4;

module.exports = (encodeSchema, decodeSchema) => {
    return new RPC({
        encode(data, seq) {
            const body = encodeSchema.encode(data);
            const bodyLength = body.length;
            const header = Buffer.alloc(minPackageHeaderLength);
            header.writeInt32BE(seq);
            header.writeInt32BE(bodyLength, seqLength);
            return Buffer.concat([header, body]);
        },
        decode(buffer) {
            const seq = buffer.readInt32BE();
            const body = buffer.slice(minPackageHeaderLength);
            const result = decodeSchema.decode(body);
            return {
                seq,
                result
            };
        },
        isReceiveComplete(buffer) {
            if (buffer.length <= minPackageHeaderLength)
                return 0;
            const bodyLength = buffer.readInt32BE(seqLength);
            if (buffer.length >= bodyLength + minPackageHeaderLength)
                return bodyLength + minPackageHeaderLength;
            else
                return 0;
        }
    });
};