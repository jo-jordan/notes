const App = require('koa')
const { spawn } = require('child_process');

const app = new App()

// logger
app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

app.use(async ctx => {
    ctx.request;

    const ls = spawn('bash', ['./deploy.sh']);


    ls.stdout.on('data', (data) => {
        console.log(`[info]：${data}`);
    });

    ls.stderr.on('data', (data) => {
        console.log(`[error]：${data}`);
    });

    ls.on('close', (code) => {
        console.log(`child_process exit cocd：${code} at ${new Date()}`);
    });
    ctx.body = 'deploy finish';
});

app.listen(3000)
console.log('Server running on port 3000');
