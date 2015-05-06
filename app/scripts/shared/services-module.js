
'use strict';

var services = angular.module('myApp');

services.service('laterService', ['$window', function ($window) {

	if (angular.isUndefined($window.later)) {
		console.error('later.js is not available. Did you forget to include it?');
	}
	else {
		return $window.later;
	}

	// this.call = function() {
	// 	console.log('hola', window.later);
	// };

}]);