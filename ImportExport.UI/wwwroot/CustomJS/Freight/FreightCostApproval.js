var app = angular.module("App", ['angularUtils.directives.dirPagination']);

app.filter('upto4', function () {
    return function (value) {
        if (value === null || value === undefined || value === '') return '';
        var n = parseFloat(value);
        if (isNaN(n)) return value;
        return parseFloat(n.toFixed(4)).toString();
    };
});

app.controller("Ctl", function ($scope, $http) {

    $scope.statusid = null;
    $scope.sortColumn = "id";
    $scope.reverse = true;
    $scope.masterdata = [];
    $scope.detailsbyid = [];

    $scope.sortBy = function (col) {
        $scope.reverse = ($scope.sortColumn === col) ? !$scope.reverse : false;
        $scope.sortColumn = col;
    };

    $scope.StatusList = function () {
        $http.get("/FreightCostApproval/GetStatusData").then(function (response) {
            $scope.statuslist = response.data;
        });
    };

    $scope.PCList = function () {
        if (!$scope.statusid) {
            $scope.getalldata = [];
            return;
        }
        $scope.loading = true;
        $http.get("/FreightCostApproval/GetPending", { params: { statusid: $scope.statusid } })
            .then(function (response) {
                $scope.getalldata = response.data;
            })
            .finally(function () {
                $scope.loading = false;
            });
    };

    $scope.Approved = function (list) {
        if (!confirm('Are you sure you want to approve this record?')) return;

        list.busy = true;   // prevents a double click from approving twice
        $http({
            method: "POST",
            url: "/FreightCostApproval/Approve",
            params: { id: list.id, remarks: list.description || '' }
        }).then(function (response) {
            var msg = String(response.data || '').trim();
            if (/approved successfully/i.test(msg)) {
                notify('success', 'Success Message', msg);
                $scope.PCList();
            } else {
                notify('error', 'Error Message', msg || 'Approval failed.');
            }
        }, function (err) {
            notify('error', 'Error Message', err.data || 'Approval failed.');
        }).finally(function () {
            list.busy = false;
        });
    };

    $scope.ViewData = function (list) {
        $scope.masterdata = [];
        $scope.detailsbyid = [];

        $http.get("/FreightCostApproval/ViewMaster", { params: { id: list.fcid } })
            .then(function (response) { $scope.masterdata = response.data; });

        $http.get("/FreightCostApproval/ViewDetails", { params: { id: list.fcid } })
            .then(function (response) { $scope.detailsbyid = response.data; });
    };
});