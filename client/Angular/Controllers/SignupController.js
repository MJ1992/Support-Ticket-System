app.controller('SignUpController', ['$http', 'AuthSVC', '$routeParams', '$window', '$location', function($http, AuthSVC, $routeParams, $window, $location) {
    var main = this;
    this.message = '';
    this.data = { username: '', password: '', email: '', mobile: '', isAdmin: false };
    this.SignUp = function(data) {

        AuthSVC.SignUp(data).then(function successCallback(response) {
            console.log(response.data);
            if (!response.data.error) {

                console.log(response.data.data.token);
                $window.localStorage.currentUser = angular.toJson({ username: main.data.username, token: response.data.data.token, isAdmin: response.data.data.isAdmin });
                console.log($window.localStorage);
                $location.path('/');
            }
            main.message = response.data.message;
            M.toast({ html: main.message });

        }, function errorCallBack(response) {
            console.log("Error");
        });
    };
}]);