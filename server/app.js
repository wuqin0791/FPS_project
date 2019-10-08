'use strict';
const koa           = require('koa'),
      app           = new koa(),
      cookieSession = require('koa-session'),
      bodyParser    = require('koa-bodyparser'),
      helmet        = require('koa-helmet'),
      logger        = require('koa-logger');

const config        = require('./config/config');
const rootRouter    = require('./router');
const middleware    = require('./middleware');

app.keys = ['!@#igx73lhx89$&#@&#$#@'];

// x-response-time
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set("X-Response-Time", `${ms}ms`);
    ctx.set('X-Powered-By', 'Uncle Diao');
    // ctx.set('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, HEAD, PATCH');
});

app
    .use(helmet())
    .use(cookieSession({
        key: 'ORDER_MEAL::sess',
        maxAge: 86400000*30
    }, app))
    .use(logger())
    .use(bodyParser())
    .use(rootRouter.routes())
    .use(rootRouter.allowedMethods());
const port = config.port || 30001;
app.listen(port);
console.log('server is start at port ' + config.port);
