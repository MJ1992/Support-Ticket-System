app.controller('LoginController', ['$http', 'AuthSVC', '$routeParams', '$window', '$location', function($http, AuthSVC, $routeParams, $window, $location) {
    var main = this;
    this.message = '';
    this.data = { username: '', password: '' };
    this.Login = function(data) {


        AuthSVC.login(data).then(function successCallback(response) {
            console.log(response.data);
            if (!response.data.error) {
                console.log(response.data.data.token);

                $window.localStorage.currentUser = angular.toJson({ username: main.data.username, token: response.data.data.token, isAdmin: response.data.data.isAdmin });

                console.log($window.localStorage);
                console.log(angular.fromJson($window.localStorage.currentUser));
                $location.path('/');
            }

            main.message = response.data.message;
            M.toast({ html: main.message });
            //$window.location.href = 'index.html#!/login';


        }, function errorCallBack(response) {
            console.log("Error");
        });
    };
}]);