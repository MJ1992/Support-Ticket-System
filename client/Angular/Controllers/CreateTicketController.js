app.controller('CreateTicketController', ['$http', 'DataSVC', '$routeParams', function($http, DataSVC, $routeParams) {
    var main = this;


    this.data = { userInfo: { name: '', email: '', mobile: '' }, title: '', details: '' };

    this.createTicket = function(data) {

        DataSVC.CreateTicket(data).then(function successCallback(response) {

            console.log(response.data);
            M.toast({ html: response.data.message });
        }, function errorCallBack(response) {
            M.toast({ html: response.data.message });
            console.log("Error");
        });


    };

}]);