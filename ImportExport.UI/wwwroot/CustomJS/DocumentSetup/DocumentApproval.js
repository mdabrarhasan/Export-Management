
/*var app = angular.module("PIApp", ['angularUtils.directives.dirPagination']);*/
var app = angular.module("App", ['angularUtils.directives.dirPagination']);

app.controller("Ctl", function ($scope, $window, $http) {

    //$scope.loading = true;

    $scope.GetAllData = function () {
        $scope.loading = true;
        
        if ($("#rootdoclistid").val() == "") {

        }
        else {
            $http({
                method: "get",
                url: "/DocumentApproval/GetPending",
                params: { statusid: $("#statusid").val(), rootdoclistid: $("#rootdoclistid").val() }
            }).then(function (response) {
                console.log(response.data);
                $scope.getalldata = response.data;
                $scope.loading = false;
            });
        }
    };


    $scope.StatusList = function () {
        $http({
            method: "get",
            url: "/AgreementApproval/GetStatusData"
        }).then(function (response) {
            //console.log(response);
            $scope.statuslist = response.data;
        });
    };


    $scope.GetRootDocumentList = function () {
        $http({
            method: "get",
            url: "/Common/GetRootDocumentList"
        }).then(function (response) {
            $scope.rootdoclist = response.data;
        });
    };



    $scope.ViewByMasterID = function (apphistoryid, ID, DOCNUMBER, pickpacknumber, pickingpackingheaderid) {
   
        $scope.ID = apphistoryid;
        $http({
            method: "GET",
            url: '/DocumentApproval/EditByMasterID',
            params: { id: $scope.ID }
        }).success(function (data) {
            $scope.masterdata = data;
        });

        //$scope.ViewbyDetailsID(ID);
        //ViewImageFromAPI(DOCNUMBER);
        ViewImageFromAPIForDocument(ID, DOCNUMBER, pickpacknumber, pickingpackingheaderid,'A');
        //$scope.ViewLoadDocumentStatus(ID);
    }

    $scope.ViewbyDetailsID = function (ID) {
        $.ajax({
            url: "/DocumentApproval/EditbyDetailsID",
            type: 'GET',
            data: { id: ID },
            success: function (result) {
                $scope.detailsdata = result;
            }
        });
    }

    $scope.ViewLoadDocumentStatus = function (ID) {
        $scope.ID = ID;
        $http({
            method: "GET",
            url: '/DocumentLanding/GetDocStatus',
            params: { id: $scope.ID, }
        }).success(function (result) {

            $scope.docstatusview = result;
        });
    }


    $scope.Rejected = function (id, index) {
        if (confirm('Are You Sure? You Want to Reject this Record.') == true) {

            $http({
                method: "POST",
                url: "/DocumentApproval/Rejected",
                params: { id: id, remarks: $('#description' + index).val() }
            }).then(function (response) {
                notify('success', 'Success Message', response.data.trim());
                $scope.GetAllData();
            });
        }
        else {

        }
    };

    $scope.Approved = function (id, index) {
        if (confirm('Are You Sure? You Want to Approve this Record.') == true) {
            $http({
                method: "POST",
                url: "/DocumentApproval/Approve",
                params: { id: id, remarks: $('#description' + index).val() }
            }).then(function (response) {
                notify('success', 'Success Message', response.data.trim());
                $scope.GetAllData();
            });
        }
        else {

        }
    };

});