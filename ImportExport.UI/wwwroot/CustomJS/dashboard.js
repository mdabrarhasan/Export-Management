var app = angular.module("App", ['angularUtils.directives.dirPagination']);
app.controller("Ctl", function ($scope, $window, $http) {
    /*$scope.Dashboard = function () {*/
        //$http({
        //    method: "GET",
        //    url: "Dashboard/GetDashboardvalue",
        //    headers: { "Content-Type": "application/json; charset=utf-8" }
        //}).then(function (response) {
        //    alert(response.data.Sqp);
        //}, function (error) {
        //    alert("Error: " + error.statusText);
        //});
   /* };*/


    /*  $scope.Dashboard();*/
    GetDashboardData();
});
