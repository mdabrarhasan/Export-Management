var app = angular.module("App", ['angularUtils.directives.dirPagination']);

app.controller("Ctl", function ($scope, $http) {

    $scope.LoadData = function () {
        $http({
            method: "get",
            url: "/CustomerInfo/GetCustomerBankAll"
        }).then(function (response) {
            $scope.CustomerBankList = response.data;
        }, function (error) {
            notify('error', 'Error Message', 'Failed to load customer bank data. Please try again.');
        });
    }

    $scope.Clear = function () {
        $('#txtID').val(0);
        $('#txtCustomerName').val('');
        $('#txtCustomerBankName').val('');
        $('#txtCustomerBankBranchName').val('');
        $('#txtAddressLineOne').val('');
        $('#txtAddressLineTwo').val('');
        $('#txtAddressLineThree').val('');
        $('#txtCustomerBankBinNo').val('');

        $('#txtCustomerName').siblings('span.error').css('visibility', 'hidden');
        $('#txtCustomerBankName').siblings('span.error').css('visibility', 'hidden');
        $('#txtCustomerBankBranchName').siblings('span.error').css('visibility', 'hidden');
    }

    $scope.Edit = function (list) {
        $('#txtID').val(list.id);
        $('#txtCustomerName').val(list.customername);
        $('#txtCustomerBankName').val(list.customerbankname);
        $('#txtCustomerBankBranchName').val(list.customerbankbranchname);
        $('#txtAddressLineOne').val(list.customerbankaddresslineone);
        $('#txtAddressLineTwo').val(list.customerbankaddresslinetwo);
        $('#txtAddressLineThree').val(list.customerbankaddresslinethree);
        $('#txtCustomerBankBinNo').val(list.customerbankbinno);
    }

    $scope.Save = function () {
        var isAllValid = true;

        if ($('#txtCustomerName').val().trim() === '') {
            isAllValid = false;
            $('#txtCustomerName').siblings('span.error').css('visibility', 'visible');
        } else {
            $('#txtCustomerName').siblings('span.error').css('visibility', 'hidden');
        }

        if ($('#txtCustomerBankName').val().trim() === '') {
            isAllValid = false;
            $('#txtCustomerBankName').siblings('span.error').css('visibility', 'visible');
        } else {
            $('#txtCustomerBankName').siblings('span.error').css('visibility', 'hidden');
        }

        if ($('#txtCustomerBankBranchName').val().trim() === '') {
            isAllValid = false;
            $('#txtCustomerBankBranchName').siblings('span.error').css('visibility', 'visible');
        } else {
            $('#txtCustomerBankBranchName').siblings('span.error').css('visibility', 'hidden');
        }

        if ($('#txtCustomerBankBinNo').val().trim() === '') {
            isAllValid = false;
        $('#txtCustomerBankBinNo').siblings('span.error').css('visibility', 'visible');
        } else {
        $('#txtCustomerBankBinNo').siblings('span.error').css('visibility', 'hidden');
        }

        if (isAllValid && confirm('Are You Sure? You Want to Save this Record.') === true) {

            var master = {
                ID: parseInt($('#txtID').val() || '0'),
                CUSTOMERNAME: $('#txtCustomerName').val(),
                CUSTOMERBANKNAME: $('#txtCustomerBankName').val(),
                CUSTOMERBANKBRANCHNAME: $('#txtCustomerBankBranchName').val(),
                CUSTOMERBANKADDRESSLINEONE: $('#txtAddressLineOne').val(),
                CUSTOMERBANKADDRESSLINETWO: $('#txtAddressLineTwo').val(),
                CUSTOMERBANKADDRESSLINETHREE: $('#txtAddressLineThree').val(),
                CUSTOMERBANKBINNO: $('#txtCustomerBankBinNo').val()
            };

            var id = parseInt($('#txtID').val() || '0');
            var apiUrl = id > 0 ? '/CustomerInfo/Update' : '/CustomerInfo/Create';

            $.ajax({
                type: 'POST',
                url: apiUrl,
                dataType: 'json',
                data: { 'customerBank': master },
                success: function (result) {
                    var message = (result || '').toString();
                    if (message.toLowerCase().indexOf('error:') === 0) {
                        notify('error', 'Error Message', message);
                    } else {
                        notify('success', 'Success Message', message);
                        $scope.Clear();
                        $scope.LoadData();
                        $('#customerModal').modal('hide');
                    }
                    $('#savebutton').prop('disabled', false);
                },
                error: function (errormessage) {
                    notify('error', 'Error Message', errormessage.responseText);
                }
            });
        }else {
            $('#savebutton').prop('disabled', false);
        }
    }

    $scope.DeleteMaster = function (id) {
        if (confirm('Are You Sure? You Want to Delete this Record.') === true) {
            $http({
                method: 'POST',
                url: '/CustomerInfo/Delete',
                params: { id: id }
            }).then(function (response) {
                var message = (response.data || '').toString();
                if (message.toLowerCase().indexOf('error:') === 0) {
                    notify('error', 'Error Message', message);
                } else {
                    notify('success', 'Success Message', message);
                }
                $scope.LoadData();
            });
        }
    }

});
