app.controller('EditTicketController', ['$http', 'DataSVC', '$routeParams', function($http, DataSVC, $routeParams) {
    var main = this;
    this.ticketID = $routeParams.id;
    this.data = { userInfo: { name: '', email: '', mobile: '' }, title: '', details: '' };



    this.getTicketDetails = function(data) {
            DataSVC.getSingleTicket(main.ticketID).then(function successCallback(response) {
                console.log(response.data);
                main.data.title = response.data.data.title;
                main.data.details = response.data.data.details;
                main.data.userInfo.name = response.data.data.userInfo.name;
                main.data.userInfo.email = response.data.data.userInfo.email;
                main.data.userInfo.mobile = response.data.data.userInfo.mobile;

            }, function errorCallBack(response) {
                console.log("Error");
            });
        },

        this.UpdateTicket = function(ticketID, data) {
            console.log(data);
            DataSVC.UpdateTicket(ticketID, data).then(function(response) {
                console.log(response.data);

                M.toast({ html: response.data.message });
            }).catch(function(error) {
                console.log(error);
            });

        };

    this.getTicketDetails();
}]);