var app = angular.module("App", []);

app.controller("Ctl", function ($scope, $window, $http) {

    $scope.GetShipmentMode = function () {
        $http({
            method: "get",
            url: "/AgreementLanding/GetShipmentMode"
        }).then(function (response) {
            $scope.shipmentmodelist = response.data;
        });
    };

    $scope.GetTransportationMode = function () {
        $http({
            method: "get",
            url: "/AgreementLanding/GetTransportationMode"
        }).then(function (response) {
            $scope.transportationmode = response.data;
        });
    };

    $scope.GetCurrency = function () {
        $http({
            method: "get",
            url: "/AgreementLanding/GetCurrency"
        }).then(function (response) {
            $scope.currencylist = response.data;
        });
    };

    $scope.GetIncoTerm = function () {
        $http({
            method: "get",
            url: "/AgreementLanding/GetIncoTerm"
        }).then(function (response) {
            $scope.incotermlist = response.data;
        });
    };

    $scope.GetShipmentCountry = function () {
        $http({
            method: "get",
            url: "/AgreementLanding/GetShipmentCountry"
        }).then(function (response) {
            $scope.shipmentcountrylist = response.data;
        });
    };

    $scope.GetDelTerm = function () {
        $http({
            method: "get",
            url: "/AgreementLanding/GetDelTerm"
        }).then(function (response) {
            $scope.deltermlist = response.data;
        });
    };

    $scope.GetPaymentTerm = function () {
        $http({
            method: "get",
            url: "/AgreementLanding/GetPaymentTerm"
        }).then(function (response) {
            $scope.paymenttermlist = response.data;
        });
    };

    $scope.GetLoadingport = function () {
        $http({
            method: "get",
            url: "/AgreementLanding/GetLoadingport"
        }).then(function (response) {
            $scope.loadingportlist = response.data;
        });
    };
});