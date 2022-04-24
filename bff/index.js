const gateway = require('fast-gateway');
const server = gateway({
  routes: [
    {
      prefix: '/service',
      target: 'http://127.0.0.1:3000',
      docs: {
        name: 'Public Service',
        endpoint: '/swagger.json',
        type: 'swagger',
      },
    },
  ],
});

server.start(8080).then(() => console.log('Service started on port 8080'));
