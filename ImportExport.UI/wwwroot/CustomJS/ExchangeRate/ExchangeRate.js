var app = angular.module("App", ['angularUtils.directives.dirPagination']);

app.filter('trimRate', function () {
    return function (value) {
        if (value === null || value === undefined || value === '') {
            return '';
        }
        var num = parseFloat(value);
        if (isNaN(num)) {
            return value;
        }
        // Cap at 4 decimals, then strip trailing zeros and any dangling dot
        return parseFloat(num.toFixed(4)).toString();
    };
});

app.controller("Ctl", function ($scope, $http) {

    $scope.SellerUnits = [];
    $scope.SelectedUnit = '';

    $scope.LoadData = function () {
        // Load seller unit dropdown once
        if ($scope.SellerUnits.length === 0) {
            $http({ method: "get", url: "/ExchangeRate/GetSellerUnits" })
                .then(function (response) {
                    $scope.SellerUnits = response.data;
                }, function () {
                    notify('error', 'Error Message', 'Failed to load seller units.');
                });
        }

        // Load grid
        $http({ method: "get", url: "/ExchangeRate/GetAll" })
            .then(function (response) {
                $scope.ExchangeRateList = response.data;
            }, function () {
                notify('error', 'Error Message', 'Failed to load exchange rates. Please try again.');
            });
    };

    $scope.inputRate = null;
    $scope.inputDate = null;

    $scope.Clear = function () {
        $scope.SelectedUnit = '';
        $scope.inputRate = null;
        $scope.inputDate = null;
        $('#txtRate').siblings('span.error').css('visibility', 'hidden');
    };

    

    $scope.Edit = function (list) {
        var $ddl = $('#ddlEditUnit');
        $ddl.empty();
        angular.forEach($scope.SellerUnits, function (u) {
            $ddl.append($('<option>', { value: u.value, text: u.text }));
        });
        $ddl.val(list.unitid);

        $('#txtEditID').val(list.id);
        $('#txtEditRate').val(list.exchangerate);

        if (list.ratedate) {
            var d = new Date(list.ratedate);
            var ymd = d.getFullYear() + '-' +
                ('0' + (d.getMonth() + 1)).slice(-2) + '-' +
                ('0' + d.getDate()).slice(-2);
            $('#txtEditDate').val(ymd);
        } else {
            $('#txtEditDate').val('');
        }

        $('#txtEditRate').siblings('span.error').css('visibility', 'hidden');
        setTimeout(function () { $('#txtEditRate').focus(); }, 200);
    };

    $scope.Save = function () {
        var isAllValid = true;

        if (!$scope.SelectedUnit) {
            isAllValid = false;
            notify('error', 'Error Message', 'Please select a seller unit.');
        }

        if ($scope.inputRate === null || $scope.inputRate === undefined ||
            $scope.inputRate === '' || isNaN($scope.inputRate)) {
            isAllValid = false;
            $('#txtRate').siblings('span.error').css('visibility', 'visible');
        } else {
            $('#txtRate').siblings('span.error').css('visibility', 'hidden');
        }

        if (!$scope.inputDate) {
            isAllValid = false;
            notify('error', 'Error Message', 'Please select a date.');
        }

        if (isAllValid && confirm('Are You Sure? You Want to Save this Record.') === true) {
            var exchange = {
                ID: 0,
                UNITID: parseInt($scope.SelectedUnit),
                EXCHANGERATE: parseFloat($scope.inputRate),
                RATEDATE: $scope.inputDate
            };

            $.ajax({
                type: 'POST',
                url: '/ExchangeRate/Save',
                dataType: 'json',
                data: { exchange: exchange },
                success: function (result) {
                    var message = (result || '').toString();
                    if (message.toLowerCase().indexOf('error:') === 0) {
                        notify('error', 'Error Message', message);
                    } else {
                        notify('success', 'Success Message', message);
                        $scope.$apply(function () { $scope.Clear(); });
                        $scope.LoadData();
                    }
                },
                error: function (errormessage) {
                    notify('error', 'Error Message', errormessage.responseText);
                }
            });
        }
    };

    $scope.Update = function () {
        if (confirm('Are You Sure? You Want to Update this Record.') !== true) {
            return;
        }

        var isAllValid = true;
        var rate = ($('#txtEditRate').val() || '').trim();
        var date = ($('#txtEditDate').val() || '').trim();

        if (rate === '' || isNaN(rate)) {
            isAllValid = false;
            $('#txtEditRate').siblings('span.error').css('visibility', 'visible');
        } else {
            $('#txtEditRate').siblings('span.error').css('visibility', 'hidden');
        }

        if (date === '') {
            isAllValid = false;
            notify('error', 'Error Message', 'Please select a date.');
        }

        if (!isAllValid) {
            return;
        }

        var exchange = {
            ID: parseInt($('#txtEditID').val() || '0'),
            UNITID: parseInt($('#ddlEditUnit').val()),
            EXCHANGERATE: parseFloat(rate),
            RATEDATE: date
        };

        $.ajax({
            type: 'POST',
            url: '/ExchangeRate/Save',
            dataType: 'json',
            data: { exchange: exchange },
            success: function (result) {
                var message = (result || '').toString();
                if (message.toLowerCase().indexOf('error:') === 0) {
                    notify('error', 'Error Message', message);
                } else {
                    notify('success', 'Success Message', message);
                    $('#editExchangeRateModal').modal('hide');
                    $scope.LoadData();
                }
                $('#updatebutton').prop('disabled', false);
            },
            error: function (errormessage) {
                notify('error', 'Error Message', errormessage.responseText);
                $('#updatebutton').prop('disabled', false);
            }
        });
    };

    $scope.DeleteRate = function (id) {
        if (confirm('Are You Sure? You Want to Delete this Record.') !== true) {
            return;
        }

        $http({
            method: 'POST',
            url: '/ExchangeRate/Delete',
            params: { id: id }
        }).then(function (response) {
            var message = (response.data || '').toString();
            if (message.toLowerCase().indexOf('error:') === 0) {
                notify('error', 'Error Message', message);
            } else {
                notify('success', 'Success Message', message);
            }
            $scope.LoadData();
        }, function () {
            notify('error', 'Error Message', 'Delete failed. Please try again.');
        });
    };

});