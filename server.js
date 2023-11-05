var cors = require('cors')
const next = require('next')
const express = require('express')
const compression = require('compression');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);
  server.disable('x-powered-by');
  server.use(compression());
  server.use(cors());
  server.all('*', (req, res) => {
    return handle(req, res);
  });
  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
