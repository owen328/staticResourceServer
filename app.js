const Koa = require('koa');

// const router = require('koa-router')();
// const bodyparser = require('koa-bodyparser');
const path = require("path");
const fs = require("fs");
const app = new Koa();
const content = require("./utils/content");

const mimes = require('./mime.json');

const staticPath = path.join(__dirname, './static');



app.use(async (ctx, next) => {
    let date = new Date();
    console.log(date.toISOString() + ' ' + ctx.request.method + ' ' + decodeURI(ctx.request.path));
    await next();
})

app.use(async (ctx) => {

    // let urlpath = decodeURI(ctx.request.path);
    
    
    let ext = path.extname(ctx.request.path);
    ext = ext ? ext.slice(1) : null;
    let mime = mimes[ext] ? mimes[ext] : 'text/html';
    let _content = await content(ctx, staticPath)
   
    
    ctx.response.set('Content-Type', mime + '; charset=utf-8');
    
    ctx.response.body = _content;
    
    
});




app.listen(8089);

console.log('app start listen 8089');