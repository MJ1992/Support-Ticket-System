app.controller('TicketsController', ['$http', 'DataSVC', '$routeParams', '$location', function($http, DataSVC, $routeParams, $location) {
    var main = this;
    this.tickets = [];


    this.getTickets = function() {

        DataSVC.getAllTickets().then(function successCallback(response) {
            M.AutoInit();
            console.log(response.data);
            if (!response.data.error) {
                main.tickets = response.data.data;
            } else {
                $location.path('/login');
                M.toast({ html: response.data.message });
            }


        }, function errorCallBack(response) {
            console.log("Error");
        });

    };
    this.getTickets();

}]);