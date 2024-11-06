/* eslint-disable no-undef */
const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async() => {
  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV === 'development' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*']
      }
    }
  });

  server.route(routes);
  await server.start();
  console.log(`server already running at http://${process.env.NODE_ENV === 'development' ? 'localhost' : '0.0.0.0'}:5000`);
};

init();