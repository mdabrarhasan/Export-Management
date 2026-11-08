var app = angular.module("App", ['angularUtils.directives.dirPagination']);

app.filter('upto4', function () {
    return function (value) {
        if (value === null || value === undefined || value === '') return '';
        var n = parseFloat(value);
        if (isNaN(n)) return value;
        // round to 4 dp, then drop trailing zeros
        return parseFloat(n.toFixed(4)).toString();
    };
});

app.controller("Ctl", function ($scope, $window, $http) {

    $scope.GetUnit = function () {

        $http({
            method: "GET",
            url: '/LC/GetUnit'
        }).success(function (result) {
            $scope.unitlist = result;
        });
    };

    $scope.SearchPI = function () {

        if ($("#unitidforload").val() === "91") {
            $(".jute").hide();
            $(".biax").show();

            $("#txtPISC").autocomplete({
                source: function (request, response) {
                    $.ajax({
                        url: '/PriceConfirm/GetPIInfoBiax/',
                        type: "Get",
                        dataType: "json",
                        data: { prefix: request.term, unitid: $("#unitidforload").val() },
                        success: function (data) {
                            response($.map(data, function (item) {
                                return { label: item.name, id: item.id, Name: item.name };
                            }));
                        }
                    });

                },
                select: function (event, ui) {

                    $("#txtPISC").val(ui.item.Name);
                    $("#txtPISCID").val(ui.item.id);
                    $scope.GetCusDataBiax(ui.item.id);
                    //$scope.GetSellerData(ui.item.id);
                    $scope.GetPIDetailsDataBiax(ui.item.id);
                    $scope.GetPackingData(ui.item.id);

                    return false;
                },
                minlength: 2
            });
        }
        else {
            $(".jute").show();
            $(".biax").hide();

            $("#txtPISC").autocomplete({
                source: function (request, response) {
                    $.ajax({
                        url: '/FreightCost/GetPISCWithPacking',
                        type: "Get",
                        dataType: "json",
                        data: { prefix: request.term },
                        success: function (data) {
                            response($.map(data, function (item) {
                                return { label: item.name, id: item.id, Name: item.name };
                            }));
                        }
                    });
                },
                select: function (event, ui) {
                    $("#txtPISC").val(ui.item.Name);
                    $("#txtPISCID").val(ui.item.id);
                    $scope.GetCusData(ui.item.id);
                    $scope.GetSellerData(ui.item.id);
                    $scope.GetPackingData(ui.item.id);
                    return false;
                },
                minlength: 2
            });
        }
    }

    $scope.LCMCostItem = function () {
        $http({
            method: "GET",
            url: "/FreightCost/GetCostItemList",
        }).then(function (response) {
            $scope.lcmtypelist = response.data;
        });
    };

    $scope.GetItemListByShipNo = function (id) {

        $http({
            method: "GET",
            url: "/FreightCost/GetItemListByShipNo",
            params: { id: id }
        }).then(function (response) {
            $scope.lcmitemlist = response.data;
        });
    };

    $scope.EGetItemListByShipNo = function (id, row) {
        $http({
            method: "GET",
            url: "/FreightCost/GetItemListByShipNo",
            params: { id: id }
        }).then(function (response) {
            row.lcmitemlist = response.data;   
        });
    };

    $scope.CalculateLine = function () {
        var total = parseFloat($("#cost").val()) * parseFloat($("#ccrate").val());

        $("#totalamount").val((isNaN((total)) ? 0 : (total)).toFixed(4));
        //alert($(".cost").val())
        //alert($(".currencyrate").val())
    };

    $scope.Add = function () {

        var isAllValid = true;

        if ($("#txtPISC").val() === "") {
            isAllValid = false;
            notify('error', 'Error Message', "Sales Contract Required");
        }
        else if ($("#ddllcmtypeid").val() == "0" || $("#ddllcmtypeid").val() == "") {
            isAllValid = false;
            notify('error', 'Error Message', "Select Cost Type.");
        }
        else if ($("#cost").val() === "0" || $("#cost").val() === "") {
            isAllValid = false;
            notify('error', 'Error Message', "Amt. couldn't be zero.");
        }
        else if ($("#lcmcostitemid").val() == "0" || $("#lcmcostitemid").val() == "") {
            isAllValid = false;
            notify('error', 'Error Message', "Select Cost Head.");
        }
        else if ($("#ddllcmtypeid").val() === "1") {
            if ($("#txtpackingid").val() == "0" || $("#txtpackingid").val() == "") {
                isAllValid = false;
                notify('error', 'Error Message', "Please Select Packing Request. While Select Cost Type Shipment Wise.");
            }

        }

        if (isAllValid) {


            var $newRow = $('#mainrow').clone().removeAttr('id');

            $('.cost', $newRow).val($("#cost").val()).attr('disabled', 'disabled');


            $('.ddllcmtypeid', $newRow).val($("#ddllcmtypeid").val()).attr('disabled', 'disabled');
            $('.lcmcostitemid', $newRow).val($("#lcmcostitemid").val()).attr('disabled', 'disabled');


            $('.totalamount', $newRow).val($("#totalamount").val()).attr('disabled', 'disabled');
            $('.remarks', $newRow).val($("#remarks").val()).attr('disabled', 'disabled');
            $('.ccrate', $newRow).val($("#ccrate").val()).attr('disabled', 'disabled');




            //  var totalAmount = parseFloat($("#totalamt").val());

            $('#add', $newRow).removeClass('btn-info').addClass('btn-danger');

            $('i', $newRow).removeClass('fas fa-ad').addClass('fas fa-trash btn-sm');


            /*$('#ddllcmtypeid,#lcmcostitemid,#selectedItemvalue,#txtServiceItem,#costtypeid,#currencyrate,#cost,#totalamt,#txtBillNumber,#paymentduedate,#descriptionline,#remarksline,#add', $newRow).removeAttr('id');*/
            $('#ddllcmtypeid,#lcmcostitemid,#totalamount,#cost,#remarks,#ccrate,#add', $newRow).removeAttr('id');
            $('span.error', $newRow).remove();

            $('#detailsItems').append($newRow);

            //totalbaseamt += parseFloat($("#totalamt").val());

            //$('#totallcdoccost').val(totalbaseamt);

            $newRow.find('.btn-danger').on('click', function () {
                
                $(this).closest('tr').remove();
            });

            $scope.ClearLine();
        }
    };

    $scope.GetCusData = function (id) {

        $.ajax({
            url: '/LC/GetCusInfo',
            type: "Get",
            dataType: "json",
            data: { 'id': id },
            success: function (data) {
                $("#hcusid").val(data[0].id);
                $("#txtBuyerName").val(data[0].name);
                $("#txtCusCode").val(data[0].id);
                $("#txtPhone").val(data[0].phone);
                $("#txtEmail").val(data[0].email);
                $("#txtTIN").val(data[0].tin);
                $("#txtAddress").val(data[0].address);
            }
        });
    };

    $scope.GetSellerData = function (id) {
        $.ajax({
            url: '/PriceConfirm/GetSellerInfo',
            type: "Get",
            dataType: "json",
            data: { 'id': id },
            success: function (data) {

                $("#txtComName").val(data[0].name);
                $("#hsellerid").val(data[0].id);
                $("#txtSellerPhone").val(data[0].phone);
                $("#txtSellerEmail").val(data[0].email);
                $("#txtSellerTIN").val(data[0].tin);
                $("#txtSellerAddress").val(data[0].address);
            }
        });
    };

    $scope.GetPIDetailsData = function (id) {
        $http({
            method: "get",
            params: { id: id},
            url: "FreightCost/GetPIDetailsData",
        }).then(function (response) {
            $scope.detailsbyid = response.data;
        });
    };

    $scope.GetPackingData = function (id) {
        $scope.txtpackingid = "";  
        $scope.packinglist = [];
        
        $http({
            method: "get",
            params: { id: id },
            url: "FreightCost/GetPackingData",
        }).then(function (response) {
            //console.log(response);
            $scope.packinglist = response.data;
            
        });
    };

    $scope.ViewCData = function (id) {
        $http({
            method: "get",
            params: { id: id },
            url: "FreightCost/ViewCData",
        }).then(function (response) {
            //alert(response)
            $scope.masterdata = response.data;
            $scope.GetPIDetailsData(id);
        });
    };

    $scope.ViewDetails = function (id) {
        $http({
            method: "get",
            params: { id: id },
            url: "FreightCost/ViewDetails",
        }).then(function (response) {
            //alert(response)
            $scope.pclistdetails = response.data;
            
        });
    };

    $scope.PCList = function () {
        var unitId = parseInt($("#unitid").val(), 10);
        $http({
            method: "get",
            url: "/FreightCost/Getdata",
            params: { unitid: unitId }
        }).then(function (response) {
            $scope.PClist = response.data;
            
        });
        
    };

    $scope.ClearLine = function () {
        
        $('#lcmcostitemid').val(0);
        $('#cost').val('');
        
        $('#totalamount').val('');
        $('#remarks').val('');
    };

    $scope.Clear = function () {

        // Sales Contract
        $("#txtPISC").val('');
        $("#txtPISCID").val('');

        // Supplier
        $("#txtSupplier").val('');
        $("#txtSupplierID").val('');

        // Buyer details
        $("#hcusid, #txtBuyerName, #txtPhone, #txtEmail, #txtAddress").val('');

        // Entry line + added cost item rows
        $scope.ClearLine();
        $("#detailsItems").empty();

        // Text areas
        $("#termscon").val('');
        $("#description").val('');

        // Angular-bound fields; $evalAsync is safe whether called
        // from ng-click or from a jQuery $.ajax callback
        $scope.$evalAsync(function () {
            $scope.unitidforloadmodel = null;
            $scope.unitidsave = null;
            $scope.txtpackingid = "";
            $scope.packinglist = [];
            $scope.ddllcmtypeid = "";
            $scope.lcmitemlist = [];
        });
    };

    $scope.PassID = function (id) {
        $scope.unitidsave = id;
        $("#txtSupplier").val('');
        $("#txtSupplierID").val('');
    };

    $scope.SearchSupplier = function () {
        var $txt = $("#txtSupplier");

        // Attach the autocomplete only once; after that the widget handles typing itself
        if (!$txt.data("ui-autocomplete")) {

            $txt.autocomplete({
                minLength: 2,
                appendTo: "#exampleModalFullscreen",
                source: function (request, response) {
                    if (!$scope.unitidsave) {
                        notify('error', 'Error Message', "Please select Business Unit first.");
                        response([]);
                        return;
                    }
                    $.ajax({
                        url: '/FreightCost/GetSupplierByUnit',
                        type: "GET",
                        dataType: "json",
                        data: { unitid: $scope.unitidsave, prefix: request.term },
                        success: function (data) {
                            response($.map(data, function (item) {
                                return { label: item.name, id: item.id, Name: item.name };
                            }));
                        },
                        error: function (xhr) {
                            console.error("Supplier search failed:", xhr.status, xhr.responseText);
                            notify('error', 'Error Message', "Supplier search failed (" + xhr.status + ")");
                            response([]);
                        }
                    });
                },
                select: function (event, ui) {
                    $("#txtSupplier").val(ui.item.Name);
                    $("#txtSupplierID").val(ui.item.id);
                    return false;
                },
                change: function (event, ui) {
                    if (!ui.item) {
                        $("#txtSupplierID").val('');
                    }
                }
            });

            // Search right away for the text the user has already typed
            if ($txt.val().length >= 2) {
                $txt.autocomplete("search", $txt.val());
            }
        }
    };
    
    $scope.Save = function () {

        if (!$scope.unitidsave || $scope.unitidsave === "0") {
            notify('error', 'Error Message', "Please select Business Unit.");
            return;
        }

        if (!$('#txtPISCID').val()) {
            notify('error', 'Error Message', "Please select Sales Contract.");
            return;
        }

        if (!$('#txtSupplierID').val()) {
            notify('error', 'Error Message', "Please select Supplier.");
            return;
        }

        var Details = [];

        var master = {
            SCID: $('#txtPISCID').val(),
            PRID: $('#txtpackingid').val(),
            UNIT: $scope.unitidsave,
            SUPPLIERID: $('#txtSupplierID').val()
        };

        $("#detailsItems tbody tr").each(function () {

            var details = {
                LCMTYPEID: parseInt($(".ddllcmtypeid", this).val()) || 0,
                ITEMCOSTID: parseInt($(".lcmcostitemid", this).val()) || 0,
                COST: parseFloat($(".cost", this).val()) || 0,
                CCRATE: parseFloat($(".ccrate", this).val()) || 0,
                TOTALAMOUNT: parseFloat($(".totalamount", this).val()) || 0,
                REMARKS: $(".remarks", this).val()
            };

            Details.push(details);
        });

        if (Details.length === 0) {
            notify('error', 'Error Message', "Please add at least one cost item.");
            return;
        }

        // Block double submit: each save creates an ERP PO
        var $btn = $("#savebutton");
        $btn.prop('disabled', true);

        $.ajax({
            type: 'POST',
            url: '/FreightCost/Save',
            dataType: "json",
            data: { master: master, fcl: Details },
            success: function (result) {
                // The SP returns errors as plain text, so check the message itself
                var ok = typeof result === 'string' && result.indexOf('Saved successfully') === 0;

                if (ok) {
                    notify("success", "Success Message", result);
                    $scope.PCList();
                    $scope.Clear();
                } else {
                    // Keep the form so the user can fix and retry
                    notify('error', 'Error Message', result);
                }
            },
            error: function (errormessage) {
                notify('error', 'Error Message', errormessage.responseText);
            },
            complete: function () {
                $btn.prop('disabled', false);
            }
        });
    };

    $scope.SetFCID = function (id) {
        $scope.fcid = id;
    };

    
    $scope.Update = function (fclid, lcmtypeid, itemcostid, cost, remarks) {

        var master = {
            FCID: $scope.fcid,
            FCLID: fclid,
            LCMTYPEID: isNaN(parseInt(lcmtypeid, 10)) ? 0 : parseInt(lcmtypeid, 10),
            ITEMCOSTID: isNaN(parseInt(itemcostid, 10)) ? 0 : parseInt(itemcostid, 10),
            COST: cost,
            REMARKS: remarks
        };

        $.ajax({
            type: 'POST',
            url: '/FreightCost/Update',
            dataType: "json",
            data: { master: master },
            success: function (result) {
                notify("success", "Success Message", result);
                $scope.$apply(function () {
                    $scope.PCList();                    
                    $scope.GetPIDetailsData($scope.fcid); 
                });
            },
            error: function (err) {
                notify('error', 'Error Message', err.responseText);
            }
        });
    };
    

    $scope.DeleteMaster = function (fcid) {
        if (!confirm("Are you sure you want to delete this record?")) {
            return;
        }
        var del = { DELID: fcid };
        $.ajax({
            type: 'POST',
            url: '/FreightCost/DeleteMaster',
            dataType: "json",
            data: { del: del },
            success: function (result) {
                notify("success", "Success Message", result);
                $scope.$apply(function () {
                    $scope.PCList();
                });
            },
            error: function (err) {
                notify('error', 'Error Message', err.responseText);
            }
        });
    };

    $scope.DeleteLine = function (fclid) {
        if (!confirm("Are you sure you want to delete this record?")) {
            return;
        }
        var del = { DELID: fclid };
        $.ajax({
            type: 'POST',
            url: '/FreightCost/DeleteLine',
            dataType: "json",
            data: { del: del },
            success: function (result) {
                notify("success", "Success Message", result);
                $scope.$apply(function () {
                    $scope.GetPIDetailsData($scope.fcid);
                });
            },
            error: function (err) {
                notify('error', 'Error Message', err.responseText);
            }
        });
    };

});