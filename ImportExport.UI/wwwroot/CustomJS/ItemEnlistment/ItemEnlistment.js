var app = angular.module("App", ['angularUtils.directives.dirPagination']);

app.controller("Ctl", function ($scope, $http) {

    var WEAVING_ID = '199238';   // string — dropdown values are strings

    $scope.SellerUnits = [];
    $scope.ItemTypes = [];
    $scope.EditItemTypes = [];
    $scope.ProductCategories = [];   // shared source for both dropdowns

    $scope.SelectedUnit = '';
    $scope.SelectedType = '';
    $scope.SelectedCategory = '';    // = TBLPRODUCTCATEGORY.CODE
    $scope.inputName = '';

    $scope.EditSelectedUnit = '';
    $scope.EditSelectedType = '';
    $scope.EditSelectedCategory = '';
    $scope.editName = '';
    $scope.editID = 0;

    // ---- helpers ----
    $scope.isWeaving = function () { return $scope.SelectedType === WEAVING_ID; };
    $scope.isEditWeaving = function () { return $scope.EditSelectedType === WEAVING_ID; };

    $scope.LoadData = function () {
        if ($scope.SellerUnits.length === 0) {
            $http({ method: "get", url: "/ItemEnlistment/GetSellerUnits" })
                .then(function (response) {
                    $scope.SellerUnits = response.data;
                }, function () {
                    notify('error', 'Error Message', 'Failed to load seller units.');
                });
        }

        if ($scope.ProductCategories.length === 0) {
            $http({ method: "get", url: "/ItemEnlistment/GetProductCategories" })
                .then(function (response) {
                    $scope.ProductCategories = response.data;
                }, function () {
                    notify('error', 'Error Message', 'Failed to load categories.');
                });
        }

        $http({ method: "get", url: "/ItemEnlistment/GetAll" })
            .then(function (response) {
                $scope.ItemList = response.data;
            }, function () {
                notify('error', 'Error Message', 'Failed to load items. Please try again.');
            });
    };

    // ---- Cascading: insert row ----
    $scope.onUnitChange = function () {
        $scope.ItemTypes = [];
        $scope.SelectedType = '';
        $scope.SelectedCategory = '';   // reset category when unit changes
        if (!$scope.SelectedUnit) { return; }

        $http({
            method: "get",
            url: "/ItemEnlistment/GetItemTypesByUnit",
            params: { unitId: $scope.SelectedUnit }
        }).then(function (response) {
            $scope.ItemTypes = response.data;
        }, function () {
            notify('error', 'Error Message', 'Failed to load item types.');
        });
    };

    // reset category whenever the item type changes (re-enable only if Weaving)
    $scope.onTypeChange = function () {
        $scope.SelectedCategory = '';
    };

    // ---- Cascading: edit modal ----
    $scope.onEditUnitChange = function (preselectType, preselectCategory) {
        $scope.EditItemTypes = [];
        if (typeof preselectType === 'undefined') {
            $scope.EditSelectedType = '';
            $scope.EditSelectedCategory = '';
        }
        if (!$scope.EditSelectedUnit) { return; }

        $http({
            method: "get",
            url: "/ItemEnlistment/GetItemTypesByUnit",
            params: { unitId: $scope.EditSelectedUnit }
        }).then(function (response) {
            $scope.EditItemTypes = response.data;
            if (typeof preselectType !== 'undefined' && preselectType !== null) {
                $scope.EditSelectedType = preselectType.toString();
                // restore saved category only if the row is Weaving
                if ($scope.EditSelectedType === WEAVING_ID &&
                    typeof preselectCategory !== 'undefined' && preselectCategory !== null) {
                    $scope.EditSelectedCategory = preselectCategory.toString();
                }
            }
        }, function () {
            notify('error', 'Error Message', 'Failed to load item types.');
        });
    };

    $scope.onEditTypeChange = function () {
        $scope.EditSelectedCategory = '';
    };

    $scope.Clear = function () {
        $scope.SelectedUnit = '';
        $scope.SelectedType = '';
        $scope.SelectedCategory = '';
        $scope.ItemTypes = [];
        $scope.inputName = '';
        $('#txtName').siblings('span.error').css('visibility', 'hidden');
    };

    $scope.Edit = function (list) {
        $scope.editID = list.id;
        $scope.EditSelectedUnit = list.unitid.toString();
        $scope.editName = list.productname;
        // load types for this unit, then preselect level-one AND category
        $scope.onEditUnitChange(list.leveloneid, list.categorycode);
        setTimeout(function () { $('#txtEditName').focus(); }, 200);
    };

    $scope.Save = function () {
        var isAllValid = true;

        if (!$scope.SelectedUnit) {
            isAllValid = false;
            notify('error', 'Error Message', 'Please select a seller unit.');
        }
        if (!$scope.SelectedType) {
            isAllValid = false;
            notify('error', 'Error Message', 'Please select an item type.');
        }
        // category mandatory only for Weaving
        if ($scope.isWeaving() && !$scope.SelectedCategory) {
            isAllValid = false;
            notify('error', 'Error Message', 'Please select a category for Weaving items.');
        }
        if (!$scope.inputName || $scope.inputName.trim() === '') {
            isAllValid = false;
            $('#txtName').siblings('span.error').css('visibility', 'visible');
        } else {
            $('#txtName').siblings('span.error').css('visibility', 'hidden');
        }

        if (isAllValid && confirm('Are You Sure? You Want to Save this Record.') === true) {
            var item = {
                ID: 0,
                UNITID: parseInt($scope.SelectedUnit),
                LEVELONEID: parseInt($scope.SelectedType),
                productname: $scope.inputName.trim(),
                categorycode: $scope.isWeaving() ? parseInt($scope.SelectedCategory) : null
            };

            $.ajax({
                type: 'POST',
                url: '/ItemEnlistment/Save',
                dataType: 'json',
                data: { item: item },
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
        if (confirm('Are You Sure? You Want to Update this Record.') !== true) { return; }

        var isAllValid = true;

        if (!$scope.EditSelectedUnit) {
            isAllValid = false;
            notify('error', 'Error Message', 'Please select a seller unit.');
        }
        if (!$scope.EditSelectedType) {
            isAllValid = false;
            notify('error', 'Error Message', 'Please select an item type.');
        }
        if ($scope.isEditWeaving() && !$scope.EditSelectedCategory) {
            isAllValid = false;
            notify('error', 'Error Message', 'Please select a category for Weaving items.');
        }
        if (!$scope.editName || $scope.editName.trim() === '') {
            isAllValid = false;
            $('#txtEditName').siblings('span.error').css('visibility', 'visible');
        } else {
            $('#txtEditName').siblings('span.error').css('visibility', 'hidden');
        }

        if (!isAllValid) { return; }

        var item = {
            ID: parseInt($scope.editID),
            UNITID: parseInt($scope.EditSelectedUnit),
            LEVELONEID: parseInt($scope.EditSelectedType),
            productname: $scope.editName.trim(),
            categorycode: $scope.isEditWeaving() ? parseInt($scope.EditSelectedCategory) : null
        };

        $.ajax({
            type: 'POST',
            url: '/ItemEnlistment/Save',
            dataType: 'json',
            data: { item: item },
            success: function (result) {
                var message = (result || '').toString();
                if (message.toLowerCase().indexOf('error:') === 0) {
                    notify('error', 'Error Message', message);
                } else {
                    notify('success', 'Success Message', message);
                    $('#editItemModal').modal('hide');
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
        if (confirm('Are You Sure? You Want to Delete this Record.') !== true) { return; }

        $http({
            method: 'POST',
            url: '/ItemEnlistment/Delete',
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