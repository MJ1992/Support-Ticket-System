//var app = angular.module('SupDesk', ['ngRoute']);
app.config(function($routeProvider) {
    $routeProvider.when('/tickets', {
        templateUrl: 'Views/tickets.html',
        controller: "TicketsController",
        controllerAs: "ticketsCtrl"
    }).when('/tickets/user/myTickets', {
        templateUrl: 'Views/UserTickets.html',
        controller: "UserTicketsController",
        controllerAs: "userTicketsCtrl"
    }).when('/tickets/:id', {
        templateUrl: 'Views/Singleticket.html',
        controller: "SingleTicketController",
        controllerAs: "sTicketCtrl"
    }).when('/login', {
        templateUrl: 'Views/Login.html',
        controller: "LoginController",
        controllerAs: "LoginCtrl"
    }).when('/signup', {
        templateUrl: 'Views/Signup.html',
        controller: "SignUpController",
        controllerAs: "SignUpCtrl"
    }).when('/forgot', {
        templateUrl: 'Views/Forgot.html',
        controller: "ForgotController",
        controllerAs: "ForgotCtrl"
    }).when('/reset/:token', {
        templateUrl: 'Views/Reset.html',
        controller: "ResetController",
        controllerAs: "ResetCtrl"
    }).
    when('/new', {
        templateUrl: 'Views/create.html',
        controller: "CreateTicketController",
        controllerAs: "CreateCtrl"
    }).
    when('/:id/edit', {
        templateUrl: 'Views/edit.html',
        controller: "EditTicketController",
        controllerAs: "EditCtrl"
    }).
    when('/', {
        templateUrl: 'Views/Home.html',

    }).
    otherwise({
        redirectTo: '/'
    });
});