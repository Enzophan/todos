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

    app.post('/api/category', function (req, res) {
        var category = {
            name: req.body.name,
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

    app.put('/api/category', function (req, res) {
        if (!req.body._id) {
            return res.status(500).send('ID is required');
        } else {
            Categorys.update({
                _id: req.body._id
            }, {
                    name: req.body.name,
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