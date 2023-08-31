const net = require('net');

const minPackageHeaderLength = 8;

class RPC {
    constructor({encode, decode, isReceiveComplete}) {
        this.encode = encode;
        this.decode = decode;
        this.isReceiveComplete = isReceiveComplete;
    }

    createServer(callback) {
        let buffer = null,
            packageLength = null;
        const tcpServer = net.createServer(socket => {
            socket.on('data', data => {
                buffer = buffer && buffer.length > 0 ? Buffer.concat([buffer, data]) : data;
                while (buffer && (packageLength = this.isReceiveComplete(buffer))) {
                    let packageMain = null;
                    if (buffer.length === packageLength) {
                        packageMain = buffer;
                        buffer = null;
                    } else {
                        packageMain = buffer.slice(0, minPackageHeaderLength);
                        buffer = buffer.slice(minPackageHeaderLength);
                    }
                    const {seq, result} = this.decode(packageMain);
                    callback({
                        body: result,
                        socket
                    }, {
                        end: (data) => {
                            const resultBuffer = this.encode(data, seq);
                            socket.write(resultBuffer);
                        }
                    });
                }
            });
        });

        return {
            listen(...args) {
                tcpServer.listen.apply(tcpServer, args);
            }
        };
    }
}

module.exports = RPC;