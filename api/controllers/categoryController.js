var Categorys = require('../models/categoryModel');

function getCategorys(res) {
    Categorys.find(function (err, categorys) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(categorys);
        }
    });
}

module.exports = function (app) {
    app.get('/api/categorys', function (req, res) {
        getCategorys(res);
    });

    app.get('/api/category/:id', function (req, res) {
        Categorys.findById({ _id: req.params.id }, function (err, category) {
            if (err) {
                throw err;
            } else {
                res.json(category);
            }
        });
    });

    // Add Todo by Category
    app.post('/api/category/todo', function (req, res) {
        var todo = {
            text: req.body.text,
            isDone: req.body.isDone
        };
        Categorys.update(
            {
                _id: req.body._id
            },
            { $push: { "todos": todo } },
            function (err, todo) {
                if (err) {
                    throw err;
                } else {
                    getCategorys(res);
                }
            });
    });

    // Edit Todo by Category
    app.put('/api/category/todo', function (req, res) {

        Categorys.updateOne(
            {
                _id: req.body._id,
                todos: { $elemMatch: { _id: req.body.todoId } }
                // todos: { $elemMatch: { _id: req.body.todoId }}
            },
            {
                $set: {
                    "todos.$.text": req.body.text,
                    "todos.$.isDone": req.body.isDone,
                }
            },
            { 'new': true, 'safe': true, 'upsert': true },

            function (err, todo) {
                if (err) {
                    throw err;
                } else {
                    getCategorys(res);
                }
            });
    });

    // Delete Todo by Category
    app.put('/api/category/todo/remove', function (req, res) {
        Categorys.update({
            _id: req.body._id
        },
            { $pull: { "todos": { _id: req.body.todoId } } },
            function (err, category) {
                if (err) {
                    return res.status(500).json(err);
                } else {
                    getCategorys(res);
                }
            }
        );
    });

    // Add Category
    app.post('/api/category', function (req, res) {
        var today = new Date();
        var category = {
            name: req.body.name,
            date: today,
            isDone: req.body.isDone
        };
        Categorys.create(category, function (err, category) {
            if (err) {
                throw err;
            } else {
                getCategorys(res);
            }
        });
    });

    // Update Category
    app.put('/api/category', function (req, res) {
        var today = new Date();
        if (!req.body._id) {
            return res.status(500).send('ID is required');
        } else {
            Categorys.update({
                _id: req.body._id
            }, {
                    name: req.body.name,
                    date: today,
                    isDone: req.body.isDone
                }, function (err, category) {
                    if (err) {
                        return res.status(500).json(err);
                    } else {
                        getCategorys(res);
                    }
                }
            )
        }
    });

    // Delete Category
    app.delete('/api/category/:id', function (req, res) {
        Categorys.remove({
            _id: req.params.id
        }, function (err, category) {
            if (err) {
                return res.status(500).json(err);
            } else {
                getCategorys(res);
            }
        })
    });
}