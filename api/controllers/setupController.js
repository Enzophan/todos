var Todos = require('../models/todoModel');
var Categorys = require('../models/categoryModel');

module.exports = function (app) {
    app.get("/api/setupTodos", function (req, res) {

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
        Todos.create(seedTodos, function (err, results) {
            res.send(results);
        });

    });

    app.get("/api/setupCategorys", function (req, res) {

        var seedCategorys = [
            {
                name: "App",
                isDone: false
            },
            {
                name: "CC",
                isDone: false
            },
            {
                name: "Back End",
                isDone: false
            }
        ];
        Categorys.create(seedCategorys, function (err, results) {
            res.send(results);
        });

    });
}