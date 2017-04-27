const next = require('next');
const Server = require('./server/index.js');
const logger = require('./server/common/logger');
const dbConnect = require('./server/common/dbConnection');
const User = require('./server/models/User.model');


dbConnect.connect({
  uri: process.env.MONGO_URI,
});
const context = {
  logger,
  User: User.model,
};
const server = Server(context);


const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

app.prepare().then(() => {
  const handle = app.getRequestHandler();
  server.get('*', (req, res) => handle(req, res));
  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    logger.log(`Start app${port}`);
  });
});

