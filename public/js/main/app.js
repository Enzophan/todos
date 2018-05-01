var app = angular.module ("app.todos", ["xeditable"]);

app.controller("todoController", ['$scope','svTodos', function($scope, svTodos){

    $scope.appName = "Todo Dashboard";
    $scope.formData = {};
    $scope.loading = true;

    $scope.todos = [
       
    ];

    //Load data from API https://stackoverflow.com/questions/32207727/how-do-i-load-data-from-a-external-json-api-using-angularjs
    svTodos.get().then(function (data){
        $scope.todos = data.data;
        $scope.loading = false;
    });

    $scope.createTodo = function(){
        // console.log ($scope.formData);
        $scope.loading = true;
        var todo = {
            text: $scope.formData.text,
            isDone: false
        }

        // $scope.todos.push(todo);
        // $scope.formData.text = "";
        svTodos.create(todo)
        .then(function(data){
            $scope.todos = data.data;
            $scope.formData.text = "";
            //Reload page after post
            location.reload(); 
            $scope.loading = false;
        });
    }

    $scope.updateTodo = function (todo){
        console.log("Update Todo: ", todo);
        $scope.loading = true;
        
        svTodos.update(todo)
        .then(function(data){
            $scope.todos = data.data;
            location.reload(); 
            $scope.loading = false;
        });
    }

    $scope.deleteTodo = function (todo){
        console.log("Delete Todo: ", todo);
        $scope.loading = true;

        svTodos.delete(todo._id)
        .then(function(data){
            $scope.todos = data.data;
            $scope.loading = false;
        })
    }

}]);