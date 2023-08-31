const path = require('path');
const koa = require('koa');
const koaMount = require('koa-mount');
const koaStatic = require('koa-static');

const {renderToString} = require('react-dom/server');

const getData = require('./getData');
const template = require('../../template');
const App = require('../build/ssr_index.js');

const STATIC_PATH = path.resolve(__dirname, '../../source/static');
const TEMPLATE_PATH = path.resolve(__dirname, '../../template/index.html');

const PORT = 7777;

const app = new koa();

app.use(koaMount('/favicon.ico', ctx => {
    const {response} = ctx;
    response.status = 200;
    response.body = '';
    return true;
}));

app.use(koaMount('/static', koaStatic(STATIC_PATH)));

app.use(koaMount('/data', async (ctx) => {
    const {request, response} = ctx;
    const {query: {sort = 0, filter = 0}} = request;
    const data = await getData({
        sort: +sort,
        filter: +filter
    });
    response.status = 200;
    response.body = data.columns;
}));

app.use(koaMount('/', async (ctx) => {
    const {request, response} = ctx;
    const {query: {sort = 0, filter = 0}} = request;
    const data = await getData({
        sort: +sort,
        filter: +filter
    });
    const detailTemplate = template(TEMPLATE_PATH);
    response.status = 200;
    response.body = detailTemplate({
        reactString: renderToString(App(data)),
        reactData: data.columns,
        filter,
        sort
    });
}));

app.listen(PORT, () => {
    console.log(`The client is running at http://localhost:${PORT}!`);
});