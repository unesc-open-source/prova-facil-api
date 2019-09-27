const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/provafacil', { useNewUrlParser: true })
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

module.exports = mongoose;