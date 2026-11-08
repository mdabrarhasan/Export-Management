//var app = angular.module("App", ['angularUtils.directives.dirPagination']);

//app.controller("Ctl", function ($scope, $http) {
//    $scope.MasterTypes = [
//        { Value: 'SIZE', Text: 'Size' },
//        { Value: 'WEIGHT', Text: 'Weight' },
//        { Value: 'CONSTRUCTION', Text: 'Construction' },
//        { Value: 'SLIT', Text: 'Slit' },
//        { Value: 'SCRIM', Text: 'Scrim' },
//        { Value: 'QUALITY', Text: 'Quality' }
//    ];

//    $scope.SelectedType = 'SIZE';

//    $scope.LoadData = function () {
//        $http({
//            method: "get",
//            url: "/MasterType/GetAll",
//            params: { masterType: $scope.SelectedType }
//        }).then(function (response) {
//            $scope.MasterTypeList = response.data;
//        }, function () {
//            notify('error', 'Error Message', 'Failed to load master data. Please try again.');
//        });
//    };

//    $scope.ChangeMasterType = function () {
//        $scope.Clear();
//        $scope.LoadData();
//    };

//    $scope.Clear = function () {
//        $('#txtValue').val('');
//        $('#txtValue').siblings('span.error').css('visibility', 'hidden');
//        $('#savebutton').prop('disabled', true);
//    };

//    $scope.CheckInputValue = function () {
//        var inputValue = ($('#txtValue').val() || '').trim();
//        if (inputValue === '') {
//            $('#savebutton').prop('disabled', true);
//        } else {
//            $('#savebutton').prop('disabled', false);
//        }
//    };

//    $scope.Edit = function (list) {
//        $('#txtEditID').val(list.id);
//        $('#txtEditValue').val(list.value);
//        $('#txtEditValue').siblings('span.error').css('visibility', 'hidden');
//        setTimeout(function () {
//            $('#txtEditValue').focus();
//        }, 200);
//    };

//    $scope.Save = function () {
//        var isAllValid = true;
//        var inputValue = ($('#txtValue').val() || '').trim();

//        if (inputValue === '') {
//            isAllValid = false;
//            $('#txtValue').siblings('span.error').css('visibility', 'visible');
//        } else {
//            $('#txtValue').siblings('span.error').css('visibility', 'hidden');
//        }

//        if (isAllValid && confirm('Are You Sure? You Want to Save this Record.') === true) {
//            var master = {
//                ID: 0,
//                MASTERTYPE: $scope.SelectedType,
//                VALUE: inputValue
//            };

//            $.ajax({
//                type: 'POST',
//                url: '/MasterType/Save',
//                dataType: 'json',
//                data: { master: master },
//                success: function (result) {
//                    var message = (result || '').toString();
//                    if (message.toLowerCase().indexOf('error:') === 0) {
//                        notify('error', 'Error Message', message);
//                    } else {
//                        notify('success', 'Success Message', message);
//                        $scope.Clear();
//                        $scope.LoadData();
//                    }
//                    $('#savebutton').prop('disabled', false);
//                },
//                error: function (errormessage) {
//                    notify('error', 'Error Message', errormessage.responseText);
//                    $('#savebutton').prop('disabled', false);
//                }
//            });
//        } else {
//            $('#savebutton').prop('disabled', false);
//        }
//    };

//    $scope.Update = function () {
//        if (confirm('Are You Sure? You Want to Update this Record.') !== true) {
//            return;
//        }

//        var isAllValid = true;

//        if ($('#txtEditValue').val().trim() === '') {
//            isAllValid = false;
//            $('#txtEditValue').siblings('span.error').css('visibility', 'visible');
//        } else {
//            $('#txtEditValue').siblings('span.error').css('visibility', 'hidden');
//        }

//        if (!isAllValid) {
//            return;
//        }

//        var master = {
//            ID: parseInt($('#txtEditID').val() || '0'),
//            MASTERTYPE: $scope.SelectedType,
//            VALUE: $('#txtEditValue').val()
//        };

//        $.ajax({
//            type: 'POST',
//            url: '/MasterType/Save',
//            dataType: 'json',
//            data: { master: master },
//            success: function (result) {
//                var message = (result || '').toString();
//                if (message.toLowerCase().indexOf('error:') === 0) {
//                    notify('error', 'Error Message', message);
//                } else {
//                    notify('success', 'Success Message', message);
//                    $('#editMasterTypeModal').modal('hide');
//                    $scope.LoadData();
//                }
//                $('#updatebutton').prop('disabled', false);
//            },
//            error: function (errormessage) {
//                notify('error', 'Error Message', errormessage.responseText);
//                $('#updatebutton').prop('disabled', false);
//            }
//        });
//    };

//    $scope.DeleteMaster = function (id) {
//        if (confirm('Are You Sure? You Want to Delete this Record.') !== true) {
//            return;
//        }

