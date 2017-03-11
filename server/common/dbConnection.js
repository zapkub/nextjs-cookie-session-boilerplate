const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
exports.connect = function (options = { uri: process.env.MONGO_URI || 'localhost:27017/stock' }) {
  mongoose.connect(options.uri);
};
