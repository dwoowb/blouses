const app = require('./app');
const { kickOffSMS } = require('./util/utils');

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});

kickOffSMS();