//        $http({
//            method: 'POST',
//            url: '/MasterType/Delete',
//            params: {
//                id: id,
//                masterType: $scope.SelectedType
//            }
//        }).then(function (response) {
//            var message = (response.data || '').toString();
//            if (message.toLowerCase().indexOf('error:') === 0) {
//                notify('error', 'Error Message', message);
//            } else {
//                notify('success', 'Success Message', message);
//            }
//            $scope.LoadData();
//        }, function () {
//            notify('error', 'Error Message', 'Delete failed. Please try again.');
//        });
//    };

//});


var app = angular.module("App", ['angularUtils.directives.dirPagination']);

app.controller("Ctl", function ($scope, $http) {

    $scope.MasterTypes = [
        { Value: 'SIZE', Text: 'Size' },
        { Value: 'WEIGHT', Text: 'Weight' },
        { Value: 'CONSTRUCTION', Text: 'Construction' },
        { Value: 'SLIT', Text: 'Slit' },
        { Value: 'SCRIM', Text: 'Scrim' },
        { Value: 'QUALITY', Text: 'Quality' }
    ];

    $scope.SelectedType = 'SIZE';
    $scope.inputValue = '';
    $scope.showValueError = false;
    $scope.saving = false;

    // ---------------- Load ----------------
    $scope.LoadData = function () {
        $http({
            method: "get",
            url: "/MasterType/GetAll",
            params: { masterType: $scope.SelectedType }
        }).then(function (response) {
            $scope.MasterTypeList = response.data;
        }, function () {
            notify('error', 'Error Message', 'Failed to load master data. Please try again.');
        });
    };

    $scope.ChangeMasterType = function () {
        $scope.Clear();
        $scope.LoadData();
    };

    $scope.Clear = function () {
        $scope.inputValue = '';
        $scope.showValueError = false;
    };

    // ---------------- Insert ----------------
    $scope.Save = function () {
        var value = ($scope.inputValue || '').trim();

        if (value === '') {
            $scope.showValueError = true;
            return;
        }
        $scope.showValueError = false;

        if (!confirm('Are You Sure? You Want to Save this Record.')) {
            return;
        }

        $scope.saving = true;

        $http({
            method: 'POST',
            url: '/MasterType/Save',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            data: $.param({
                master: {
                    ID: 0,
                    MASTERTYPE: $scope.SelectedType,
                    VALUE: value
                }
            })
        }).then(function (response) {
            var message = (response.data || '').toString();
            if (message.toLowerCase().indexOf('error:') === 0) {
                notify('error', 'Error Message', message);
            } else {
                notify('success', 'Success Message', message);
                $scope.Clear();
                $scope.LoadData();
            }
        }, function (err) {
            notify('error', 'Error Message', (err && err.data) || 'Save failed. Please try again.');
        }).finally(function () {
            $scope.saving = false;
        });
    };

    // ---------------- Edit (modal) ----------------
    $scope.Edit = function (list) {
        $('#txtEditID').val(list.id);
        $('#txtEditValue').val(list.value);
        $('#txtEditValue').siblings('span.error').css('visibility', 'hidden');
        setTimeout(function () {
            $('#txtEditValue').focus();
        }, 200);
    };

    $scope.Update = function () {
        if (confirm('Are You Sure? You Want to Update this Record.') !== true) {
            return;
        }

        if ($('#txtEditValue').val().trim() === '') {
            $('#txtEditValue').siblings('span.error').css('visibility', 'visible');
            return;
        }
        $('#txtEditValue').siblings('span.error').css('visibility', 'hidden');

        var master = {
            ID: parseInt($('#txtEditID').val() || '0'),
            MASTERTYPE: $scope.SelectedType,
            VALUE: $('#txtEditValue').val().trim()
        };

        $('#updatebutton').prop('disabled', true);

        $http({
            method: 'POST',
            url: '/MasterType/Save',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            data: $.param({ master: master })
        }).then(function (response) {
            var message = (response.data || '').toString();
            if (message.toLowerCase().indexOf('error:') === 0) {
                notify('error', 'Error Message', message);
            } else {
                notify('success', 'Success Message', message);
                $('#editMasterTypeModal').modal('hide');
                $scope.LoadData();
            }
        }, function (err) {
            notify('error', 'Error Message', (err && err.data) || 'Update failed. Please try again.');
        }).finally(function () {
            $('#updatebutton').prop('disabled', false);
        });
    };

    // ---------------- Delete ----------------
    $scope.DeleteMaster = function (id) {
        if (confirm('Are You Sure? You Want to Delete this Record.') !== true) {
            return;
        }

        $http({
            method: 'POST',
            url: '/MasterType/Delete',
            params: {
                id: id,
                masterType: $scope.SelectedType
            }
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