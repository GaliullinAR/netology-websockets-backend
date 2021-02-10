const path = require('path');
const Koa = require('koa');
const koaStatic = require('koa-static');
const koaBody = require('koa-body');
const Router = require('koa-router');
const { Chat } = require('./src/Chat');

const chat = new Chat();
chat.login('User 1');
chat.login('User 2');
console.log(chat.users);

const app = new Koa();

app.use(async (ctx, next) => {
  // Так как frontend на ходится на сервере, то CORS не нужен.
  ctx.response.set('Access-Control-Allow-Origin', '*');
  console.log('Enable CORS for development.');
  await next();
});

const dirPublic = path.join(__dirname, 'public');
app.use(koaStatic(dirPublic));

// Чтобы router выдавал тело запроса (ctx.request.body).
app.use(koaBody());

const router = new Router();

app.use(router.routes());
app.use(router.allowedMethods());

const PORT = process.env.PORT || 3000;
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Koa server has been started on port ${PORT} ...`));

router.get('/users', async (ctx) => {
  console.log('URL', ctx.request.url);
  ctx.response.body = JSON.stringify([...chat.users]);
});

router.post('/login', async (ctx) => {
  console.log('URL', ctx.request.url);
  console.log('ctx.request.body', ctx.request.body);
  ctx.response.body = JSON.stringify(chat.login(ctx.request.body));
});
