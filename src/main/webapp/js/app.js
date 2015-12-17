angular.module("myModule", [ "ui.bootstrap", "myModule.controllers" ]), angular.module("myModule.controllers", []).controller("driversController", function($scope) {
    $scope.driversList = [ {
        Driver: {
            givenName: "Sebastian",
            familyName: "Vettel"
        },
        points: 322,
        nationality: "German",
        Constructors: [ {
            name: "Red Bull"
        } ]
    }, {
        Driver: {
            givenName: "Fernando",
            familyName: "Alonso"
        },
        points: 207,
        nationality: "Spanish",
        Constructors: [ {
            name: "Ferrari"
        } ]
    } ];
});