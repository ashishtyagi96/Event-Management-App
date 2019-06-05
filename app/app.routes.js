/**
 * Created by ashishtyagi9622 on 4/6/19.
 */
var app = angular.module('appRoutes', ['ngRoute'])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/pages/home.html'
            })
            .when('/addEvent', {
                templateUrl: 'views/pages/addEvent.html'
            })
            .when('/mapView', {
                templateurl: 'views/pages/mapView.html'
            })
            .when('/mapView', {
                templateurl: 'views/pages/calendarView.html'
            });
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        })
    });

