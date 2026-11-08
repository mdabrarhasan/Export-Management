var app = angular.module("App", ['angularUtils.directives.dirPagination']);


app.controller("Ctl", function ($scope, $window, $http) {

    $(".juteview").hide();
    $(".biaxview").hide();
    $(".editjute").hide();
    $(".editbiax").hide();

    //$scope.loading = true;
    $scope.StatusList = function () {
        $http({
            method: "get",
            url: "/AgreementApproval/GetStatusData"
        }).then(function (response) {
            //console.log(response);
            $scope.statuslist = response.data;
        });
    };


    $scope.GetFGUOM = function () {

        $http({
            method: "get",
            url: "/Quotation/GetFGUOM",
        }).then(function (response) {
            $scope.fguomlist = response.data;
        });
    };

    $scope.Dislist = function () {
        $http({
            method: "get",
            url: "/SalesQuatationLanding/GetDiscountDetails"
        }).then(function (response) {
            $scope.Dislist = response.data;

        });
    };

    $scope.GetTreatmentDirection = function () {

        $http({
            method: "get",
            url: "/Quotation/GetTreatmentDirection",
        }).then(function (response) {
            $scope.treatmentdirectionlist = response.data;
        });
    };

    $scope.GetBiaxFlimCore = function () {

        $http({
            method: "get",
            url: "/Quotation/GetBiaxFlimCore",
        }).then(function (response) {
            $scope.flimcorelist = response.data;
        });
    };



    /*$scope.GetUnit = function () {

        $http({
            method: "GET",
            url: '/LC/GetUnit'
        }).success(function (result) {
            $scope.unitlist = result;
        });
    }*/

    $scope.GetUnit = function () {

        $http({
            method: "GET",
            //url: '/LC/GetUnit'
            url: '/Common/GetUnitByUser'
        }).success(function (result) {
            $scope.unitlist = result;
        });
    }


    //$scope.UpdateByLineID = function (i, id) {
    //    var isAllValid = true;

    //    if ($("#econfirmprice" + i).val() == "") {
    //        isAllValid = false;
    //        $("#econfirmprice" + i).siblings('span.error').css('visibility', 'visible');

    //    }
    //    else {
    //        $("#econfirmprice" + i).siblings('span.error').css('visibility', 'hidden');
    //    }


    //    if (isAllValid) {

    //        var details = {
    //            ID: id,
    //            ITEMID: $("#eitemcode" + i).val(),
    //            QUANTITY: $("#equantity" + i).val(),
    //            PRICE: $("#eunitprice" + i).val(),
    //            OFFERPRICE: $("#eofferprice" + i).val(),
    //            CONFIRMPRICE: $("#confirmprice" + i).val()
    //        }


    //        $.ajax({
    //            type: 'POST',
    //            url: "/PriceConfirmApproval/UpdateDetailsByID",
    //            dataType: "json",
    //            data: { 'pcd': details },
    //            success: function (result) {
    //                notify('success', 'Success Message', result);
    //            },
    //            error: function (errormessage) {
    //                notify('error', 'Error Message', errormessage.responseText);
    //            }
    //        });
    //    }
    //};

    $scope.UpdateByLineID = function (i, id) {
        // Branch the same way EditbyMasterID does: dropdown unit 91 = BIAX, else = Jute
        //var isJute = ($("#unitid").val() !== "91");
        var isJute = ($("#hunitid").val() !== "91");
        var $c = isJute ? $(".editjute") : $(".editbiax");

        var isAllValid = true;
        var details;

        if (isJute) {
            // JUTE: editable field is Unit Price
            var unitPrice = $c.find("#eunitprice" + i).val();
            if (unitPrice == "" || unitPrice === "0") {
                isAllValid = false;
                notify('error', 'Error Message', 'Unit Price could not be empty or zero.');
            }
            details = {
                ID: id,
                ITEMID: $c.find("#eitemcode" + i).val(),
                QUANTITY: $c.find("#equantity" + i).val(),
                PRICE: unitPrice,
                OFFERPRICE: $c.find("#eofferprice" + i).val(),
                CONFIRMPRICE: $c.find("#ceofferprice" + i).val()
            };
        } else {
            // BIAX: editable field is Confirm Price (unchanged)
            var $confirmField = $c.find("#confirmprice" + i);
            if ($confirmField.val() == "") {
                isAllValid = false;
                $confirmField.siblings('span.error').css('visibility', 'visible');
            } else {
                $confirmField.siblings('span.error').css('visibility', 'hidden');
            }
            details = {
                ID: id,
                ITEMID: $c.find("#eitemcode" + i).val(),
                QUANTITY: $c.find("#equantity" + i).val(),
                PRICE: $c.find("#eunitprice" + i).val(),
                OFFERPRICE: $c.find("#eofferprice" + i).val(),
                CONFIRMPRICE: $confirmField.val()
            };
        }

        if (isAllValid) {
            $.ajax({
                type: 'POST',
                url: "/PriceConfirmApproval/UpdateDetailsByID",
                dataType: "json",
                data: { 'pcd': details },
                success: function (result) {
                    notify('success', 'Success Message', result);
                },
                error: function (errormessage) {
                    notify('error', 'Error Message', errormessage.responseText);
                }
            });
        }
    };


    $scope.EditbyMasterID = function (id, cusid, sellerid, number, description, termscon, histryid, businessunitid) {
        $("#hunitid").val(sellerid);
        $("#hbusinessunit").val(businessunitid);
        $("#priceconfirmheaderid").val('');
        $("#histryid").val(histryid);
        histryid
        console.log("EDIT v2 -> sellerid:", sellerid, " branch:", String(sellerid) === "91" ? "BIAX" : "JUTE");
        //if ($("#unitid").val() === "91") {
        if (String(sellerid) === "91") {
     
            $(".editjute").hide();
            $(".editbiax").show();
            $("#priceconfirmheaderid").val(histryid);
            $http({
                method: "get",
                params: { id: id },
                url: "PriceConfirm/EditMasterByID",
            }).then(function (response) {
                $("#etxtPISC").val(number);
                $("#etermscon").val(termscon);
                $("#edescription").val(description);

                $scope.EditDetailsByIDBiax(id);
                $scope.EditGetCusData(cusid);
                $scope.EditGetSellerData(sellerid);

                //$scope.loading = false;
            });
        }
        else {
            $(".editjute").show();
            $(".editbiax").hide();
            $("#priceconfirmheaderid").val(histryid);
            $http({
                method: "get",
                params: { id: id },
                url: "PriceConfirm/EditMasterByID",
            }).then(function (response) {
                $("#etxtPISC").val(number);
                $("#etermscon").val(termscon);
                $("#edescription").val(description);
                $("#histryid").val(histryid);

                $scope.EditDetailsByID(id);
                $scope.EditGetCusData(cusid);
                $scope.EditGetSellerData(sellerid);

                //$scope.loading = false;
            });
        }
        //$("#priceconfirmheaderid").val(id);
        //$http({
        //    method: "get",
        //    params: { id: id },
        //    url: "PriceConfirm/EditMasterByID",
        //}).then(function (response) {
        //    $("#etxtPISC").val(number);
        //    $("#etermscon").val(termscon);
        //    $("#edescription").val(description);

        //    $scope.EditDetailsByID(id);
        //    $scope.EditGetCusData(cusid);
        //    $scope.EditGetSellerData(sellerid);

        //    //$scope.loading = false;
        //});
    };

    $scope.EditDetailsByIDBiax = function (id) {
        $http({
            method: "get",
            params: { id: id },
            url: "PriceConfirm/EditDetailsByIDBiax",
        }).then(function (response) {
            console.log(response);
            console.log(response.data);
            $scope.edetailsbyidbiax = response.data;
        });
    }

    $scope.EditGetCusData = function (id) {
        $.ajax({
            url: '/PriceConfirm/GetCusInfoGeneral',
            type: "Get",
            dataType: "json",
            data: { 'id': id },
            success: function (data) {

                $("#ehcusid").val(data[0].id);
                $("#etxtBuyerName").val(data[0].name);
                $("#etxtCusCode").val(data[0].id);
                $("#etxtPhone").val(data[0].phone);
                $("#etxtEmail").val(data[0].email);
                $("#etxtTIN").val(data[0].tin);
                $("#etxtAddress").val(data[0].address);
            }
        });
    }


    $scope.EditDetailsByID = function (id) {
        $http({
            method: "get",
            params: { id: id },
            url: "PriceConfirm/EditDetailsByID",
        }).then(function (response) {
            console.log(response);
            $scope.edetailsbyid = response.data;

        });
    }


    $scope.EditGetSellerData = function (id) {
        $.ajax({
            url: '/PriceConfirm/GetSellerInfoGeneral',
            type: "Get",
            dataType: "json",
            data: { 'id': id },
            success: function (data) {

                $("#etxtComName").val(data[0].name);
                $("#ehsellerid").val(data[0].id);
                $("#etxtSellerPhone").val(data[0].phone);
                $("#etxtSellerEmail").val(data[0].email);
                $("#etxtSellerTIN").val(data[0].tin);
                $("#etxtSellerAddress").val(data[0].address);
            }
        });
    }


    $scope.PCList = function () {
        $scope.loading = true;
        $http({
            method: "get",
            url: "/PriceConfirmApproval/GetPCPending",
            params: { statusid: $scope.statusid, unitid: $scope.unitid }
        }).then(function (response) {
            $scope.PClist = response.data;
            $scope.loading = false;
        });
    };


    $scope.Rejected = function (id, index) {
        if (confirm('Are You Sure? You Want to Reject this Record.') == true) {

            $http({
                method: "POST",
                url: "/PriceConfirmApproval/Rejected",
                params: { id: id, remarks: $('#description' + index).val() }
            }).then(function (response) {
                notify('success', 'Success Message', response.data.trim());
                $scope.PCList();
            });
        }
        else {

        }
    };


    //$scope.Approved = function (id, index) {
    //    if (confirm('Are You Sure? You Want to Approve this Record.') == true) {
    //        $http({
    //            method: "POST",
    //            url: "/PriceConfirmApproval/Approve",
    //            params: { id: id, remarks: $('#description' + index).val() }
    //        }).then(function (response) {
    //            console.log(response);
    //            notify('success', 'Success Message', response.data.trim());
    //            $scope.PCList();
    //        });
    //    }
    //    else {

    //    }
    //};


    $scope.Approved = function () {
        if (confirm('Are You Sure? You Want to Approve this Record.') != true) {
            return;
        }

        var doApprove = function () {
            $http({
                method: "POST",
                url: "/PriceConfirmApproval/Approve",
                params: { id: $("#histryid").val(), unitid: $("#hunitid").val() }
            }).then(function (response) {
                notify('success', 'Success Message', response.data.trim());
                $scope.PCList();
            });
        };

        // JUTE: update every line (Unit Price -> PC line PRICE + SC push) BEFORE approving
        //if ($("#unitid").val() !== "91") {
        //if ($("#hbusinessunit").val() !== "91") {
        if ($("#hunitid").val() !== "91") {
            var $jute = $(".editjute");
            var rows = [];
            var invalid = false;

            angular.forEach($scope.edetailsbyid, function (line, i) {
                var unitPrice = $jute.find("#eunitprice" + i).val();
                if (unitPrice == "" || unitPrice === "0") {
                    invalid = true;
                }
                rows.push({ line: line, unitPrice: unitPrice });
            });

            if (invalid) {
                notify('error', 'Error Message', 'Unit Price could not be empty or zero on any line.');
                return;
            }

            var requests = [];
            angular.forEach(rows, function (row) {
                requests.push($.ajax({
                    type: 'POST',
                    url: "/PriceConfirmApproval/UpdateDetailsByID",
                    dataType: "json",
                    data: {
                        'pcd': {
                            ID: row.line.id,
                            ITEMID: row.line.itemid,
                            QUANTITY: row.line.quantity,
                            PRICE: row.unitPrice,
                            OFFERPRICE: row.line.offerprice,
                            CONFIRMPRICE: row.line.confirmprice
                        }
                    }
                }));
            });

            $.when.apply($, requests).done(function () {
                doApprove();
            }).fail(function (err) {
                notify('error', 'Error Message', (err && err.responseText) ? err.responseText : 'Line update failed; approval aborted.');
            });
        } else {
            // BIAX: approve as before
            doApprove();
        }
    };


    $scope.ViewCData = function (ID, proformainvoiceheaderid, recunit) {
        if (String(recunit) === "91") {
            $scope.ID = ID;
            $http({
                method: "GET",
                url: '/PriceConfirmApproval/ViewByMasterIDBiax',
                params: { id: $scope.ID }
            }).success(function (data) {
                $scope.masterdata = data;
            });

            $scope.ViewByDetailsData(ID, proformainvoiceheaderid, recunit);
        }
        else {
            $scope.ID = ID;
            $http({
                method: "GET",
                url: '/PriceConfirmApproval/ViewByMasterID',
                params: { id: $scope.ID }
            }).success(function (data) {
                $scope.masterdata = data;
            });

            $scope.ViewByDetailsData(ID, proformainvoiceheaderid, recunit);
        }
    };


    $scope.ViewByDetailsData = function (ID, proformainvoiceheaderid, recunit) {
        if (String(recunit) === "91") {
            $(".juteview").hide();
            $(".biaxview").show();
            $scope.quotationid = proformainvoiceheaderid;

            $http({
                method: "GET",
                url: "PriceConfirm/EditDetailsByIDBiax",
                params: { id: ID }
            }).success(function (result) {
                $scope.viewdetailsbyid = null;
                $scope.viewdetailsbyid = result;
            });
        }
        else {
            $(".juteview").show();
            $(".biaxview").hide();
            $scope.ID = ID;
            $http({
                method: "GET",
                url: '/PriceConfirmApproval/ViewByDetailsID',
                params: { id: $scope.ID }
            }).success(function (data) {
                console.log(data);
                $scope.pclistdetails = data;
            });
        }
    };

    $scope.sortBy = function (column) {
        $scope.sortColumn = column;
        $scope.reverse = !$scope.reverse;
    }

    $scope.LoadDocument = function (ID) {
        $scope.ID = ID;
        $http({
            method: "GET",
            url: '/SalesQuatationApproval/LoadDocument',
            params: { id: $scope.ID, }
        }).success(function (result) {
   
            $scope.imageitem = result;
        });
    }

    $scope.Download = function (ID) {
        $scope.ID = ID;
        $http({
            method: "GET",
            url: '/SalesQuatationApproval/Download',
            params: { id: $scope.ID, }
        }).success(function (result) {
            $scope.imageitem = result;
        });
    }

    $scope.Update = function () {
        var Details = [];

        //var master = {
        //    SELLERID: $("#hsellerid").val(),
        //    CUSTOMERID: $("#hcusid").val(),
        //    PROFORMAINVOICEHEADERID: $("#priceconfirmheaderid").val(),
        //    TERMSCONDITION: $("#termscon").val(),
        //    DESCRIPTIONS: $("#description").val()
        //}

        $($("#biaxeditmycontainer > tbody > tr").each(function (index, ele) {
            var details = {
                ID: $(".eid", this).val(),
                ITEMID: $(".eitemcode", this).val(),
                QUANTITY: parseFloat($(".equantity", this).val()),
                PRICE: parseFloat($(".eunitprice", this).val()),
                OFFERPRICE: parseInt($(".eofferprice", this).val()),
                CONFIRMPRICE: parseFloat($(".confirmprice", this).val())

                
            }
         
            Details.push(details);
        }));


        $.ajax({
            type: 'POST',
            url: '/PriceConfirmApproval/Update',
            dataType: "json",
            data: { 'id': $("#priceconfirmheaderid").val(), 'pcd': Details },
            success: function (result) {

                //$scope.UploadFile(result);
                notify("success", "Success Messsage", result);
                $scope.PCList();
              //  $scope.Clear();
            },
            error: function (errormessage) {
                notify('error', 'Error Message', errormessage.responseText);
            }
        });
    }
    $scope.Cancled = function (id, index) {
        if (confirm('Are You Sure? You Want to Cancle this Record.') == true) {

            $http({
                method: "GET",
                url: "/Common/Cancled",
                params: { id: id, remarks: index }
            }).then(function (response) {
                notify('success', 'Success Message', response.data.trim());
                $scope.SQList();
            });
        }
        else {

        }
    };
    $scope.Calculate = function (index) {
        var total = parseFloat($("#equantity" + index).val()) * parseFloat($("#confirmprice" + index).val());
        $("#etotalamount" + index).val(total);
    };
    $scope.EDiscountPercentageCalculateLine = function (index, discountid) {

        if (discountid == 0 || discountid === null) {
            var total = parseFloat($("#equantity" + index).val()) * parseFloat($("#confirmprice" + index).val());

            $("#ediscountamount" + index).val('0');
            $("#etotalamount" + index).val((isNaN((total)) ? 0 : (total)).toFixed(4));
        }
        else {
            $http({
                method: "get",
                url: "/SalesQuatationLanding/GetDisCal",
                params: { id: discountid }
            }).then(function (response) {
                // alert(response.data[0]);

                var total = parseFloat($("#equantity" + index).val()) * parseFloat($("#confirmprice" + index).val());

                if (response.data[0] === undefined) {
                    $("#etotalamount" + index).val((isNaN((total + parseFloat($("#evatamount" + index).val()))) ? 0 : (total + parseFloat($("#evatamount" + index).val()))).toFixed(4));
                }
                else if (response.data[0].code === "WD") {

                    $("#etotalamount" + index).val((isNaN((total - parseFloat($("#ediscountamount" + index).val()))) ? 0 : (total - parseFloat($("#ediscountamount" + index).val()))).toFixed(4));
                }
                else {
                    var totaldiscount = (response.data[0].disValue / 100) * total;

                    //$("#vatpercentage").val(response.data[0].vatValue / 100) * total;
                    // $("#ediscountamount" + index).val(isNaN(totaldiscount) ? 0 : totaldiscount.toFixed(4));

                    $("#etotalamount" + index).val(isNaN(total - totaldiscount) ? 0 : total - totaldiscount.toFixed(4));
                }
            });
        }

    }
});