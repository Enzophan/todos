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
        var today = new Date();
        var seedCategorys = [
            {
                name: "App",
                date: today,
                todos: [
                    {
                        text: "Hoc Node 1",
                        isDone: false
                    },
                    {
                        text: "Hoc Node 2",
                        isDone: false
                    }
                ],
                isDone: false
            },
            {
                name: "CC",
                date: today,
                todos: [
                    {
                        text: "Hoc Node",
                        isDone: false
                    }
                ],
                isDone: false
            },
            {
                name: "Back End",
                date: today,
                todos: [{
                    text: "Hoc Node",
                    isDone: false
                }],
                isDone: false
            }
        ];
        Categorys.create(seedCategorys, function (err, results) {
            res.send(results);
        });

    });
}