angular.module('myController', [])

	.controller('mainController', ['$scope','$http','Todos', function($scope, $http, Todos) {
		$scope.formData = {};
		$scope.loading = true;
		$scope.addItem = 0;
		$scope.addList = 0;
		$scope.addTask = 0;
		$scope.showLists = 1;
		$scope.currentList ={};
		$scope.currentList.name = null;
		// On landing , get all todo lists and show them
		
		Todos.getLists()
			.success(function(data) { 
				$scope.lists = data;
				$scope.loading = false;
			});
		// On submitting , send the text to the node API
		$scope.createTodo = function() {
			$scope.addTask = 0;
			if ($scope.formData.text != undefined) {
				$scope.loading = true;
				 $scope.formData.list_id = $scope.currentList._id;
				Todos.create($scope.formData)
					.success(function(data) { 
						$scope.loading = false;
						$scope.formData = {}; 
						$scope.todos = data; 
					});
			}
		};

		$scope.newList = function() {
			$scope.addItem = 1;
			$scope.addList = 0;
			$scope.todos = [];
			$scope.loading = true;
			var listData = {};
		     listData.name = $scope.currentList.name;
			Todos.newList(listData)
				.success(function(data) {
					$scope.loading = false;
					$scope.formData = {}; 
					$scope.currentList = data;
		   });

	 };

	 $scope.getTasks = function(list) { 
	 	$scope.loading = true;
	 	$scope.currentList = list;
	 	Todos.getTasks(list._id)
			.success(function(data) {  
				$scope.todos = data;
				$scope.loading = false;
				$scope.addItem = 1;
				$scope.showLists =0;
			});

	 };

		// delete a todo after checking it
		$scope.deleteTodo = function(id) {
			$scope.loading = true;

			Todos.delete($scope.currentList._id,id)
				.success(function(data) {
					$scope.loading = false;
					$scope.todos = data; 
				});
		};

	$scope.reload = function(){		
		$scope.loading = true;
		Todos.getLists()
			.success(function(data) { 
				$scope.lists = data;
				$scope.loading = false;
			    $scope.showLists=1;
		       $scope.addItem=0
			});
	};


	}]);