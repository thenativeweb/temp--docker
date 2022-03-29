'use strict';

const { flaschenpost } = require('flaschenpost');
const http = require('http');
const { processenv } = require('processenv');

const logger = flaschenpost.getLogger();

const message = processenv('MESSAGE', 'Hello world!');
const port = processenv('PORT', 3_000);

const server = http.createServer((req, res) => {
  res.write(`${message}\n`);
  res.end();
});

server.listen(port, () => {
  logger.info('Server started.', { port });
});
