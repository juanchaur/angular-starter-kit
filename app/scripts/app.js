'use strict';

/**
 * @ngdoc overview
 * @name myApp
 * @description
 * # myApp
 *
 * Main module of the application.
 */
var myApp = angular.module('myApp', [
	'ngAnimate',
	'ngSanitize',
	'ui.router',
	'ui.bootstrap',
	'angular-momentjs',
	'bwServices'
]);

angular.module('bwServices', ['bwServicesMock']);

myApp.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
	$locationProvider.html5Mode(true);

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'scripts/components/main/main.tpl.html',
			controller: 'MainCtrl'
		})
		.state('about', {
			url: '/about',
			templateUrl: 'scripts/components/about/about.tpl.html',
			controller: 'AboutCtrl'
		});
});
