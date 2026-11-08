
/*var app = angular.module("PIApp", ['angularUtils.directives.dirPagination']);*/
var app = angular.module("PIApp", ['angularUtils.directives.dirPagination']);

app.controller("PICTL", function ($scope, $window, $http) {
    $scope.loading = true; 
    $scope.curPage = 1;

    $scope.GetPIData = function () {
        $http({
            method: "get",
            url: "/PILanding/GetPILandingAll"
        }).then(function (response) {
            $scope.PIlist = response.data;
            $scope.loading = false;
        });
    };

    $scope.sortBy = function (column) {
        $scope.sortColumn = column;
        $scope.reverse = !$scope.reverse;
    }


    //$http.get("/PILanding/GetPILandingAll").then(function (response) {
    //    console.log(response.data);
    //    $scope.PIlist = response;
    //});

    //$http.get("/Home/LoadDept").then(function (response) {
    //    $scope.LoadDept = response.data;
    //});

    //$scope.GetDate = function () {
    //    $('#JoiningDate').datepicker({
    //        changeMonth: true,
    //        changeYear: true,
    //        format: "dd/mm/yyyy",
    //        language: "tr"
    //    }).on("change", function () {
    //        $('#JoiningDate').datepicker('hide');
    //    });
    //};

    //$scope.Add = function () {
    //    var Status;

    //    var isallvalid = true;
    //    if ($("#Name").val() === '') {
    //        isallvalid = false;
    //        $("#Name").siblings('span.error').css('visibility', 'visible');
    //    }
    //    else {
    //        $("#Name").siblings('span.error').css('visibility', 'hidden');
    //    }
    //    if ($("#DeptID").val() === '') {
    //        isallvalid = false;
    //        $("#DeptID").siblings('span.error').css('visibility', 'visible');
    //    }
    //    else {
    //        $("#DeptID").siblings('span.error').css('visibility', 'hidden');
    //    }
    //    if ($("#JoiningDate").val() === '') {
    //        isallvalid = false;
    //        $("#JoiningDate").siblings('span.error').css('visibility', 'visible');
    //    }
    //    else {
    //        $("#JoiningDate").siblings('span.error').css('visibility', 'hidden');
    //    }
    //    if (isallvalid) {
    //        $http({
    //            method: 'POST',
    //            url: '/Home/Save',
    //            datatype: "json",
    //            //data: JSON.stringify($scope.emp),
    //            data: JSON.stringify($scope.emp)
    //        }).success(function (data) {
    //            if (parseInt(data) === 1) {
    //                alert("Data saved successfully");
    //            }
    //            else {
    //                alert("Unable to save data.");
    //            }
    //        });
    //    }
    //};

    //$scope.GetEmployeeByID = function (ID) {
    //    $scope.ID = ID;
    //    $http({
    //        method: "POST",
    //        url: '/Home/GetEmpByID',
    //        params: { ID: $scope.ID }
    //    }).success(function (data) {
    //        for (var i = 0; i <= data.length; i++) {
    //            $("#ID").val(data[i].ID);
    //            $("#Name").val(data[i].Name);
    //            $("#DeptID").val(data[i].DeptID);
    //            $("#JoiningDate").val(data[i].JoiningDate);
    //            if (data[i].Status === 1) {
    //                $("#Active").prop("checked", true);
    //            } else {
    //                $("#Inactive").prop("checked", true);
    //            }
    //        }
    //    });
    //};

    //$scope.Update = function () {
    //    $scope.Employee = {};

    //    $scope.Employee.ID = $("#ID").val();
    //    $scope.Employee.Name = $("#Name").val();
    //    $scope.Employee.DeptID = $("#DeptID").val();
    //    $scope.Employee.JoiningDate = $("#JoiningDate").val();
    //    $scope.Employee.Status = $("#Status").val();

    //    //$http.post("/Home/Edit", { data: Employee});
    //    $http({
    //        method: "POST",
    //        url: "/Home/Edit",
    //        datatype: "json",
    //        data: JSON.stringify($scope.Employee)
    //    }).success(function (response) {
    //        if (parseInt(response) === 1) {
    //            alert("Data updated successfully.");
    //        }
    //        else {
    //            alert("Unable to update data.");
    //        }
    //    });
    //};

    //$scope.Delete = function (ID) {
    //    $scope.ID = ID;
    //    $http({
    //        method: "POST",
    //        url: '/Home/Delete',
    //        params: { ID: $scope.ID }
    //    }).success(function (data) {
    //        if (parseInt(data) === 1) {
    //            alert("Data delete successfully.");
    //        }
    //        else {
    //            alert("Unable to delete data.");
    //        }
    //    });
    //};

    //$scope.AddNew = function () {
    //    $scope.emp.ID = "";
    //    $scope.emp.Name = "";
    //    $scope.emp.DeptID = 0;
    //    $scope.emp.JoiningDate = "";
    //    $scope.emp.Status = 0;
    //};
});