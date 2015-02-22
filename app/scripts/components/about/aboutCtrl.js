'use strict';

/**
 * @ngdoc function
 * @name myTestApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the myTestApp
 */

var app = angular.module('myApp');


app.controller('AboutCtrl', function ($scope) {
	$scope.awesomeThings = [
		'About Controller',
		'About Page',
		'Karma'
	];
});
