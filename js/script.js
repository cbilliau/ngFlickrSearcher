angular.module('mainApp', [ 'ngMessages' ])
			 .controller('RootCtrl', function($scope) {

				 $scope.searchWord = "";

				 $scope.submitForm = function() {
					 if ($scope.searchForm.$valid) {
						 $scope.searchWord = $scope.searchText;
						 $scope.searchText = null;
					 } else {};

				 };
			 });
