app.controller('NavBarController', ['$scope', '$window', function($scope, $window) {
    //var main = $scope;
    $scope.currentUser = '';
    $scope.loggedIn = false;
    $scope.isAdmin = false;

    $scope.$watch(function() {
        if (angular.fromJson($window.localStorage.currentUser)) {
            if (angular.fromJson($window.localStorage.currentUser).token && angular.fromJson($window.localStorage.currentUser).isAdmin) {
                $scope.currentUser = angular.fromJson($window.localStorage.currentUser).username;
                $scope.loggedIn = true;
                $scope.isAdmin = true;
            } else if ((angular.fromJson($window.localStorage.currentUser).token && !(angular.fromJson($window.localStorage.currentUser).isAdmin))) {
                $scope.currentUser = angular.fromJson($window.localStorage.currentUser).username;
                $scope.loggedIn = true;
                $scope.isAdmin = false;
            } else {
                $scope.loggedIn = false;
                $scope.isAdmin = false;
            }

        }
    });


    $scope.logOut = function() {

        delete $window.localStorage.currentUser;

        $scope.loggedIn = false;
        $scope.isAdmin = false;

        M.toast({ html: 'Logged you out successfully!' });
    };

}]);