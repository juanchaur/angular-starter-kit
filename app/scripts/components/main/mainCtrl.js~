'use strict';

/**
 * @ngdoc function
 * @name myTestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myTestApp
 */
var app = angular.module('myApp');

app.controller('MainCtrl', ['$scope', 'booksService', 'laterService', '$modal', function ($scope, booksService, laterService, $modal) {
	$scope.animationsEnabled = true;

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

	var startLater = function () {
		var later = laterService;
		laterService.date.localTime();
		later.date.localTime();
		//Europe/Andorra 10:29 am CEST
		// a basic schedule that is valid every day at 10:15am and 10:45am
		var weekDays = {
			sun: 1,
			mon: 2,
			tues: 3,
			wed:4,
			thu: 5,
			fri: 6,
			sat: 7
		}
		var sched = laterService.parse.recur()
			.after('15:00').time()
			.before('15:16').time()
			.on(weekDays.wed).dayOfWeek()
			.every(1).minute()
		;

		var t = later.setInterval(test, sched);
		var count = 10;

		  function test() {
		    console.log('pepe', count);
		    console.log(new Date());
		    count--;
		    if(count <= 0) {
			//t.clear(); //to stop de count
		    	count = 10;
		    }
		  }

	};


	startLater();
}]);


/*
  // this schedule will fire on the closest weekday to the 15th
  // every month at 2:00 am except in March
  var complexSched = later.parse.recur()
                  .on(15).dayOfMonth().onWeekday().on(2).hour()
                .and()
                  .on(14).dayOfMonth().on(6).dayOfWeek().on(2).hour()
                .and()
                  .on(16).dayOfMonth().on(2).dayOfWeek().on(2).hour()
                .except()
                  .on(3).month();
var sched = laterService.parse.recur()
			//.on(weekDays.wed).dayOfWeek()
		//	.every(1).min()
		//	.between(0, 59)
			.after('15:00').time()
			.before('15:09').time()
			.on(weekDays.wed).dayOfWeek()

			//.dayOfWeek(4)
			//.on('14:07:20').time()

		;

 */
