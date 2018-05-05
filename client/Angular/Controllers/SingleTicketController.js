app.controller('SingleTicketController', ['$scope', '$http', 'DataSVC', 'SocketSVC', '$routeParams', '$window', '$location', function($scope, $http, DataSVC, SocketSVC, $routeParams, $window, $location) {
    var main = $scope;
    $scope.isAdmin = angular.fromJson($window.localStorage.currentUser).isAdmin;
    console.log($scope.isAdmin);
    $scope.ticketID = $routeParams.id;
    $scope.ticket = '';
    $scope.msgs = [];
    $scope.message = '';


    $scope.getTicket = function() {

            DataSVC.getSingleTicket($scope.ticketID).then(function successCallback(response) {
                console.log(response.data);
                if (!response.data.error) {
                    $scope.ticket = response.data.data;
                    console.log($scope.ticket);
                } else {
                    $location.path('/login');
                    M.toast({ html: response.data.message });
                }


            }, function errorCallBack(response) {
                console.log("Error");
            });

        },
        $scope.deleteTicket = function() {

            DataSVC.DeleteTicket(main.ticketID).then(function(response) {
                console.log(response.data);


            }).catch(function(error) {
                console.log(error);
            });

        },
        $scope.joinRoom = function() {
            SocketSVC.emit('joinroom', $scope.ticketID);
            SocketSVC.on('chat-history', function(data) {
                $scope.$apply(function() {
                    $scope.msgs = data.chats;

                });

            });
        },


        $scope.send = function() {
            console.log(angular.fromJson($window.localStorage.currentUser).username);
            // SocketSVC.emit('joinroom', $scope.ticketID);
            SocketSVC.emit('message', { message: main.message, room: $scope.ticketID, from: angular.fromJson($window.localStorage.currentUser).username, createdAt: Date.now() });
            // $scope.recieve();
            $scope.message = '';

        },

        SocketSVC.on('msg sent', function(data) {
            console.log(main.msgs);
            console.log(main.message);
            if (data.room == $scope.ticketID) {
                $scope.$apply(function() {
                    main.msgs.push(data);

                });
            }


        }),
        $scope.acceptedAnwser = function(ans) {

            if (!$scope.ticket.status) {
                $scope.ticket.status = true;
                DataSVC.UpdateTicket($scope.ticketID, $scope.ticket).then(function(res) {
                    console.log(res.data);
                });
                M.toast({ html: 'Ticket Closed' });
            }

            ans.isAnswer = true;
            SocketSVC.emit('answered', ans);
            M.toast({ html: 'Answer Accepted' });
        },
        $scope.changeStatus = function() {
            if ($scope.ticket.status) {
                M.toast({ html: 'Ticket Reopened' });
                SocketSVC.emit('reopened', $scope.ticketID);
            } else {
                SocketSVC.emit('closedTicket', $scope.ticketID);
                M.toast({ html: 'Ticket Closed' });
            }
            $scope.ticket.status = !$scope.ticket.status;
            DataSVC.UpdateTicket($scope.ticketID, $scope.ticket).then(function(res) {
                console.log(res.data);
            });

        },

        SocketSVC.on('chat-history', function(data) {
            $scope.$apply(function() {
                $scope.msgs = data.chats;

            });

        });


    $scope.getTicket();
    $scope.joinRoom();

}]);