/* eslint-disable no-undef */
const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async() => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*']
      }
    }
  });

  server.route(routes);
  await server.start();
  console.log('server already running at http://localhost:3000');
};

init();