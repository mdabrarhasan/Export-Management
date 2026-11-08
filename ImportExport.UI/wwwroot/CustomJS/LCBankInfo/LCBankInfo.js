var app = angular.module("App", ['angularUtils.directives.dirPagination']);

app.controller("Ctl", function ($scope, $window, $http, $timeout) {

    $scope.LoadData = function () {
        $http({
            method: "get",
            url: "/LCBankInfo/GetLCBankInfoAll"
        }).then(function (response) {
            $scope.BankInfoList = null;
            $scope.BankInfoList = response.data;
        });
    }



    $scope.GetInvoiceByLC = function (lcid, callback) {
        $http({
            method: "GET",
            url: "/LCBankInfo/GetInvoiceByLC",
            params: { lcid: lcid }
        }).then(function (response) {

            var allInvoices = response.data || [];
            var usedInvoiceIds = [];


            $scope.bankinvoiceid = "";
            $("#bankinvoiceid").val("");

            $scope.editInvoiceList = allInvoices;
            angular.forEach($scope.BankInfoList || [], function (item) {
                if (item.lcid == lcid) {
                    usedInvoiceIds.push(item.invoiceid.toString());
                }
            });
            $scope.invoiceList = allInvoices.filter(function (invoice) {
                return usedInvoiceIds.indexOf(invoice.id.toString()) === -1;
            });


            if (callback) {
                callback();
            }

        }, function (error) {
            $scope.invoiceList = [];
            $scope.editInvoiceList = [];

        });
    };


    $scope.LoadInvoice = function () {
        $http({
            method: "get",
            url: "/LCBankInfo/LoadInvoice"
        }).then(function (response) {
            $scope.BankInfoList = null;
            $scope.BankInfoList = response.data;
        });
    }



    $scope.GetFinancialCostRate = function () {
        $http({
            method: "GET",
            url: "/LCBankInfo/GetFinancialCostRate",
            params: { lcid: $("#txtLCNOID").val() }
        }).success(function (result) {

            if (result == null || result == "") {
                $("#txtFinancialCostRate").val(0);
            }
            else {
                $("#txtFinancialCostRate").val(result);
            }

        }).error(function () {
            $("#txtFinancialCostRate").val(0);
        });

    };





    $scope.LCNO = function () {
        $("#txtLCNo").autocomplete({
            source: function (request, response) {
                $.ajax({
                    url: '/LCBankInfo/LCNO/',
                    type: "Get",
                    dataType: "json",
                    data: { prefix: request.term },
                    success: function (data) {
                        response($.map(data, function (item) {
                            return { label: item.name, value: item.name, id: item.id, Name: item.name };
                        }));
                    }
                });
            },
            select: function (event, ui) {
                $("#txtLCNo").val(ui.item.Name);
                $("#txtLCNOID").val(ui.item.id);
                $scope.GetFinancialCostRate();
                $scope.GetInvoiceByLC(ui.item.id);
                return false;
            },
            minlength: 2
        });
    }


    $scope.LCNOEdit = function () {
        $("#etxtLCNo").autocomplete({
            source: function (request, response) {
                $.ajax({
                    url: '/LCBankInfo/LCNO/',
                    type: "Get",
                    dataType: "json",
                    data: { prefix: request.term },
                    success: function (data) {
                        response($.map(data, function (item) {
                            return { label: item.name, value: item.name, id: item.id, Name: item.name };
                        }));
                    }
                });
            },
            select: function (event, ui) {
                $("#etxtLCNo").val(ui.item.Name);
                $("#etxtLCNOID").val(ui.item.id);

                $scope.GetInvoiceByLC(ui.item.id);
                return false;
            },
            minlength: 2
        });
    }

    $scope.setInvoiceByText = function (invoiceNo, selectId) {
        if (!invoiceNo || !$scope.invoiceList || $scope.invoiceList.length === 0) {
            return;
        }

        var matched = $scope.invoiceList.find(function (item) {
            return (item.name || '').toString().trim().toLowerCase() === invoiceNo.toString().trim().toLowerCase();
        });

        if (matched) {
            $(selectId).val(matched.id).trigger('change');
            console.log("Matched invoice:", matched);
        } else {
            console.log("No invoice matched for:", invoiceNo);
            console.log("Invoice list:", $scope.invoiceList);
        }
    };

    $scope.EditMaster = function (list) {

        $scope.editId = list.id;

        $('#etxtLCNo').val(list.lcnumber);
        $('#etxtLCNOID').val(list.lcid);

        $('#etxtDocNegotiateDate').val(list.docnegotiatedate);
        $('#etxtBeneficiaryBankCost').val(list.beneficiarybankcost);
        $('#etxtCrossBankCharge').val(list.crossbankcharge);
        $('#etxtPaymentReceiveDate').val(list.paymentreceivedate);
        $('#etxtIdpBidBcNo').val(list.idpbidbcno);
        $('#etxtExchangeRate').val(list.exchangerate);
        $('#etxtBankAcceptance').val(list.bankacceptance);

        $('#etxtFinancialCostRate').val(list.financialcostrate || 0);
        $scope.editStatus = list.status || '';


        $scope.GetInvoiceByLC(list.lcid, function () {
            $timeout(function () {
                $scope.ebankinvoiceid = parseInt(list.invoiceid) || 0;
                $('#ebankinvoiceid').val(list.invoiceid).trigger('change');
            }, 100);
        });
    }

    $scope.ViewMaster = function (list) {
        var invoiceNo = list.invoiceno || list.INVOICENO || '';
        $('#vtxtLCNo').val(list.lcnumber);
        $('#vtxtInvoiceNo').val(invoiceNo);
        $('#vtxtDocNegotiateDate').val(list.docnegotiatedate);
        $('#vtxtBeneficiaryBankCost').val(list.beneficiarybankcost);
        $('#vtxtCrossBankCharge').val(list.crossbankcharge);
        $('#vtxtPaymentReceiveDate').val(list.paymentreceivedate);
        $('#vtxtIdpBidBcNo').val(list.idpbidbcno);
        $('#vtxtExchangeRate').val(list.exchangerate);
        $('#vtxtBankAcceptance').val(list.bankacceptance);

        $('#vtxtFinancialCostRate').val(list.financialcostrate || 0);
        $('#vtxtDiscrepancy').val(list.discrepancy || '');
        $('#vtxtBankend').val(list.bankend || '');


        if (!invoiceNo && (list.lcid || list.LCID)) {
            $scope.GetInvoiceByLC(list.lcid || list.LCID, function () {
                if ($scope.invoiceList && $scope.invoiceList.length > 0) {
                    $('#vtxtInvoiceNo').val($scope.invoiceList[0].name || '');
                }
            });
        }
    }








    $scope.Clear = function () {
        $('#txtLCNo').val('');
        $('#txtLCNOID').val('');
        $('#txtDocNegotiateDate').val('');
        $('#txtBeneficiaryBankCost').val('');
        $('#txtCrossBankCharge').val('');
        $('#txtPaymentReceiveDate').val('');
        $('#txtIdpBidBcNo').val('');

        $('#txtFinancialCostRate').val('0');
        $('#txtStatus').val('');

        $('#etxtID').val('');
        $('#etxtLCNo').val('');
        $('#etxtLCNOID').val('');
        $('#etxtDocNegotiateDate').val('');
        $('#etxtBeneficiaryBankCost').val('');
        $('#etxtCrossBankCharge').val('');
        $('#etxtPaymentReceiveDate').val('');
        $('#etxtIdpBidBcNo').val('');

        $('#etxtFinancialCostRate').val('');
        $('#etxtStatus').val('');
        $scope.editStatus = '';

        $('#ebankinvoiceid').val('');
        $('#vtxtLCNo').val('');
        $('#vtxtInvoiceNo').val('');
        $('#vtxtDocNegotiateDate').val('');
        $('#vtxtBeneficiaryBankCost').val('');
        $('#vtxtCrossBankCharge').val('');
        $('#vtxtPaymentReceiveDate').val('');
        $('#vtxtIdpBidBcNo').val('');
        
        $('#txtBankAcceptance').val('');

        $scope.invoiceList = [];

        $scope.editInvoiceList = [];
        $scope.ebankinvoiceid = null;

        $scope.selectedInvoice = null;
    }

    $scope.Save = function () {
        if (confirm('Are You Sure? You Want to Save this Record.') == true) {
            console.log($("#bankinvoiceid").val());
            var isAllValid = true;

            if ($("#txtLCNo").val().trim() == "") {
                isAllValid = false;
                $("#txtLCNo").siblings('span.error').css('visibility', 'visible');
            } else {
                $("#txtLCNo").siblings('span.error').css('visibility', 'hidden');
            }

            if ($("#bankinvoiceid").val().trim() == "") {
                isAllValid = false;
                $("#bankinvoiceid").siblings('span.error').css('visibility', 'visible');
            } else {
                $("#bankinvoiceid").siblings('span.error').css('visibility', 'hidden');
            }



            //if ($("#txtDocNegotiateDate").val().trim() == "") {
            //    isAllValid = false;
            //    $("#txtDocNegotiateDate").siblings('span.error').css('visibility', 'visible');
            //} else {
            //    $("#txtDocNegotiateDate").siblings('span.error').css('visibility', 'hidden');
            //}



            //if ($("#txtBeneficiaryBankCost").val().trim() == "") {
            //    isAllValid = false;
            //    $("#txtBeneficiaryBankCost").siblings('span.error').css('visibility', 'visible');
            //} else {
            //    $("#txtBeneficiaryBankCost").siblings('span.error').css('visibility', 'hidden');
            //}

            //if ($("#txtCrossBankCharge").val().trim() == "") {
            //    isAllValid = false;
            //    $("#txtCrossBankCharge").siblings('span.error').css('visibility', 'visible');
            //} else {
            //    $("#txtCrossBankCharge").siblings('span.error').css('visibility', 'hidden');
            //}

            //if ($("#txtPaymentReceiveDate").val().trim() == "") {
            //    isAllValid = false;
            //    $("#txtPaymentReceiveDate").siblings('span.error').css('visibility', 'visible');
            //} else {
            //    $("#txtPaymentReceiveDate").siblings('span.error').css('visibility', 'hidden');
            //}

            //if ($("#txtIdpBidBcNo").val().trim() == "") {
            //    isAllValid = false;
            //    $("#txtIdpBidBcNo").siblings('span.error').css('visibility', 'visible');
            //} else {
            //    $("#txtIdpBidBcNo").siblings('span.error').css('visibility', 'hidden');
            //}

            if (isAllValid) {
                var invoiceName = $('#bankinvoiceid option:selected').text().trim();
                var master = {
                    LCID: $("#txtLCNOID").val(),
                    INVOICEID: $('#bankinvoiceid').val(),
                    DOCNEGOTIATEDATE: $('#txtDocNegotiateDate').val(),
                    BENEFICIARYBANKCOST: $('#txtBeneficiaryBankCost').val(),
                    CROSSBANKCHARGE: $('#txtCrossBankCharge').val(),
                    PAYMENTRECEIVEDATE: $('#txtPaymentReceiveDate').val(),
                    IDPBIDBCNO: $('#txtIdpBidBcNo').val(),
                    BANKACCEPTANCE: $('#txtBankAcceptance').val(),
                    EXCHANGERATE: $('#txtExchangeRate').val(),
                    FINANCIALCOSTRATE: $('#txtFinancialCostRate').val() || 0,
                    STATUS: $('#txtStatus').val()
                }

                $.ajax({
                    type: 'POST',
                    url: '/LCBankInfo/Save',
                    dataType: "json",
                    data: { 'lcbankinfo': master },
                    success: function (result) {
                        notify("success", "Success Message", result);
                        $scope.Clear();
                        $scope.LoadData();
                        $("#savebutton").prop('disabled', false);
                    },
                    error: function (errormessage) {
                        notify('error', 'Error Message', errormessage.responseText);
                    }
                });
            }
        } else {
            $("#savebutton").prop('disabled', false);
        }
    }


    $scope.UpdateEdit = function () {
        if (confirm('Are You Sure? You Want to Update this Record.') == true) {

            var isAllValid = true;

            if ($("#etxtLCNo").val().trim() == "") {
                isAllValid = false;
                $("#etxtLCNo").siblings('span.error').css('visibility', 'visible');
            } else {
                $("#etxtLCNo").siblings('span.error').css('visibility', 'hidden');
            }

            if ($("#ebankinvoiceid").val().trim() == "") {
                isAllValid = false;
                $("#ebankinvoiceid").siblings('span.error').css('visibility', 'visible');
            } else {
                $("#ebankinvoiceid").siblings('span.error').css('visibility', 'hidden');
            }

            //if ($("#etxtDocNegotiateDate").val().trim() == "") {
            //    isAllValid = false;
            //    $("#etxtDocNegotiateDate").siblings('span.error').css('visibility', 'visible');
            //} else {
            //    $("#etxtDocNegotiateDate").siblings('span.error').css('visibility', 'hidden');
            //}

            //if ($("#etxtBeneficiaryBankCost").val().trim() == "") {
            //    isAllValid = false;
            //    $("#etxtBeneficiaryBankCost").siblings('span.error').css('visibility', 'visible');
            //} else {
            //    $("#etxtBeneficiaryBankCost").siblings('span.error').css('visibility', 'hidden');
            //}

            //if ($("#etxtCrossBankCharge").val().trim() == "") {
            //    isAllValid = false;
            //    $("#etxtCrossBankCharge").siblings('span.error').css('visibility', 'visible');
            //} else {
            //    $("#etxtCrossBankCharge").siblings('span.error').css('visibility', 'hidden');
            //}

            //if ($("#etxtPaymentReceiveDate").val().trim() == "") {
            //    isAllValid = false;
            //    $("#etxtPaymentReceiveDate").siblings('span.error').css('visibility', 'visible');
            //} else {
            //    $("#etxtPaymentReceiveDate").siblings('span.error').css('visibility', 'hidden');
            //}

            //if ($("#etxtIdpBidBcNo").val().trim() == "") {
            //    isAllValid = false;
            //    $("#etxtIdpBidBcNo").siblings('span.error').css('visibility', 'visible');
            //} else {
            //    $("#etxtIdpBidBcNo").siblings('span.error').css('visibility', 'hidden');
            //}

            if (isAllValid) {
                var invoiceName = $('#ebankinvoiceid option:selected').text().trim();


                var master = {
                    ID: $scope.editId,
                    LCID: $('#etxtLCNOID').val(),
                    INVOICEID: $('#ebankinvoiceid').val(),
                    DOCNEGOTIATEDATE: $('#etxtDocNegotiateDate').val(),
                    BENEFICIARYBANKCOST: $('#etxtBeneficiaryBankCost').val(),
                    CROSSBANKCHARGE: $('#etxtCrossBankCharge').val(),
                    PAYMENTRECEIVEDATE: $('#etxtPaymentReceiveDate').val(),
                    IDPBIDBCNO: $('#etxtIdpBidBcNo').val(),
                    BANKACCEPTANCE: $('#etxtBankAcceptance').val(),
                    EXCHANGERATE: $('#etxtExchangeRate').val(),
                    FINANCIALCOSTRATE: $('#etxtFinancialCostRate').val() || 0,
                    STATUS: $scope.editStatus
                }


                $.ajax({
                    type: 'POST',
                    url: '/LCBankInfo/Update',
                    dataType: "json",
                    data: { 'lcbankinfo': master },
                    success: function (result) {
                        notify("success", "Success Message", result);
                        $scope.Clear();
                        $scope.LoadData();
                        $('#EditexampleModalFullscreen').modal('hide');
                        $("#esavebutton").prop('disabled', false);
                    },
                    error: function (errormessage) {
                        notify('error', 'Error Message', errormessage.responseText);
                    }
                });
            }
        } else {
            $("#esavebutton").prop('disabled', false);
        }
    }

    $scope.DeleteMaster = function (id) {
        if (confirm('Are You Sure? You Want to Delete this Record.') == true) {
            $http({
                method: "POST",
                url: "/LCBankInfo/Delete",
                params: { id: id }
            }).then(function (response) {
                notify('error', 'Message', response.data);
                $scope.LoadData();
            });
        }
    }


    $scope.GetStatus = function () {
        $http({
            method: "get",
            url: "/LCBankInfo/GetStatus"
        }).then(function (response) {
            $scope.statusList = response.data || [];
        });
    }
    $scope.GetStatus();


});