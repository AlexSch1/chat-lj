const mongoose = require('mongoose');
const config = require('../config/index');

mongoose.connect(config.get('mongoose:uri'), {useNewUrlParser: true, useUnifiedTopology: true});

module.exports = mongoose;