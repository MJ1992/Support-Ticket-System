app.service('DataSVC', ['$http', function($http) {
    var baseUrl = "http://localhost:4000/";

    this.getAllTickets = function() {
            return $http({
                method: "GET",
                url: baseUrl + "tickets",
                headers: { 'Content-Type': 'application/json' }


            });
        },
        this.getMyTickets = function() {
            return $http({
                method: "GET",
                url: baseUrl + "tickets/user/myTickets",
                headers: { 'Content-Type': 'application/json' }


            });
        },
        this.getSingleTicket = function(ticketID) {
            return $http({
                method: "GET",
                url: baseUrl + "tickets/" + ticketID,
                headers: { 'Content-Type': 'application/json' }


            });
        },
        this.CreateTicket = function(data) {
            return $http({
                method: "POST",
                url: baseUrl + "tickets",
                headers: { 'Content-Type': 'application/json' },
                data: data

            });
        },
        this.UpdateTicket = function(ticketID, data) {
            return $http({
                method: "PUT",
                url: baseUrl + "tickets/" + ticketID,
                headers: { 'Content-Type': 'application/json' },
                data: data

            });
        },
        this.DeleteTicket = function(ticketID) {
            return $http({
                method: "DELETE",
                url: baseUrl + "tickets/" + ticketID,
                headers: { 'Content-Type': 'application/json' },


            });
        };

}]);