const fs = require('fs');
const path = require('path');
const protobuf = require('protocol-buffers');

const RPC = require('./server');
const columnData = require('../../data/column');

const PROTO_PATH = path.resolve(__dirname, '../../proto/column.proto');

const PORT = 4000;

const {List, Condition} = protobuf(fs.readFileSync(PROTO_PATH, 'utf-8'));

const server = RPC(List, Condition).createServer((request, response) => {
    const {body: {sort, filter}} = request;
    response.end({
        columns: columnData.sort((a, b) => {
            switch (sort) {
                case 1:
                    return a.id - b.id;
                case 2:
                    return a.sub_count - b.sub_count;
                case 3:
                    return a.column_price - b.column_price;
            }
        }).filter(item => {
            if (filter === 0)
                return item;
            else
                return item.type === filter;
        })
    });
});

server.listen(PORT, () => {
    console.log(`The server is running at http://localhost:${PORT}!`);
});