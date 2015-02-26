'use strict';

var bwServices = angular.module('bwServices');

bwServices.factory('booksService',['$http',function ($http) {
	return {
		getAll: function () {
			return $http.get('/api/v1/books');
		}
	};
}]);


