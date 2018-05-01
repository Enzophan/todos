var Todos = require ('../models/todoModel');

module.exports = function (app){
    app.get ("/api/setupTodos", function(req, res){

        var seedTodos = [
            {
                text: "Hoc Node",
                isDone: false
            },
            {
                text: "Hoc Angular",
                isDone: false
            },
            {
                text: "Viet ung dung Todo",
                isDone: false
            }
        ];
    Todos.create (seedTodos, function (err, results){
        res.send (results);
    });

    });
}