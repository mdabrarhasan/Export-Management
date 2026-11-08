
    $scope.Print = function (id) {
        alert(id);
        var base_url = window.location.origin;
        var myWindow = window.open(base_url + "/Quotation/PIPrint?id=" + id, 'myWindow', "width=900, height=800");

        $scope.HeaderPrint(id);
        $scope.LinePrint(id);
    }

