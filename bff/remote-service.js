const service = require('restana')();
service.get('/get', (req, res) => {
  res.send('Hello World - gateway');
});

service
  .start(3000)
  .then(() => console.log('Remote Service started on port 3000'));
