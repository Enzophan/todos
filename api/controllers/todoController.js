var Todos = require ('../models/todoModel');

function getTodos (res) {
    Todos.find (function (err, todos){
        if (err) {
            res.status(500).json(err);
        }else {
            res.json(todos);
        }
    });
}

module.exports = function (app) {
    app.get ('/api/todos', function(req,res){
        getTodos (res);
    });

    // app.get('/api/todo/category/:categoryId',function(req,res){
    //     Todos.find({categoryId: req.params.categoryId}, function(err, todo){
    //         if(err){
    //             throw err;
    //         }else{
    //             res.json(todo);
    //         }
    //     })
    // });

    app.get ('/api/todo/:id', function (req,res) {
        
        Todos.findById ({_id: req.params.id}, function(err, todo){
            if (err) {
                throw err;
            }else {
                res.json(todo);
            }
        });
    });

    app.post ('/api/todo', function(req, res){
        var todo = {
            categoryId: req.body.categoryId,
            text: req.body.text,
            isDone: req.body.isDone
        };
        Todos.create(todo, function(err, todo){
            if (err){
                throw err;
            }else {
                getTodos (res);
            }
        });
    });

    app.put('/api/todo', function (req, res){
        if (!req.body._id){
            return res.status(500).send('ID is required');
        }else {
            Todos.update({
                _id: req.body._id
            },{
                categoryId: req.body.categoryId,                
                text: req.body.text,
                isDone: req.body.isDone
            }, function (err, todo){
                if (err) {
                    return res.status(500).json(err);
                }else {
                    getTodos(res);
                }
            }
        )
        }
    });

    app.delete('/api/todo/:id', function (req, res){
        Todos.remove({
            _id: req.params.id
        }, function (err, todo){
            if (err) {
                return res.status(500).json(err);
            }else {
                getTodos(res);
            }
        })
    });
}