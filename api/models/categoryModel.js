var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var categorySchema = new Schema({
    name: String,
    isDone: Boolean
});

var Categorys = mongoose.model('Categorys', categorySchema);

module.exports = Categorys;