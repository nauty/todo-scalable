angular.module('myService', [])


	.factory('Todos', ['$http',function($http) {
		return {
			// getTasks : function() {
			// 	return $http.get('/api/todos');
			// },
			getTasks : function(id) {
				return $http.get('/api/todos/' + id);
			},
			create : function(todoData) {
				return $http.post('/api/todos', todoData);
			},
			delete : function(id,listId) {
				return $http.delete('/api/todos/' + id + "/"+listId);
			},
			newList : function(listData) {
				return $http.post('/api/list', listData);
			},
			getLists : function() {
				return $http.get('/api/lists');
			}
		}
	}]);