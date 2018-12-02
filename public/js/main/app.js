var app = angular.module("app.todos", ["xeditable"]);

app.controller("todoController", ['$scope', 'svTodos', function ($scope, svTodos) {

    $scope.appName = "Todo Dashboard";
    $scope.formData = {};
    $scope.loading = true;

    $scope.todos = [

    ];

    //Load data from API https://stackoverflow.com/questions/32207727/how-do-i-load-data-from-a-external-json-api-using-angularjs
    svTodos.get().then(function (data) {
        $scope.todos = data.data;
        $scope.loading = false;
    });

    $scope.createTodo = function () {
        // console.log ($scope.formData);
        $scope.loading = true;
        var todo = {
            text: $scope.formData.text,
            isDone: false
        }

        // $scope.todos.push(todo);
        // $scope.formData.text = "";
        svTodos.create(todo)
            .then(function (data) {
                $scope.todos = data.data;
                $scope.formData.text = "";
                //Reload page after post
                location.reload();
                $scope.loading = false;
            });
    }

    $scope.updateTodo = function (todo) {
        console.log("Update Todo: ", todo);
        $scope.loading = true;

        svTodos.update(todo)
            .then(function (data) {
                $scope.todos = data.data;
                location.reload();
                $scope.loading = false;
            });
    }

    $scope.deleteTodo = function (todo) {
        console.log("Delete Todo: ", todo);
        $scope.loading = true;

        svTodos.delete(todo._id)
            .then(function (data) {
                $scope.todos = data.data;
                $scope.loading = false;
            })
    }

    svTodos.getCategorys().then(function (data) {
        $scope.categorys = data.data;
        $scope.loading = false;
        // console.log("$scope.categorys" + JSON.stringify($scope.categorys));
    });

    $scope.createCategory = function () {
        $scope.loading = true;
        var category = {
            name: $scope.formData.name,
            isDone: false
        };
        svTodos.createCategory(category)
            .then(function (data) {
                $scope.categorys = data.data;
                $scope.formData.name = "";
                //Reload page after post
                location.reload();
                $scope.loading = false;
            });
    }

    $scope.updateCategory = function (category) {
        console.log("Update Category: ", category);
        $scope.loading = true;

        svTodos.updateCategory(category)
            .then(function (data) {
                $scope.categorys = data.data;
                location.reload();
                $scope.loading = false;
            });
    }

    $scope.deleteCategory = function (category) {
        console.log("Delete Todo: ", category);
        $scope.loading = true;

        svTodos.deleteCategory(category._id)
            .then(function (data) {
                $scope.categorys = data.data;
                $scope.loading = false;
            })
    }

    $scope.showText = function (category) {
        var x = document.getElementById("todoByCategory");
        if (x.style.display === "block") {
            x.style.display = "none";
        } else {
            x.style.display = "block";
        }
        console.log("category :" + category._id);
        $scope.category = category;
    }

    $scope.createTodoByCategory = function (category) {
        var categoryId = category._id;
        console.log("categoryId: " + categoryId);

        $scope.loading = true;
        var todo = {
            _id: categoryId,
            text: $scope.formTodo.text,
            isDone: false
        };
        svTodos.createTodo(todo)
            .then(function (data) {
                $scope.categorys = data.data;
                $scope.formTodo.text = "";
                //Reload page after post
                location.reload();
                $scope.loading = false;
            });
    }

    $scope.updateTodoByCategory = function (category, todo) {

        // console.log("Update Todo of Category: ", category);
        // console.log("Update Todo : ", todo);

        var categoryId = category._id;
        var todoId = todo._id;
        var text = todo.text;
        var isDone = todo.isDone;

        $scope.loading = true;
        var todo = {
            _id: categoryId,
            todoId: todoId,
            text: text,
            isDone: isDone
        };

        svTodos.updateTodo(todo)
            .then(function (data) {
                $scope.categorys = data.data;
                location.reload();
                $scope.loading = false;
            });
    }

    $scope.deleteTodoByCategory = function (category, todo) {
                console.log("Update Todo of Category: ", category);
                console.log("Update Todo : ", todo);
                var categoryId = category._id;
                var todoId = todo._id;

                $scope.loading = true;
                var todo = {
                    _id: categoryId,
                    todoId: todoId
                };
        
                svTodos.deleteTodo(todo)
                    .then(function (data) {
                        $scope.categorys = data.data;
                        location.reload();
                        $scope.loading = false;
                    });
            }

}]);