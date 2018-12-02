var app = angular.module("app.todos")

app.factory("svTodos", ["$http", function ($http) {

    return {
        get: function () {
            return $http.get("/api/todos");
        },
        create: function (todoData) {
            return $http.post("/api/todo", todoData);
        },
        update: function (todoData) {
            return $http.put("/api/todo", todoData);
        },
        delete: function (id) {
            return $http.delete("/api/todo/" + id);
        },
        getCategorys: function () {
            return $http.get("/api/categorys");
        },
        getTodoByCategory: function (categoryId) {
            return $http.get("/api/todo/category/" + categoryId);
        },
        createCategory: function (categoryData) {
            return $http.post("/api/category", categoryData);
        },
        updateCategory: function (categoryData) {
            return $http.put("/api/category", categoryData);
        },
        deleteCategory: function (id) {
            return $http.delete("/api/category/" + id);
        },
        createTodo: function (todoByCategoryData) {
            return $http.post("/api/category/todo", todoByCategoryData);
        },
        updateTodo: function (todoByCategoryData) {
            return $http.put("/api/category/todo", todoByCategoryData);
        },
        deleteTodo: function (todoByCategoryData) {
            return $http.put("/api/category/todo/remove", todoByCategoryData);
        }
    }
}]);