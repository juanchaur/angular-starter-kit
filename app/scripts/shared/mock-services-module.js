'use strict';

var serviceMock = angular.module('bwServicesMock',[
	'ngMockE2E'
]);

serviceMock.run(['$httpBackend', function ($httpBackend) {
	var books = [
		{
			id: 1,
			name: 'Clean Code'
		},
		{
			id: 2,
			name: 'Mocking the backend with Angular'
		}
	];

	$httpBackend.when('GET', /\.html$/).passThrough();

	$httpBackend.whenGET('/api/v1/books').respond(books);
}]);