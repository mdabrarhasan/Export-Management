
/*var app = angular.module("PIApp", ['angularUtils.directives.dirPagination']);*/
var app = angular.module("App",[]);

app.controller("Ctl", function ($scope, $window, $http) {


    $scope.Login = function () {
        var post = $http({
            method: "POST",
            url: "/Login/Login",
            dataType: 'json',
            params: { username: $("#username").val(), password: $("#password-input").val() },
            headers: { "Content-Type": "application/json" }
        });

        post.success(function (data) {
            alert(data);
            window.location.href = "/AgreementLanding/Index";
        });

        post.error(function (data, status) {
            $window.alert(data.Message);
        });
    }

});