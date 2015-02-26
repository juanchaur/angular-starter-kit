'use strict';

/**
 * @ngdoc function
 * @name myTestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myTestApp
 */

var app = angular.module('myApp');

app.controller('MainCtrl', ['$scope', 'booksService', function ($scope, booksService) {

	$scope.awesomeThings = [
		{
			title: 'HTML5 Boilerplate',
			description: 'HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.'
		},
		{
			title: 'Bootstrap 3',
			description: 'Bootstrap is the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.'
		},
		{
			title: 'AngularJS',
			description: 'AngularJS is a toolset for building the framework most suited to your application development.'
		},
		{
			title: 'Karma',
			description: 'Spectacular Test Runner for JavaScript.'
		}
	];

	$scope.loadingBooks = true;


	$scope.callToService = function () {
		console.log('calling to service');

		$scope.loadingBooks = true;

		booksService.getAll().then(function (response) {
			$scope.books = response.data;
			$scope.loadingBooks = false;
		});
	};

}]);
