var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var categorySchema = new Schema({
    name: String,
    date: String,
    todos: [
        {
            text: String,
            isDone: Boolean
        }
    ],
    isDone: Boolean
});

var Categorys = mongoose.model('Categorys', categorySchema);

module.exports = Categorys;