var mongoose = require ('mongoose');

var Schema = mongoose.Schema;

var todoSchema = new Schema ({
    categoryId: String,
    text: String,
    isDone: Boolean
});

var Todos = mongoose.model('Todos', todoSchema);

module.exports = Todos;