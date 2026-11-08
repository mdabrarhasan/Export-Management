var app = angular.module("App", ["angularUtils.directives.dirPagination"]);

app.controller("Ctl", function ($scope, $window, $http) {
  $("#txtSCList").prop("disabled", false);
  $scope.PIList = function () {
    $http({
      method: "get",
      url: "/CombineSQ/GetAgreementLandingAll",
      params: { code: $scope.agreementtypeidsearch },
    }).then(function (response) {
      if ($scope.agreementtypeidsearch == "SC") {
        $scope.tbl_th_pi = "SC Number";
        $scope.tbl_th_pidate = "SC Date";
      }
      if ($scope.agreementtypeidsearch == "PI") {
        $scope.tbl_th_pi = "PI Number";
        $scope.tbl_th_pidate = "PI Date";
      }
      if ($scope.agreementtypeidsearch == "PITOSC") {
        $scope.tbl_th_pi = "PITOSC Number";
        $scope.tbl_th_pidate = "PITOSC Date";
      }
      $scope.PIlist = response.data;
      $scope.loading = false;
    });
  };

  $scope.AgreementType = function () {
    $http({
      method: "get",
      url: "/AgreementLanding/GetAgreementType",
    }).then(function (response) {
      $scope.Agreementtype = response.data;
    });
  };

  $scope.GetSalesQuotation = function (id) {
    $scope.ID = id;

    $http({
      method: "get",
      url: "/AgreementLanding/GetSalesQuotation",
      params: { id: $scope.ID },
    }).then(function (response) {
      $scope.quotationlist = response.data;
    });
  };

  $scope.SCTypeChange = function () {
    var mode = $("#sctypeid").val();
    if (mode === "2") {
      // "Add Existing One" requires at least 2 tags to be meaningful.
      if (selectedIds.length < 2) {
        notify("warning", "Message", "Please add minimum 2 tags");
        // Bounce the dropdown back to --Select-- so the field re-enables
        // automatically once the user adds a second tag.
        $scope.sctypeid = "";
        $("#sctypeid").val("");
        $("#txtExistingSC").prop("disabled", true);
        $("#txtExistingSC").val("");
        $("#textexistingscidhide").val("");
        existingScId = null;
        return;
      }
      // OK — enable the Existing SC field
      $("#txtExistingSC").prop("disabled", false);
    } else {
      // Any other mode → disable and clear
      $("#txtExistingSC").prop("disabled", true);
      $("#txtExistingSC").val("");
      $("#textexistingscidhide").val("");
      existingScId = null;
    }
  };

  let selectedIds = [];
  let selectedTags = [];
  let mergeClicked = false;
  let baselineScId = null;
  let existingScId = null;

  $scope.GetSCList = function () {
    //alert('CALL');
    $("#txtSCList").autocomplete({
      source: function (request, response) {
        $.ajax({
          url: "/CombineSQ/GetSCList/",
          type: "GET",
          dataType: "json",
          data: { prefix: request.term },
          success: function (data) {
            response(
              $.map(data, function (item) {
                return { label: item.name, id: item.id, name: item.name };
              }),
            );
          },
          error: function (xhr, status, error) {
            console.error("Error fetching SC list:", error);
          },
        });
      },
      select: function (event, ui) {
        if (!ui.item) return false;
        $("#txtSCList").val("");

        let itemId = ui.item.id;
        let itemName = ui.item.name;

        // Prevent duplicate tag
        if (selectedIds.includes(itemId)) {
          return false;
        }

        // Prevent picking an SC that's already set as the existing target
        if (existingScId !== null && itemId === existingScId) {
          notify(
            "warning",
            "Message",
            "This SC is already selected as the Existing Sales Contract",
          );
          return false;
        }

        // If this is the first SC, set it as baseline and add immediately
        if (selectedIds.length === 0) {
          selectedIds.push(itemId);
          selectedTags.push({ id: itemId, name: itemName });
          baselineScId = itemId;
          createHiddenTag(itemId, document.getElementById("tagContainer"));
          createVisibleTag(
            itemName,
            document.getElementById("tagContainername"),
          );
          $("#textsqidhide").val(itemId);
          $("#textpiidhide").val(itemId);
          mergeClicked = false;

          $scope.PopulateHeaderFromSC(itemId);
          return false;
        }

        // Subsequent SCs: validate against baseline before adding
        $http({
          method: "GET",
          url: "/CombineSQ/ValidateSCMatch",
          params: { baselineId: baselineScId, candidateId: itemId },
        }).then(
          function (response) {
            var result = response.data;
            if (result.matches) {
              selectedIds.push(itemId);
              selectedTags.push({ id: itemId, name: itemName });
              createHiddenTag(itemId, document.getElementById("tagContainer"));
              createVisibleTag(
                itemName,
                document.getElementById("tagContainername"),
              );
              $("#textsqidhide").val(itemId);
              $("#textpiidhide").val(itemId);
              mergeClicked = false;
            } else {
              var fields = result.mismatchedFields || [];
              var fieldList;
              if (fields.length === 1) {
                fieldList = fields[0];
              } else if (fields.length === 2) {
                fieldList = fields[0] + " and " + fields[1];
              } else {
                fieldList =
                  fields.slice(0, -1).join(", ") +
                  " and " +
                  fields[fields.length - 1];
              }
              notify(
                "error",
                "Cannot add " + itemName,
                fieldList + " didn't match",
              );
            }
          },
          function (err) {
            notify(
              "error",
              "Error",
              "Could not validate SC match. Please try again.",
            );
            console.error(err);
          },
        );

        return false;
      },
      minLength: 1,
    });
  };

  $scope.GetSCExisting = function () {
    $("#txtExistingSC").autocomplete({
      source: function (request, response) {
        // Suggestions come from the currently-tagged SCs only.
        // No server call — we already have {id, name} in selectedTags.
        var term = (request.term || "").toLowerCase();
        var matches = selectedTags
          .filter(function (t) {
            return t.name.toLowerCase().indexOf(term) !== -1;
          })
          .map(function (t) {
            return { label: t.name, id: t.id, name: t.name };
          });
        response(matches);
      },
      select: function (event, ui) {
        if (!ui.item) return false;

        // No match validation needed — the picked SC is already one of the
        // tagged SCs, which passed validation when added as a tag.
        $("#txtExistingSC").val(ui.item.name);
        $("#textexistingscidhide").val(ui.item.id);
        existingScId = ui.item.id;

        return false;
      },
      minLength: 1,
    });
  };

  $scope.CheckExistingSCFocus = function () {
    if (selectedIds.length === 0) {
      notify("warning", "Message", "select at least one sales contract");
      $("#txtExistingSC").blur();
    }
  };

  $scope.PopulateHeaderFromSC = function (scId) {
    $http({
      method: "GET",
      url: "/CombineSQ/GetSCHeader",
      params: { scId: scId },
    }).then(
      function (response) {
        var data = response.data;
        if (!data) return;

        // Existing fields
        $("#txtTariffCodehidden").val(data.unitid);
        $("#txtshipmentmodeid").val(data.shipmentmode);
        $("#txtFromshipmentcountryid").val(data.fromshipment);
        $("#txtToshipmentcountryid").val(data.toshipment);
        $("#Freetextshipid").val(data.destinationport);
        $("#txtcurrencyid").val(data.currency);
        $("#txtloadingport").val(data.loadingport);
        $("#loadingplace").val(data.loadingplace);
        $("#txtincotermid").val(parseInt(data.incoterm) || "");
        $("#txtpaymenttermid").val(data.textpayment);
        $("#txttransportmodeid").val(data.transportationmode);
        $("#txtTEXTDESTINATIONPORT").val(data.destinationport);
        $("#txtExpireDate").val(data.expiredate);

        // NEW fields - plain inputs
        $("#txtDate").val(data.date);
        $("#txtShipmentDate").val(data.shipmentdate);
        $("#txtOrderDate").val(data.buyerorderconfirmdate);
        $("#txtBuyerRegNo").val(data.buyerregno);
        $("#txtNotifyParty").val(data.notifyparty);
        $("#txtBuyerBank").val(data.buyerbankdetails);
        $("#termscon").val(data.termscondition);
        $("#description").val(data.descriptions);

        // NEW fields - selects (must update both DOM and ng-model)
        $("#sellerbankid").val(data.sellerbankid);
        $scope.sellerbankid = data.sellerbankid
          ? String(data.sellerbankid)
          : "";

        $("#txtpartialshipmentid").val(data.partialshipment);
        $scope.txtpartialshipmentid = data.partialshipment
          ? String(data.partialshipment)
          : "";

        $("#transhipmentid").val(data.transhipment);
        $scope.transhipmentid = data.transhipment
          ? String(data.transhipment)
          : "";

        $("#deliveryby").val(data.deliveryby);
        $scope.deliveryby = data.deliveryby ? String(data.deliveryby) : "";

        // Existing select bindings
        $scope.txtcurrencyid = String(data.currency);
        $scope.txtshipmentmodeid = String(data.shipmentmode);
        $scope.txtFromshipmentcountryid = String(data.fromshipment);
        $scope.txtloadingport = String(data.loadingport);
        $scope.txttransportmodeid = String(data.transportationmode);
        $scope.txtincotermid = String(parseInt(data.incoterm) || "");
        $scope.txtTEXTDESTINATIONPORT = data.destinationport;
        $scope.Freetextshipid = data.destinationport || "";
      },
      function (err) {
        console.error("Failed to load SC header:", err);
      },
    );
  };

  $scope.ClearHeaderFields = function () {
    // Existing
    $("#txtTariffCodehidden").val("");
    $("#txtshipmentmodeid").val("");
    $("#txtFromshipmentcountryid").val("");
    $("#txtToshipmentcountryid").val("");
    $("#Freetextshipid").val("");
    $("#txtcurrencyid").val("");
    $("#txtloadingport").val("");
    $("#loadingplace").val("");
    $("#txtincotermid").val("");
    $("#txtpaymenttermid").val("");
    $("#txttransportmodeid").val("");
    $("#txtTEXTDESTINATIONPORT").val("");
    $("#txtExpireDate").val("");

    // NEW
    $("#txtDate").val("");
    $("#txtShipmentDate").val("");
    $("#txtOrderDate").val("");
    $("#txtBuyerRegNo").val("");
    $("#txtNotifyParty").val("");
    $("#txtBuyerBank").val("");
    $("#termscon").val("");
    $("#description").val("");

    $scope.sellerbankid = "";
    $("#sellerbankid").val("");
    $scope.txtpartialshipmentid = "";
    $("#txtpartialshipmentid").val("");
    $scope.transhipmentid = "";
    $("#transhipmentid").val("");
    $scope.deliveryby = "";
    $("#deliveryby").val("");

    // Existing model resets
    $scope.txtcurrencyid = "";
    $scope.txtshipmentmodeid = "";
    $scope.txtFromshipmentcountryid = "";
    $scope.txtloadingport = "";
    $scope.txttransportmodeid = "";
    $scope.txtincotermid = "";
    $scope.txtTEXTDESTINATIONPORT = "";
    $scope.Freetextshipid = "";
  };

  $scope.GetSQ = function () {
    $("#txtSQ").autocomplete({
      source: function (request, response) {
        $.ajax({
          url: "/CombineSQ/GetSQ/",
          type: "GET",
          dataType: "json",
          data: { prefix: request.term },
          success: function (data) {
            response(
              $.map(data, function (item) {
                return { label: item.name, id: item.id, name: item.name };
              }),
            );
          },
          error: function (xhr, status, error) {
            console.error("Error fetching data:", error);
          },
        });
      },
      select: function (event, ui) {
        if (ui.item) {
          $("#txtSQ").val("");
          let itemId = ui.item.id;

          if (!selectedIds.includes(itemId)) {
            selectedIds.push(itemId);
            createHiddenTag(
              ui.item.id,
              document.getElementById("tagContainer"),
            );
            createVisibleTag(
              ui.item.name,
              document.getElementById("tagContainername"),
            );
            $("#txtSQ").val("");
            $("#textsqidhide").val(ui.item.id);
            $("#textpiidhide").val(ui.item.id);

            // Only auto-refresh after the user has clicked Merge at least once
            mergeClicked = false;
          } else {
          }

          $scope.GetSalesQuotationInsertionMode();
        } else {
        }
        return false;
      },
      minlength: 1,
    });
  };

  $scope.RefreshCombinedItems = function () {
    if (selectedIds.length === 0) {
      $scope.detailsbyid = null;
      $scope.$applyAsync();
      return;
    }

    var values = selectedIds.map(String);

    $http({
      method: "get",
      url: "/CombineSQ/GetCombineSQitem",
      params: { HS: values },
      paramsSerializer: function (params) {
        return params.HS.map((id) => "HS=" + encodeURIComponent(id)).join("&");
      },
    }).then(function (response) {
      console.log(response);
      $scope.detailsbyid = response.data;
    });
  };

  function createHiddenTag(value, container) {
    const hiddenTag = document.createElement("div");
    hiddenTag.classList.add("hidden-tag");
    hiddenTag.innerHTML = `<span hidden>${value}</span>`;
    container.appendChild(hiddenTag);
    updateTags(container);
  }

  function createVisibleTag(value, container) {
    const visibleTag = document.createElement("div");
    visibleTag.classList.add("tag");
    visibleTag.innerHTML = `${value} <button aria-label="Remove tag" tabindex="0">x</button>`;

    const removeButton = visibleTag.querySelector("button");
    removeButton.addEventListener("click", () => {
      const index = Array.from(container.children).indexOf(visibleTag);
      removeTagAtIndex(index);
    });

    container.appendChild(visibleTag);
  }

  function removeTagAtIndex(index) {
    const tagContainer = document.getElementById("tagContainer");
    const tagContainerName = document.getElementById("tagContainername");

    const wasFirst = index === 0;
    const removedId = selectedIds[index];

    if (tagContainer.children[index]) tagContainer.children[index].remove();
    if (tagContainerName.children[index])
      tagContainerName.children[index].remove();

    selectedIds.splice(index, 1);
    selectedTags.splice(index, 1);

    updateTags(tagContainer);

    // Re-baseline when the first tag is removed
    if (wasFirst) {
      if (selectedIds.length === 0) {
        baselineScId = null;
        $scope.ClearHeaderFields();

        // No sources left → reset the "Select Type" dropdown to --Select--,
        // which triggers SCTypeChange() to clear and disable the Existing SC field.
        $scope.sctypeid = "";
        $("#sctypeid").val("");
        $scope.SCTypeChange();
      } else {
        // The new first tag becomes the baseline. Its own fields are now the anchor.
        baselineScId = selectedIds[0];
        $scope.PopulateHeaderFromSC(baselineScId);
      }
    }

    if (
      existingScId !== null &&
      (removedId === existingScId || selectedIds.length < 2)
    ) {
      $("#txtExistingSC").val("");
      $("#textexistingscidhide").val("");
      $("#txtExistingSC").prop("disabled", true);
      existingScId = null;
      $scope.sctypeid = "";
      $("#sctypeid").val("");
    }

    if (mergeClicked) {
      if (selectedIds.length === 0) {
        mergeClicked = false;
        $scope.$apply(function () {
          $scope.detailsbyid = null;
        });
      } else {
        $scope.$apply(function () {
          $scope.RefreshCombinedItems();
        });
      }
    }
  }

  function updateTags(container) {
    const tags = container.querySelectorAll("span");
    const values = Array.from(tags).map((tag) => tag.textContent.trim());
    $scope.tags = values;
  }
  function clearAllTags(container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    updateTags(container);
  }
  $scope.GetHSCode = function (status, index) {
    if (status == 0) {
      $("#txtHSCode").autocomplete({
        source: function (request, response) {
          $.ajax({
            url: "/AgreementLanding/GetHSCode/",
            type: "Get",
            dataType: "json",
            data: { prefix: request.term },
            success: function (data) {
              response(
                $.map(data, function (item) {
                  return { label: item.name, id: item.id };
                }),
              );
            },
          });
        },
        select: function (event, ui) {
          $("#txtHSCode").val(ui.item.id);

          return false;
        },
        minlength: 1,
      });
    } else if (status == 1) {
      $("#hscodeline").autocomplete({
        source: function (request, response) {
          $.ajax({
            url: "/AgreementLanding/GetHSCode/",
            type: "Get",
            dataType: "json",
            data: { prefix: request.term },
            success: function (data) {
              response(
                $.map(data, function (item) {
                  return { label: item.name, id: item.id };
                }),
              );
            },
          });
        },
        select: function (event, ui) {
          $("#hscodeline").val(ui.item.id);

          return false;
        },
        minlength: 1,
      });
    } else {
      $("#hscodeline" + index).autocomplete({
        source: function (request, response) {
          $.ajax({
            url: "/AgreementLanding/GetHSCode/",
            type: "Get",
            dataType: "json",
            data: { prefix: request.term },
            success: function (data) {
              response(
                $.map(data, function (item) {
                  return { label: item.name, id: item.id };
                }),
              );
            },
          });
        },
        select: function (event, ui) {
          $("#hscodeline" + index).val(ui.item.id);
          return false;
        },
        minlength: 1,
      });
    }
  };
  $scope.GETLOADINGBY = function () {
    $http({
      method: "get",
      url: "/AgreementLanding/GETLOADINGBY",
    }).then(function (response) {
      $scope.deliverybylist = response.data;
    });
  };
  $scope.GetConfirm = function () {
    $http({
      method: "get",
      url: "/AgreementLanding/GetConfirm",
    }).then(function (response) {
      $scope.loadconfirm = response.data;
    });
  };
  $scope.SellerBankInfo = function (id) {
    $http({
      method: "get",
      url: "/AgreementLanding/GetBankInfo",
      params: { sqid: id },
    }).then(function (response) {
      $scope.sellerbanklist = response.data;
    });
  };
  $scope.GetIncoTerm = function () {
    $http({
      method: "get",
      url: "/AgreementLanding/GetIncoTerm",
    }).then(function (response) {
      $scope.incotermlist = response.data;
    });
  };
  function hasTags(container) {
    return container.childElementCount > 0;
  }
  $scope.GetSQItem = function () {
    var isAllValid = true;
    if ($("#agreementtypeid").val().trim() == "") {
      isAllValid = false;
      $("#agreementtypeid").siblings("span.error").css("visibility", "visible");
    } else {
      $("#agreementtypeid").siblings("span.error").css("visibility", "hidden");
    }
    if (!hasTags(document.getElementById("tagContainer"))) {
      isAllValid = false;
      $("#txtSQ").siblings("span.error").css("visibility", "visible");
    } else {
      $("#txtSQ").siblings("span.error").css("visibility", "hidden");
    }

    const tags = document.querySelectorAll(".hidden-tag");
    const values = Array.from(tags).map((tag) =>
      tag.textContent.replace("x", "").trim(),
    );
    let index = 0;
    let hscodeall = [];

    values.forEach((value) => {
      var data = {
        ID: value,
      };
      hscodeall.push(data);
      index++;
    });
    if (isAllValid) {
      var master = {
        //SALESQUOTATIONHEADERID: $("#sqidhidden").val(),
        SALESQUOTATIONHEADERID: $("#textsqidhide").val(),
        AGREEMENTTYPEID: $("#agreementtypeid").val(),
        DATE: $("#txtDate").val(),
        EXPIREDATE: $("#txtExpireDate").val(),
        SHIPMENTDATE: $("#txtShipmentDate").val(),
        SHIPMENTMODEID: $("#txtshipmentmodeid").val(),
        PAYMENTTERMID: 1,
        DELIVERYTERMID: $("#deliverytermid").val(),
        TERMSCONDITION: $("#termscon").val(),

        TOSHIPMENTCOUNTRYID: $("#txtToshipmentcountryid").val(),
        FROMSHIPMENTCOUNTRYID: $("#txtFromshipmentcountryid").val(),

        TEXTDESTINATIONPORT: $("#txtTEXTDESTINATIONPORT").val(),

        FROMSHIPMENTPORTID: $("#txtloadingport").val(),

        TARRIFCODE: $("#txtTariffCode").val(),
        BUYERREGNO: $("#txtBuyerRegNo").val(),
        HSCODE: $("#txtHSCode").val(),
        INTOTERM: 0,
        CURRENCYID: $("#txtcurrencyid").val(),
        DESCRIPTIONS: $("#description").val(),

        BUYERBANKDETAILS: $("#txtBuyerBank").val(),
        SELLERBANKID: $("#sellerbankid").val(),
        BUYERCOUNTRYHSCODE: $("#txtBuyerHSCode").val(),
        LOADINGPLACE: $("#loadingplace").val(),
        DELIVERYBY: $("#deliveryby").val(),
        TRANSHIPMENT: $("#transhipmentid").val(),
        PARTIALSHIPMENT: $("#txtpartialshipmentid").val(),
        ORIGINOFCOUNTRY: $("#txtOriginCountry").val(),
        BUYERORDERCONFIRMDATE: $("#txtOrderDate").val(),
        NOTIFYPARTY: $("#txtNotifyParty").val(),
        OTHERSPAYTERM: $("#txtPaytermothers").val(),
        UNITID: $("#txtTariffCodehidden").val(),
      };
      $.ajax({
        type: "POST",
        url: "/CombineSQ/GetSQItem",
        dataType: "json",
        data: { al: master, HS: hscodeall },
        success: function (result) {
          notify("success", "Success Messsage", result);

          $("#textpiidhide").val(parseInt(result, 10));
          $scope.tags = null;
          clearAllTags(document.getElementById("tagContainer"));
          clearAllTags(document.getElementById("tagContainername"));

          $("#txtSQ").prop("disabled", true);
        },
        error: function (errormessage) {
          notify("error", "Error Message", errormessage.responseText);
        },
      });
    }
  };

  $scope.GetCombineSQitem = function () {
    var values = selectedIds.map(String);

    if (values.length === 0) {
      $("#txtSQ").siblings("span.error").css("visibility", "visible");
      return;
    }

    //if (values.length < 2) {
    //    notify('warning', 'Message', 'Please add at least two tags to merge');
    //    return;
    //}
    $("#txtSQ").siblings("span.error").css("visibility", "hidden");

    // Mark merge as clicked so future tag add/remove auto-refreshes the items table
    mergeClicked = true;

    $http({
      method: "get",
      url: "/CombineSQ/GetCombineSQitem",
      params: { HS: values },
      paramsSerializer: function (params) {
        return params.HS.map((id) => "HS=" + encodeURIComponent(id)).join("&");
      },
    }).then(function (response) {
      $scope.detailsbyid = response.data;
    });
  };

  $scope.GetSalesQuotationInsertionMode = function () {
    var isvalid = true;
    if ($("#typeid").val() == "") {
      isvalid = false;
      $("#typeid").siblings("span.error").css("visibility", "visible");
    }

    if ($("#typeid").val() != "") {
      isvalid = true;
    }

    if (isvalid) {
      if ($("#typeid").val() == "1") {
        $http({
          method: "GET",
          url: "/AgreementLanding/GetSalesQuotationLine",
          params: { id: $("#textsqidhide").val(), alpha: "SQ" },
        }).success(function (result) {
          $("#txtTariffCodehidden").val(result[0].unitid);
          $("#txtshipmentmodeid").val(result[0].shipmentmode);
          $("#txtFromshipmentcountryid").val(result[0].fromshipment);
          $("#txtToshipmentcountryid").val(result[0].textfromshipment);
          $("#Freetextshipid").val(result[0].textfromshipment);
          $("#txtTEXTDESTINATIONPORT").val(result[0].textfromshipment);
          $("#txtcurrencyid").val(result[0].currency);
          $("#txtloadingport").val(result[0].loadingport);
          $("#loadingplace").val(result[0].loadingplace);
          $("#txtincotermid").val(parseInt(result[0].incoterm));
          $("#txtpaymenttermid").val(result[0].textpayment);
          $("#txttransportmodeid").val(result[0].transportationmode);
          $("#txtTEXTDESTINATIONPORT").val(result[0].destinationport);
        });
      }
    }
  };

  $("#checkboxAll").click(function () {
    let isChecked = this.checked;

    $("#editmycontainer input[name=checkmul]").prop("checked", isChecked);

    $(".checkItem").prop("checked", isChecked);
  });

  $scope.Save = function () {
    if (confirm("Are You Sure? You Want to Save this Record.") == true) {
      if (selectedIds.length < 2) {
        notify("error", "Validation", "A merge requires at least two tags");
        return;
      }

      var requiredFields = [
        ["#sctypeid", "Select Type (Create New SC or Add Existing One)"],
        ["#agreementtypeid", "Agreement Type"],
        ["#txtDate", "Select Date"],
        ["#txtShipmentDate", "Select Shipment Date"],
        ["#txtBuyerRegNo", "Type Buyer Order Reg. No"],
        ["#txtOrderDate", "Select Order Confirm Date"],
        ["#txtNotifyParty", "Type Notify Party"],
        //['#txtBuyerBank', 'Type Buyer Bank'],
        ["#txtpartialshipmentid", "Select Partial Shipment"],
        ["#sellerbankid", "Select Seller Bank"],
        ["#transhipmentid", "Select Trans-shipment"],
        ["#deliveryby", "Select Delivery By"],
      ];

      for (var i = 0; i < requiredFields.length; i++) {
        var sel = requiredFields[i][0];
        var label = requiredFields[i][1];
        var val = $(sel).val();
        // Treat empty, undefined, "0", and AngularJS placeholder as missing.
        if (!val || val === "0" || val.toString().indexOf("? ") === 0) {
          notify("error", "Validation", "Please fill: " + label);
          return;
        }
      }

      var Details = [];
      //var SourceLineIds = [];
      var MergeSourceLines = [];

      var isAllValid = true;

      function safeIntVal(selector) {
        var v = $(selector).val();
        if (!v) return 0;
        if (v.toString().indexOf("? ") === 0) return 0;
        return v;
      }

      var master = {
        SALESQUOTATIONHEADERID: $("#textsqidhide").val(),
        AGREEMENTTYPEID: $("#agreementtypeid").val(),
        DATE: $("#txtDate").val(),
        EXPIREDATE: $("#txtExpireDate").val(),
        SHIPMENTDATE: $("#txtShipmentDate").val(),
        SHIPMENTMODEID: safeIntVal("#txtshipmentmodeid"),
        PAYMENTTERMID: 1,
        DELIVERYTERMID: $("#deliverytermid").val(),
        TERMSCONDITION: $("#termscon").val(),

        TOSHIPMENTCOUNTRYID: safeIntVal("#txtToshipmentcountryid"),
        FROMSHIPMENTCOUNTRYID: safeIntVal("#txtFromshipmentcountryid"),

        TEXTDESTINATIONPORT: $("#txtTEXTDESTINATIONPORT").val(),

        FROMSHIPMENTPORTID: safeIntVal("#txtloadingport"),

        TARRIFCODE: $("#txtTariffCode").val(),
        BUYERREGNO: $("#txtBuyerRegNo").val(),
        HSCODE: $("#txtHSCode").val(),
        INTOTERM: safeIntVal("#txtincotermid"),
        CURRENCYID: safeIntVal("#txtcurrencyid"),
        DESCRIPTIONS: $("#description").val(),

        BUYERBANKDETAILS: $("#txtBuyerBank").val(),
        SELLERBANKID: safeIntVal("#sellerbankid"),
        BUYERCOUNTRYHSCODE: $("#txtBuyerHSCode").val(),
        LOADINGPLACE: $("#loadingplace").val(),
        DELIVERYBY: safeIntVal("#deliveryby"),
        TRANSHIPMENT: safeIntVal("#transhipmentid"),
        PARTIALSHIPMENT: safeIntVal("#txtpartialshipmentid"),
        ORIGINOFCOUNTRY: $("#txtOriginCountry").val(),
        BUYERORDERCONFIRMDATE: $("#txtOrderDate").val(),
        NOTIFYPARTY: $("#txtNotifyParty").val(),
        OTHERSPAYTERM: $("#txtPaytermothers").val(),
        UNITID: $("#txtTariffCodehidden").val(),
      };

      $("input[name='checkmul']:checked").each(function () {
        var serialNumber = $(this).closest("tr").find("#checklist").val();
        serialNumber = serialNumber - 1;
        console.log(
          "hscodeline val:",
          $("#hscodeline" + serialNumber).val(),
          "quantity val:",
          $("#quantity" + serialNumber).val(),
          "unitprice val:",
          $("#unitprice" + serialNumber).val(),
        );
        if (
          $("#hscodeline" + serialNumber).val() == "" ||
          $("#quantity" + serialNumber).val() == "" ||
          $("#quantity" + serialNumber).val() == "0"
        ) {
          isAllValid = false;
          if ($("#hscodeline" + serialNumber).val() == "") {
            $("#hscodeline" + serialNumber)
              .siblings("span.error")
              .css("visibility", "visible");
          }
          if (
            $("#quantity" + serialNumber).val() == "" ||
            $("#quantity" + serialNumber).val() == "0"
          ) {
            $("#quantity" + serialNumber)
              .siblings("span.error")
              .css("visibility", "visible");
          }
        } else {
          $("#hscodeline" + serialNumber)
            .siblings("span.error")
            .css("visibility", "hidden");

          let ok = $("#unitprice" + serialNumber).val();

          if ($("#unitprice" + serialNumber).val() == 0) {
            isAllValid = false;
            $("#unitprice" + serialNumber)
              .siblings("span.error")
              .css("visibility", "visible");
          } else {
            if ($("#sctypeid").val() === "2") {
              var rowSourceId =
                parseInt($("#sourcescid" + serialNumber).val()) || 0;
              var targetId = parseInt($("#textexistingscidhide").val()) || 0;
              if (rowSourceId === targetId) {
                return;
              }
            }
            var rowObj = $scope.detailsbyid[serialNumber] || {};

            var details = {
              ITEMID: $("#itemcode" + serialNumber).val(),
              ITEMTYPEID: rowObj.itemtypeid || 0,
              UOMID: rowObj.uomid || 0,
              SIZE: rowObj.size || "",
              CONSTRUCTION: rowObj.construction || "",
              WEIGHT: rowObj.weight || "",
              SLIT: rowObj.slit || "",
              SCRIM: rowObj.scrim || "",
              QUALITY: rowObj.quality || "",
              ITEMTITLE: rowObj.itemtitle || "",
              PACKINGDETAILS: rowObj.packingdetails || "",
              HSCODE: $("#hscodeline" + serialNumber).val(),
              QUANTITY: parseFloat($("#quantity" + serialNumber).val()),
              PRICE: parseFloat($("#unitprice" + serialNumber).val()),
              VATID: parseInt($("#sqheaderid" + serialNumber).val()),
              VATAMOUNT: parseFloat($("#vatamount" + serialNumber).val()),
              //DISCOUNTID: parseInt($("#hdiscountid" + serialNumber).val() == undefined ? $("#discountid" + serialNumber).val() : $("#hdiscountid" + serialNumber).val()),
              DISCOUNTID: parseInt(rowObj.discountid) || 0,
              DISCOUNT: parseFloat($("#discountamount" + serialNumber).val()),
              TOTALAMOUNT: parseFloat($("#totalamount" + serialNumber).val()),
              TOLERANCEID: parseInt($("#toleranceid" + serialNumber).val()),
              DESCRIPTIONS: $("#shortdetails" + serialNumber).val(),
              REMARKS: $("#remarks" + serialNumber).val(),
              FROMSHIPMENTSCHEDULEDATE: $(
                "#lifromshipmentscdate" + serialNumber,
              ).val(),
              TOSHIPMENTSCHEDULEDATE: $(
                "#litoshipmentscdate" + serialNumber,
              ).val(),
              SHIPMENTMARK: $("#txtShippingMark" + serialNumber).val(),
            };
            Details.push(details);
            //SourceLineIds.push(parseInt(rowObj.id) || 0);
            MergeSourceLines.push({
              sourceLineId: parseInt(rowObj.id) || 0,
              mergedQty: details.QUANTITY,
            });
          }
        }
      });
      if (Details.length == 0) {
        isAllValid = false;
        notify("error", "Message", "Check Atleast One Item");
      }

      if (isAllValid) {
        var payload = {
          id: parseInt($("#textpiidhide").val()) || 0,
          scid: parseInt($("#textexistingscidhide").val()) || 0,
          sctypeid: parseInt($("#sctypeid").val()) || 0,
          sourceScIds: selectedIds,
          //sourceLineIds: SourceLineIds,
          mergeSourceLines: MergeSourceLines,
          al: master,
          ald: Details,
        };

        $.ajax({
          type: "POST",
          url: "/CombineSQ/Save",
          contentType: "application/json",
          dataType: "json",
          data: JSON.stringify(payload),
          success: function (result) {
            notify("success", "Success Messsage", result);

            $scope.PIList();
            $scope.GetSalesQuotation();
            $scope.Clear();
            $scope.detailsbyid = null;
            var rowCount = editmycontainer.rows.length;
            for (var i = rowCount - 1; i > 0; i--) {
              editmycontainer.deleteRow(i);
            }
            $("#savebutton").prop("disabled", true);
          },
          error: function (errormessage) {
            notify("error", "Error Message", errormessage.responseText);
          },
        });
      }
    } else {
    }
  };
  $scope.DeleteByLineID = function (lineid) {
    $scope.id = lineid;
    $scope.aggtypeid = $("#eagreementtypeid").val();
    $scope.headerid = $("#eagreementid").val();
    if (confirm("Are You Sure? You Want to Delete this Record.") == true) {
      $http({
        method: "POST",
        url: "/AgreementLanding/DeleteByLineByID",
        params: { id: lineid, aggtypeid: $scope.aggtypeid },
      }).then(function (response) {
        $scope.EditbyDetailsID($scope.headerid);
        notify("success", "Message", response.data);
      });
    } else {
    }
  };

  $scope.DeleteMaster = function (lineid, aggtypeid) {
    if (confirm("Are You Sure? You Want to Delete this Record.") == true) {
      $http({
        method: "POST",
        url: "/AgreementLanding/DeleteMasterByID",
        params: { id: lineid, aggtypeid: aggtypeid },
      }).then(function (response) {
        $scope.PIList();
        notify("success", "Message", response.data);
      });
    } else {
    }
  };

  $scope.EditbyDetailsID = function (id) {
    $scope.ID = id;
    $http({
      method: "GET",
      url: "/CombineSQ/GetAgreementLine",
      params: { id: $scope.ID },
    }).success(function (result) {
      $scope.edetailsbyid = result;
    });
  };

  $scope.EditbyMasterID = function (ID, sqnumber) {
    $scope.ID = ID;
    $("#editsqnumber").val(sqnumber);

    $http({
      method: "GET",
      url: "/CombineSQ/EditByMasterID",
      params: { id: $scope.ID },
    }).success(function (data) {
      if (!data || data.length === 0) return;
      var d = data[0];

      // Identity
      $("#eagreementid").val(d.agreementid);

      // "Select Sales Contract" — show the SC's own NUMBER (PINUMBER)
      $("#esqid").val(d.pinumber);
      $("#eesqid").val(d.agreementid);

      // Agreement Type — DOM + ng-model (dropdown is keyed on CODE)
      $("#eagreementtypeid").val(d.agreementtypeid);
      $scope.eagreementtypeid = d.agreementtypeid || "";

      // Dates (yyyy-MM-dd from SP)
      $("#etxtDate").val(d.pidate);
      $("#etxtExpireDate").val(d.piexpiredate);
      $("#etxtShipmentDate").val(d.shipmentdate);
      $("#etxtOrderDate").val(d.buyerorderconfirmdate);

      // Plain text fields
      $("#etxtTariffCode").val(d.tarrifcode);
      $("#txtTariffCodehidden").val(d.unitid);
      $scope.GetUOMList(d.unitid);
      //$("#txtFreeText").val(d.textfromshipment);
      $("#txtFreeText").val(
        d.textdestinationport || d.destinationport || d.toshipmentcountry || "",
      );
      $("#etxtHSCode").val(d.hscode);
      $("#etxtBuyerRegNo").val(d.buyerregno);
      $("#etxtBuyerBank").val(d.buyerbankdetails);
      $("#etxtBuyerHSCode").val(d.buyercountryhscode);
      $("#etxtOriginCountry").val(d.originofcountry);
      $("#etxtNotifyParty").val(d.notifyparty);
      $("#etxtPaytermothers").val(d.otherspayterm);
      $("#etermscon").val(d.termscondition);
      $("#edescription").val(d.descriptions);

      // Selects — DOM + ng-model
      var setSelect = function (id, scopeKey, value) {
        var v =
          value === null || value === undefined || value === 0
            ? ""
            : String(value);
        $("#" + id).val(v);
        $scope[scopeKey] = v;
      };

      setSelect("etxtshipmentmodeid", "etxtshipmentmodeid", d.shipmentmodeid);
      setSelect(
        "etxtFromshipmentcountryid",
        "etxtFromshipmentcountryid",
        d.fromshipmentcountryid,
      );
      setSelect("etxtloadingport", "etxtloadingport", d.fromshipmentportid);
      setSelect(
        "etxtdischargeloadingport",
        "etxtdischargeloadingport",
        d.toshipmentportid,
      );
      setSelect("etxtcurrencyid", "etxtcurrencyid", d.currencyid);
      setSelect("etxtpaymenttermid", "etxtpaymenttermid", d.paymenttermid);
      setSelect("etxtincotermid", "etxtincotermid", d.incoid);
      setSelect("etranshipmentid", "etranshipmentid", d.transhipment);
      setSelect(
        "etxtpartialshipmentid",
        "etxtpartialshipmentid",
        d.partialshipment,
      );
      setSelect("esellerbankid", "esellerbankid", d.sellerbankid);
      setSelect("etxttransportmodeid", "etxttransportmodeid", d.shipmentmodeid); // SP doesn't return TRANSPORTATIONMODE separately

      // Render source SC tags (read-only)
      $scope.RenderEditSourceTags(d.sourcescs);
    });

    $scope.EditbyDetailsID($scope.ID);
  };

  $scope.RenderEditSourceTags = function (sourcescs) {
    var container = document.getElementById("eTagContainer");
    if (!container) return;

    while (container.firstChild) container.removeChild(container.firstChild);

    $scope.eHasMergedSources = !!(sourcescs && sourcescs.length > 0); // NEW

    if (!sourcescs) return;

    var parts = sourcescs.split(",");
    parts.forEach(function (p) {
      var bits = p.split("|");
      var name = bits[1] || bits[0];
      var tag = document.createElement("div");
      tag.className = "tag";
      tag.style.cursor = "default";
      tag.textContent = name;
      container.appendChild(tag);
    });
  };

  //$scope.EditbyMasterID = function (ID, sqnumber) {
  //    $scope.ID = ID;
  //    $("#editsqnumber").val(sqnumber);

  //    $http({
  //        method: "GET",
  //        url: '/CombineSQ/EditByMasterID',
  //        params: { id: $scope.ID }
  //    }).success(function (data) {

  //        $("#eagreementid").val(data[0].agreementid)
  //        $("#esqid").val(data[0].salesquotationheaderid);
  //        $("#eesqid").val(data[0].salesquotationheaderid);
  //        $("#eagreementtypeid").val(data[0].agreementtypeid);
  //        $("#etxtDate").val(data[0].pidate);
  //        $("#etxtExpireDate").val(data[0].piexpiredate);
  //        $("#etxtTariffCode").val(data[0].tarrifcode);
  //        $("#txtTariffCodehidden").val(data[0].unitid);

  //        $("#txtFreeText").val(data[0].textfromshipment);

  //        $("#etxtshipmentmodeid").val(data[0].shipmentmodeid);
  //        $("#etxtFromshipmentcountryid").val(data[0].fromshipmentcountryid);
  //        $("#etxtToshipmentcountryid").val(data[0].toshipmentcountryid);
  //        $("#txtFreetextship").val(data[0].freetext);
  //        $("#etxtShipmentDate").val(data[0].shipmentdate);
  //        $("#etxtloadingport").val(data[0].fromshipmentportid);
  //        $("#etxtdischargeloadingport").val(data[0].toshipmentportid);
  //        $("#etxtHSCode").val(data[0].hscode);

  //        $("#etxtBuyerRegNo").val(data[0].buyerregno);
  //        $("#etxttransportmodeid").val(data[0].transhipment);
  //        $("#etxtcurrencyid").val(data[0].currencyid);
  //        $("#etxtpaymenttermid").val(data[0].paymenttermid);
  //        $("#edeliverytermid").val(data[0].deliverytermid);
  //        $("#etxtincotermid").val(data[0].incoid);
  //        $("#etermscon").val(data[0].termscondition);
  //        $("#edescription").val(data[0].descriptions);

  //        $("#etxtBuyerBank").val(data[0].buyerbankdetails),
  //            $("#esellerbankid").val(data[0].sellerbankid),
  //            $("#etxtBuyerHSCode").val(data[0].buyercountryhscode),
  //            $("#etranshipmentid").val(data[0].transhipment),
  //            $("#etxtpartialshipmentid").val(data[0].partialshipment),
  //            $("#etxtOriginCountry").val(data[0].originofcountry),
  //            $("#etxtOrderDate").val(data[0].buyerorderconfirmdate),
  //            $("#etxtNotifyParty").val(data[0].notifyparty),
  //            $("#etxtPaytermothers").val(data[0].otherspayterm)

  //    });

  //    $scope.EditbyDetailsID($scope.ID);
  //};
  $scope.ClearLine = function () {
    $("#name").val("");
    $("#itemcode").val(0);
    $("#uom").val("");
    $("#hscodeline").val("");
    $("#quantity").val(0);
    $("#unitprice").val(0);
    $("#vatid").val("");
    $("#vatamount").val(0);
    $("#discountid").val("");
    $("#discountamount").val(0);
    $("#totalamount").val(0);
    $("#fromshipmentscdate").val("");
    $("#toshipmentscdate").val("");

    $("#ename").val("");
    $("#eitemcode").val(0);
    $("#euom").val("");
    $("#ehscodeline").val("");
    $("#equantity").val(0);
    $("#eunitprice").val(0);
    $("#evatid").val("");
    $("#evatamount").val(0);
    $("#ediscountid").val("");
    $("#ediscountamount").val(0);
    $("#etotalamount").val(0);
    $("#efromshipmentscdate").val("");
    $("#etoshipmentscdate").val("");

    $("#remarks").val("");
    $("#shortdetails").val("");
    $("#eremarks").val("");
    $("#eshortdetails").val("");
    $("#toleranceid").val("");
  };

  $scope.Clear = function () {
    $(".error").css("visibility", "hidden");
    mergeClicked = false;
    baselineScId = null;
    existingScId = null;
    selectedIds = [];
    selectedTags = [];
    clearAllTags(document.getElementById("tagContainer"));
    clearAllTags(document.getElementById("tagContainername"));
    $("#txtExistingSC").val("");
    $("#textexistingscidhide").val("");
    $("#txtExistingSC").prop("disabled", true);
    /*for save item clear*/
    $("#txtDate").val("");
    $("#txtSCList").val("");
    $("#textsqidhide").val("");

    $("#txtOrderDate").val("");
    $("#txtNotifyParty").val("");
    $("#txtpartialshipmentid").val("");
    $("#transhipmentid").val("");
    $("#sellerbankid").val("");
    $("#txtBuyerHSCode").val("");

    $("#txtPaytermothers").val("");
    $("#txtBuyerBank").val("");

    $("#sqid").val("");
    $("#agreementtypeid").val("");
    $("#cusname").val("");
    $("#txtExpireDate").val("");

    $("#txtTariffCode").val("");
    $("#txtshipmentmodeid").val("");
    $("#txtToshipmentcountryid").val("");
    $("#txtFromshipmentcountryid").val("");
    $("#txtShipmentDate").val("");
    $("#txtloadingport").val("");
    $("#txtdischargeloadingport").val("");
    $("#txtHSCode").val("");

    $("#txtBuyerRegNo").val("");
    $("#txttransportmodeid").val("");
    $("#txtcurrencyid").val(0);
    $("#txtpaymenttermid").val("");

    $("#deliverytermid").val(0);
    $("#txtincotermid").val(0);
    $("#termscon").val("");
    $("#description").val("");
    $scope.detailsbyid = null;
    $scope.ClearLine();
    /*end save item clear*/
  };

  //$scope.ViewByMasterID = function (ID, aggtypeid) {

  //    $("#vSINO").text('');
  //    $("#vFileName").text("");

  //    toggleDownloadButton();

  //    $scope.ID = ID;
  //    $http({
  //        method: "GET",
  //        url: '/CombineSQ/ViewByMasterID',
  //        params: { id: $scope.ID }
  //    }).success(function (data) {

  //        $scope.masterdata = data;
  //        var PROCESSCODE = data[0].pinumber;

  //        $http({
  //            method: "GET",
  //            url: '/SalesQuatationLanding/GetFileDetails',
  //            params: { prefix: PROCESSCODE }
  //        }).success(function (data) {

  //            GetUploadFileUsingAPI(PROCESSCODE,);

  //        })

  //    });
  //    $scope.ViewByDetailsID(ID);
  //    $scope.LoadDocument(ID);
  //    $scope.ViewLoadDocumentStatus(ID, aggtypeid);
  //};

  $scope.ViewByMasterID = function (ID, aggtypeid) {
    $("#vSINO").text("");
    $("#vFileName").text("");
    toggleDownloadButton();

    $scope.ID = ID;
    $http({
      method: "GET",
      url: "/CombineSQ/ViewByMasterID",
      params: { id: $scope.ID },
    }).success(function (data) {
      $scope.masterdata = data;

      // NEW: render merged source tags
      if (data && data.length > 0) {
        $scope.RenderViewSourceTags(data[0].sourcescs);
      }

      var PROCESSCODE = data[0].pinumber;
      $http({
        method: "GET",
        url: "/SalesQuatationLanding/GetFileDetails",
        params: { prefix: PROCESSCODE },
      }).success(function (data) {
        GetUploadFileUsingAPI(PROCESSCODE);
      });
    });
    $scope.ViewByDetailsID(ID);
    $scope.LoadDocument(ID);
    $scope.ViewLoadDocumentStatus(ID, aggtypeid);
  };

  $scope.RenderViewSourceTags = function (sourcescs) {
    var container = document.getElementById("vTagContainer");
    if (!container) return;

    while (container.firstChild) container.removeChild(container.firstChild);

    $scope.vHasMergedSources = !!(sourcescs && sourcescs.length > 0);

    if (!sourcescs) return;

    var parts = sourcescs.split(",");
    parts.forEach(function (p) {
      var bits = p.split("|");
      var name = bits[1] || bits[0];
      var tag = document.createElement("div");
      tag.className = "tag";
      tag.style.cursor = "default";
      tag.textContent = name;
      container.appendChild(tag);
    });
  };

  $scope.ViewByDetailsID = function (ID) {
    $scope.ID = ID;
    $http({
      method: "GET",
      url: "/AgreementApproval/ViewByDetailsID",
      params: { id: $scope.ID },
    }).success(function (result) {
      $scope.detailsbyid = result;
    });
  };

  $scope.LoadDocument = function (ID) {
    $scope.ID = ID;
    $http({
      method: "GET",
      url: "/SalesQuatationApproval/LoadDocument",
      params: { id: $scope.ID },
    }).success(function (result) {
      $scope.imageitem = result;
    });
  };

  $scope.ViewLoadDocument = function (ID) {
    $scope.ID = ID;
    $http({
      method: "GET",
      url: "/SalesQuatationApproval/LoadDocument",
      params: { id: $scope.ID },
    }).success(function (result) {
      $scope.imageitem = result;
    });
  };

  $scope.ViewLoadDocumentStatus = function (ID, agreementtypeid) {
    $scope.ID = ID;
    $http({
      method: "GET",
      url: "/AgreementLanding/GetDocStatus",
      params: { id: $scope.ID, aggcode: agreementtypeid },
    }).success(function (result) {
      $scope.docstatusview = result;
    });
  };
  $scope.GetShipmentMode = function () {
    $http({
      method: "get",
      url: "/AgreementLanding/GetShipmentMode",
    }).then(function (response) {
      $scope.shipmentmodelist = response.data;
    });
  };

  $scope.GetTransportationMode = function () {
    $http({
      method: "get",
      url: "/AgreementLanding/GetTransportationMode",
    }).then(function (response) {
      $scope.transportationmode = response.data;
    });
  };

  $scope.GetCurrency = function () {
    $http({
      method: "get",
      url: "/AgreementLanding/GetCurrency",
    }).then(function (response) {
      $scope.currencylist = response.data;
    });
  };

  $scope.GetShipmentCountry = function () {
    $http({
      method: "get",
      url: "/AgreementLanding/GetShipmentCountry",
    }).then(function (response) {
      $scope.shipmentcountrylist = response.data;
    });
  };

  $scope.GetDelTerm = function () {
    $http({
      method: "get",
      url: "/AgreementLanding/GetDelTerm",
    }).then(function (response) {
      $scope.deltermlist = response.data;
    });
  };

  $scope.GetPaymentTerm = function () {
    $http({
      method: "get",
      url: "/AgreementLanding/GetPaymentTerm",
    }).then(function (response) {
      $scope.paymenttermlist = response.data;
    });
  };

  $scope.GetLoadingport = function () {
    $http({
      method: "get",
      url: "/AgreementLanding/GetLoadingport",
    }).then(function (response) {
      $scope.loadingportlist = response.data;
    });
  };
  $scope.SellerBankInfo = function (id) {
    $http({
      method: "get",
      url: "/AgreementLanding/GetBankInfo",
      params: { sqid: id },
    }).then(function (response) {
      $scope.sellerbanklist = response.data;
    });
  };

  $scope.Dislist = function () {
    $http({
      method: "get",
      url: "/SalesQuatationLanding/GetDiscountDetails",
    }).then(function (response) {
      $scope.Dislist = response.data;
    });
  };

  $scope.ToleranceList = function () {
    $http({
      method: "get",
      url: "/Common/GetTolarance",
    }).then(function (response) {
      $scope.tollist = response.data;
    });
  };

  $scope.VatCal = function () {
    if ($("#vatid").val() == "") {
      $("#vatamount").prop("disabled", true);
      $("#vatamount").val(0);
    } else {
      $http({
        method: "get",
        url: "/SalesQuatationLanding/GetVatCal",
        params: { id: $scope.VatID },
      }).then(function (response) {
        var total =
          parseFloat($("#quantity").val()) * parseFloat($("#unitprice").val());

        if (response.data[0].code === "WV") {
          $("#vatamount").prop("disabled", false);
          $("#vatamount").val(0);
        } else {
          $("#vatamount").attr("disabled", "disabled");
          var vatamount = total * (response.data[0].vatValue / 100);
          var totalvatamount = vatamount;
          $("#vatamount").val(
            isNaN(vatamount.toFixed(4)) ? 0 : vatamount.toFixed(4),
          );

          var vat_dis =
            total + totalvatamount + parseFloat($("#discountamount").val());

          $("#totalamount").val(
            isNaN(vat_dis.toFixed(4)) ? 0 : vat_dis.toFixed(4),
          );
        }
      });
    }
  };

  $scope.EditVatCal = function () {
    if ($("#evatid").val() == "") {
      $("#evatamount").prop("disabled", true);
      $("#evatamount").val(0);
      var total =
        parseFloat($("#equantity").val()) * parseFloat($("#eunitprice").val());
      $("#etotalamount").val(isNaN(total.toFixed(4)) ? 0 : total.toFixed(4));
    } else {
      $http({
        method: "get",
        url: "/SalesQuatationLanding/GetVatCal",
        params: { id: $scope.eVatID },
      }).then(function (response) {
        var total =
          parseFloat($("#equantity").val()) *
          parseFloat($("#eunitprice").val());

        if (response.data[0].code === "WV") {
          $("#evatamount").prop("disabled", false);
          $("#evatamount").val(0);
        } else {
          $("#evatamount").attr("disabled", "disabled");
          var vatamount = total * (response.data[0].vatValue / 100);
          var totalvatamount = vatamount;
          $("#evatamount").val(
            isNaN(vatamount.toFixed(4)) ? 0 : vatamount.toFixed(4),
          );

          var vat_dis =
            total + totalvatamount + parseFloat($("#ediscountamount").val());

          $("#etotalamount").val(
            isNaN(vat_dis.toFixed(4)) ? 0 : vat_dis.toFixed(4),
          );
        }
      });
    }
  };

  $scope.Calculate = function () {
    $scope.DiscountPercentageCalculate();
  };
  $scope.CalculateLine = function (index, id, qty) {
    $scope.QuantityValidation(index, qty);
    $scope.DiscountPercentageCalculateLine(index, id);
  };

  $scope.EditCalculate = function () {
    $scope.EDiscountPercentageCalculate();
  };
  $scope.EditCalculateLine = function (index, id, qty) {
    $scope.QuantityValidation(index, qty);
    $scope.EDiscountPercentageCalculateLine(index, id);
  };
  $scope.QuantityValidation = function (index, qty) {
    if (parseFloat($("#equantity" + index).val()) > parseFloat(qty)) {
      $("#equantity" + index).val(qty);
    }

    if (parseFloat($("#quantity" + index).val()) > parseFloat(qty)) {
      $("#quantity" + index).val(qty);
    }
  };
  $scope.DiscountPercentageCalculate = function () {
    $http({
      method: "get",
      url: "/SalesQuatationLanding/GetDisCal",
      params: { id: $scope.DiscountID },
    }).then(function (response) {
      var total =
        parseFloat($("#quantity").val()) * parseFloat($("#unitprice").val());
      if (response.data[0] === undefined) {
        $("#totalamount").val(
          (isNaN(total + parseFloat($("#vatamount").val()))
            ? 0
            : total + parseFloat($("#vatamount").val())
          ).toFixed(4),
        );
      } else if (response.data[0].code === "WD") {
        $("#totalamount").val(
          (isNaN(total - parseFloat($("#discountamount").val()))
            ? 0
            : total - parseFloat($("#discountamount").val())
          ).toFixed(4),
        );
      } else {
        var totaldiscount = (response.data[0].disValue / 100) * total;

        $("#discountamount").val(
          isNaN(totaldiscount.toFixed(4)) ? 0 : totaldiscount.toFixed(4),
        );

        $("#totalamount").val(
          isNaN(total - totaldiscount) ? 0 : total - totaldiscount,
        );
      }
    });
  };

  $scope.DiscountPercentageCalculateLine = function (index, discountid) {
    if (discountid == 0) {
      $("#discountamount" + index).prop("disabled", true);
      $("#discountamount" + index).val(0);
      var total =
        parseFloat($("#quantity" + index).val()) *
        parseFloat($("#unitprice" + index).val());
      $("#totalamount" + index)
        .val(total)
        .toFixed(4);
    } else {
      $http({
        method: "get",
        url: "/SalesQuatationLanding/GetDisCal",
        params: { id: discountid },
      }).then(function (response) {
        var total =
          parseFloat($("#quantity" + index).val()) *
          parseFloat($("#unitprice" + index).val());

        if (response.data[0] === undefined) {
          $("#totalamount" + index).val(isNaN(total) ? 0 : total);
        } else if (response.data[0].code === "WD") {
          $("#totalamount" + index).val(
            isNaN(total - parseFloat($("#discountamount" + index).val()))
              ? 0
              : total - parseFloat($("#discountamount" + index).val()),
          );
        } else {
          var totalvat = (response.data[0].disValue / 100) * total;

          $("#discountamount" + index).val(
            isNaN(totalvat.toFixed(4)) ? 0 : totalvat.toFixed(4),
          );
          $("#totalamount" + index).val(total - totalvat);
        }
      });
    }
  };

  $scope.EDiscountPercentageCalculate = function () {
    $http({
      method: "get",
      url: "/SalesQuatationLanding/GetDisCal",
      params: { id: $scope.eDiscountID },
    }).then(function (response) {
      var total =
        parseFloat($("#equantity").val()) * parseFloat($("#eunitprice").val());

      if (response.data[0] === undefined) {
        $("#etotalamount").val(
          (isNaN(total + parseFloat($("#evatamount").val()))
            ? 0
            : total + parseFloat($("#evatamount").val())
          ).toFixed(4),
        );
      } else if (response.data[0].code === "WD") {
        $("#etotalamount").val(
          (isNaN(total - parseFloat($("#ediscountamount").val()))
            ? 0
            : total - parseFloat($("#ediscountamount").val())
          ).toFixed(4),
        );
      } else {
        var total =
          parseFloat($("#equantity").val()) *
          parseFloat($("#eunitprice").val());
        var totaldiscount = (response.data[0].disValue / 100) * total;
        //$("#vatpercentage").val(response.data[0].vatValue / 100) * total;
        $("#ediscountamount").val(isNaN(totaldiscount) ? 0 : totaldiscount);

        $("#etotalamount").val(
          (isNaN(total - totaldiscount) ? 0 : total - totaldiscount).toFixed(4),
        );
      }
    });
  };

  $scope.EDiscountPercentageCalculateLine = function (index, discountid) {
    if (discountid == 0) {
      var total =
        parseFloat($("#equantity" + index).val()) *
        parseFloat($("#eunitprice" + index).val());
      $("#etotalamount" + index).val((isNaN(total) ? 0 : total).toFixed(4));
    } else {
      $http({
        method: "get",
        url: "/SalesQuatationLanding/GetDisCal",
        params: { id: discountid },
      }).then(function (response) {
        var total =
          parseFloat($("#equantity" + index).val()) *
          parseFloat($("#eunitprice" + index).val());

        if (response.data[0] === undefined) {
          $("#etotalamount" + index).val((isNaN(total) ? 0 : total).toFixed(4));
        } else if (response.data[0].code === "WD") {
          $("#etotalamount" + index).val(
            isNaN(total - parseFloat($("#ediscountamount" + index).val()))
              ? 0
              : total - parseFloat($("#ediscountamount" + index).val()),
          );
        } else {
          var totaldiscount = (response.data[0].disValue / 100) * total;

          //$("#vatpercentage").val(response.data[0].vatValue / 100) * total;
          $("#ediscountamount" + index).val(
            isNaN(totaldiscount) ? 0 : totaldiscount.toFixed(4),
          );

          $("#etotalamount" + index).val(
            isNaN(total - totaldiscount) ? 0 : total - totaldiscount.toFixed(4),
          );
        }
      });
    }
  };

  $scope.DisCalLineWithDis = function (index, id) {
    $("#discountamount" + index).prop("disabled", false);
    var total =
      parseFloat($("#quantity" + index).val()) *
      parseFloat($("#unitprice" + index).val());
    $("#totalamount" + index).val(
      (isNaN(total - parseFloat($("#discountamount" + index).val()))
        ? 0
        : total - parseFloat($("#discountamount" + index).val())
      ).toFixed(4),
    );
  };

  $scope.DisCal = function () {
    if ($("#discountid").val() == "") {
      $("#discountamount").prop("disabled", true);
      $("#discountamount").val(0);
      var total =
        parseFloat($("#quantity").val()) * parseFloat($("#unitprice").val());
      $("#totalamount").val(isNaN(total.toFixed(4)) ? 0 : total.toFixed(4));
    } else {
      $http({
        method: "get",
        url: "/SalesQuatationLanding/GetDisCal",
        params: { id: $scope.DiscountID },
      }).then(function (response) {
        var total =
          parseFloat($("#quantity").val()) * parseFloat($("#unitprice").val());

        if (response.data[0].code === "WD") {
          $("#discountamount").prop("disabled", false);
          $("#discountamount").val(0);
          var totalvatamount = total - parseFloat($("#discountamount").val());

          $("#totalamount").val(
            isNaN(totalvatamount.toFixed(4)) ? 0 : totalvatamount.toFixed(4),
          );
        } else {
          $("#discountamount").attr("disabled", "disabled");
          var disamount = total * (response.data[0].disValue / 100);

          $("#discountamount").val(
            isNaN(disamount.toFixed(4)) ? 0 : disamount.toFixed(4),
          );

          var vat_dis = total + parseFloat($("#vatamount").val()) - disamount;

          $("#totalamount").val(
            isNaN(vat_dis.toFixed(4)) ? 0 : vat_dis.toFixed(4),
          );
        }
      });
    }
  };

  $scope.DisCalLine = function (index, id) {
    if (id == 0 || id == null) {
      $("#discountamount" + index).prop("disabled", true);
      $("#discountamount" + index).val(0);
      var total =
        parseFloat($("#quantity" + index).val()) *
        parseFloat($("#unitprice" + index).val());
      $("#totalamount" + index).val(total);
    } else {
      $http({
        method: "get",
        url: "/SalesQuatationLanding/GetDisCal",
        params: { id: id },
      }).then(function (response) {
        var total =
          parseFloat($("#quantity" + index).val()) *
          parseFloat($("#unitprice" + index).val());
        if (response.data[0] === undefined) {
          $("#totalamount" + index).val(
            isNaN(total + parseFloat($("#vatamount" + index).val()))
              ? 0
              : total + parseFloat($("#vatamount" + index).val()),
          );
        } else if (response.data[0].code === "WD") {
          $("#discountamount" + index).prop("disabled", false);
          $("#discountamount" + index).val(0);
          var total =
            parseFloat($("#quantity" + index).val()) *
            parseFloat($("#unitprice" + index).val());
          $("#totalamount" + index).val(
            (isNaN(total - parseFloat($("#discountamount" + index).val()))
              ? 0
              : total - parseFloat($("#discountamount" + index).val())
            ).toFixed(4),
          );
        } else {
          $("#discountamount" + index).attr("disabled", "disabled");
          var disamount = total * (response.data[0].disValue / 100);
          $("#discountamount" + index).val(isNaN(disamount) ? 0 : disamount);
          var vat_dis = total - disamount;
          $("#totalamount" + index).val(isNaN(vat_dis) ? 0 : vat_dis);
        }
      });
    }
  };

  $scope.EditDisCal = function () {
    if ($("#ediscountid").val() == "") {
      $("#ediscountamount").prop("disabled", true);
      $("#ediscountamount").val(0);
    } else {
      $http({
        method: "get",
        url: "/SalesQuatationLanding/GetDisCal",
        params: { id: $scope.eDiscountID },
      }).then(function (response) {
        var total =
          parseFloat($("#equantity").val()) *
          parseFloat($("#eunitprice").val());

        if (response.data[0].code === "WD") {
          $("#ediscountamount").prop("disabled", false);
          $("#ediscountamount").val(0);
          var totalvatamount = total - parseFloat($("#discountamount").val());
          $("#etotalamount").val(
            isNaN(totalvatamount.toFixed(4)) ? 0 : totalvatamount.toFixed(4),
          );
        } else {
          $("#ediscountamount").attr("disabled", "disabled");
          var disamount = total * (response.data[0].disValue / 100);

          $("#ediscountamount").val(
            isNaN(disamount.toFixed(4)) ? 0 : disamount.toFixed(4),
          );

          var vat_dis = total + parseFloat($("#evatamount").val()) - disamount;

          $("#etotalamount").val(
            isNaN(vat_dis.toFixed(4)) ? 0 : vat_dis.toFixed(4),
          );
        }
      });
    }
  };
  $scope.EditDisCalLine = function (index, id) {
    if ($("#ediscountid" + index).val() == "") {
      $("#ediscountamount" + index).prop("disabled", true);
      $("#ediscountamount" + index).val(0);
      var total =
        parseFloat($("#equantity" + index).val()) *
        parseFloat($("#eunitprice" + index).val());
      $("#etotalamount" + index)
        .val(total)
        .toFixed(4);
    } else {
      $http({
        method: "get",
        url: "/SalesQuatationLanding/GetDisCal",
        params: { id: id },
      }).then(function (response) {
        var total =
          parseFloat($("#equantity" + index).val()) *
          parseFloat($("#eunitprice" + index).val());

        if (response.data[0].code === "WD") {
          $("#ediscountamount" + index).prop("disabled", false);
          $("#ediscountamount" + index).val(0);
          var total =
            parseFloat($("#equantity" + index).val()) *
            parseFloat($("#eunitprice" + index).val());
          $("#etotalamount" + index).val(
            (isNaN(total - parseFloat($("#ediscountamount" + index).val()))
              ? 0
              : total - parseFloat($("#ediscountamount" + index).val())
            ).toFixed(4),
          );
        } else {
          $("#ediscountamount" + index).attr("disabled", "disabled");
          var disamount = total * (response.data[0].disValue / 100);

          $("#ediscountamount" + index).val(
            isNaN(disamount.toFixed(4)) ? 0 : disamount.toFixed(4),
          );

          var vat_dis = total - disamount;

          $("#etotalamount" + index).val(
            isNaN(vat_dis.toFixed(4)) ? 0 : vat_dis.toFixed(4),
          );
        }
      });
    }
  };

  $scope.EditVatCalLine = function (index, id) {
    $http({
      method: "get",
      url: "/SalesQuatationLanding/GetVatCal",
      params: { id: id },
    }).then(function (response) {
      var total =
        parseFloat($("#equantity" + index).val()) *
        parseFloat($("#eunitprice" + index).val());

      if (response.data[0].code === "WV") {
        $("#evatamount" + index).prop("disabled", false);
        $("#evatamount" + index).val(0);
      } else {
        $("#evatamount" + index).attr("disabled", "disabled");
        var vatamount = total * (response.data[0].vatValue / 100);

        var totalvatamount = vatamount;
        $("#evatamount" + index).val(
          isNaN(vatamount.toFixed(4)) ? 0 : vatamount.toFixed(4),
        );

        var vat_dis =
          total +
          totalvatamount -
          parseFloat($("#ediscountamount" + index).val());

        $("#etotalamount" + index).val(
          isNaN(vat_dis.toFixed(4)) ? 0 : vat_dis.toFixed(4),
        );
      }
    });
  };

  $scope.Update = function () {
    var isAllValid = true;

    var isAllValid = true;

    if ($("#eagreementtypeid").val().trim() == "") {
      isAllValid = false;
      $("#eagreementtypeid")
        .siblings("span.error")
        .css("visibility", "visible");
    } else {
      $("#eagreementtypeid").siblings("span.error").css("visibility", "hidden");
    }

    if (isAllValid) {
      var master = {
        ID: $("#eagreementid").val(),
        SALESQUOTATIONHEADERID: $("#esqid").val(),
        AGREEMENTTYPEID: $("#eagreementtypeid").val(),
        DATE: $("#etxtDate").val(),
        EXPIREDATE: $("#etxtExpireDate").val(),
        SHIPMENTDATE: $("#etxtShipmentDate").val(),
        SHIPMENTMODEID: $("#etxtshipmentmodeid").val(),
        PAYMENTTERMID: $("#etxtpaymenttermid").val(),
        DELIVERYTERMID: $("#edeliverytermid").val(),
        TERMSCONDITION: $("#etermscon").val(),

        TOSHIPMENTCOUNTRYID: 1,
        FROMSHIPMENTCOUNTRYID: $("#etxtFromshipmentcountryid").val(),

        FROMSHIPMENTPORTID: $("#etxtloadingport").val(),
        TODISCHARGEPORT: $("#etxtdischargeloadingport").val(),

        TARRIFCODE: $("#etxtTariffCode").val(),
        BUYERREGNO: $("#etxtBuyerRegNo").val(),
        HSCODE: $("#etxtHSCode").val(),
        INTOTERM: $("#etxtincotermid").val(),
        CURRENCYID: $("#etxtcurrencyid").val(),
        DESCRIPTIONS: $("#edescription").val(),

        BUYERBANKDETAILS: $("#etxtBuyerBank").val(),
        SELLERBANKID: $("#esellerbankid").val(),
        BUYERCOUNTRYHSCODE: $("#etxtBuyerHSCode").val(),
        TRANSHIPMENT: $("#etranshipmentid").val(),
        PARTIALSHIPMENT: $("#etxtpartialshipmentid").val(),
        ORIGINOFCOUNTRY: $("#etxtOriginCountry").val(),
        BUYERORDERCONFIRMDATE: $("#etxtOrderDate").val(),
        NOTIFYPARTY: $("#etxtNotifyParty").val(),
        OTHERSPAYTERM: "",
      };

      $.ajax({
        type: "POST",
        url: "/AgreementLanding/Update",
        dataType: "json",
        data: { al: master },
        success: function (result) {
          notify("success", "Success Message", result);

          let masterId = $("#eagreementid").val();

          $http({
            method: "GET",
            url: "/AgreementApproval/ViewByMasterID",
            params: { id: masterId },
          }).success(function (data) {
            var PROCESSCODE = data[0].pinumber;

            EditFileUsingAPI(PROCESSCODE);
          });

          $scope.Clear();
        },
        error: function (errormessage) {
          notify("error", "Error Message", errormessage.responseText);
        },
      });
    }
  };

  //$scope.UpdateByLineID = function (i, id, vatid, discountid, toleranceid) {

  //    var isAllValid = true;
  //    if ($("#ename" + i).val() == "") {
  //        isAllValid = false;
  //        $("#ename" + i).siblings('span.error').css('visibility', 'visible');
  //    }
  //    else {
  //        $("#ename" + i).siblings('span.error').css('visibility', 'hidden');
  //    }

  //    if ($("#eitemcode" + i).val() == "") {
  //        isAllValid = false;
  //        $("#eitemcode" + i).siblings('span.error').css('visibility', 'visible');
  //        $("#euom" + i).siblings('span.error').css('visibility', 'visible');
  //    }
  //    else {
  //        $("#eitemcode" + i).siblings('span.error').css('visibility', 'hidden');
  //        $("#euom" + i).siblings('span.error').css('visibility', 'hidden');
  //    }

  //    if ($("#ename" + i).val() == "") {
  //        isAllValid = false;
  //        $("#ename" + i).siblings('span.error').css('visibility', 'visible');
  //    }
  //    else {
  //        $("#ename" + i).siblings('span.error').css('visibility', 'hidden');
  //    }

  //    if ($("#ehscodeline" + i).val() == "") {
  //        isAllValid = false;
  //        $("#ehscodeline" + i).siblings('span.error').css('visibility', 'visible');
  //    }
  //    else {
  //        $("#ehscodeline" + i).siblings('span.error').css('visibility', 'hidden');
  //    }

  //    if ($("#eunitprice" + i).val() == 0 || $("#eunitprice" + i).val() == '') {
  //        isAllValid = false;
  //        $("#eunitprice" + i).siblings('span.error').css('visibility', 'visible');
  //    }
  //    else {
  //        $("#eunitprice" + i).siblings('span.error').css('visibility', 'hidden');
  //    }

  //    $scope.aggtypeid = $("#eagreementtypeid").val();
  //    if (isAllValid) {

  //        var details = {
  //            ID: id,
  //            SALESQUOTATIONHEADERID: 0,
  //            BATCHID: "",
  //            SERIALNO: 0,
  //            ITEMID: $("#eitemcode" + i).val(),
  //            HSCODE: $("#ehscodeline" + i).val(),
  //            ITEMNAME: "",
  //            UOM: "",
  //            QUANTITY: $("#equantity" + i).val(),
  //            PRICE: $("#eunitprice" + i).val(),
  //            DISCOUNTID: discountid,
  //            DISCOUNT: $("#ediscountamount" + i).val(),
  //            VATID: vatid,
  //            VATAMOUNT: $("#evatamount" + i).val(),
  //            TOTALAMOUNT: $("#etotalamount" + i).val(),
  //            TOLERANCEID: toleranceid,
  //            DESCRIPTIONS: $("#eshortdetails" + i).val(),
  //            REMARKS: $("#eremarks" + i).val(),
  //            FROMSHIPMENTSCHEDULEDATE: $("#efromshipmentscheduledate" + i).val(),
  //            TOSHIPMENTSCHEDULEDATE: $("#etoshipmentscheduledate" + i).val()
  //        }

  //        $.ajax({
  //            type: 'POST',
  //            url: "/AgreementLanding/UpdateDetailsByID",
  //            dataType: "json",
  //            data: { 'sqd': details, 'agreementtypeid': $scope.aggtypeid },
  //            success: function (result) {
  //                notify('success', 'Success Message', result);
  //            },
  //            error: function (errormessage) {
  //                notify('error', 'Error Message', errormessage.responseText);
  //            }
  //        });
  //    }
  //};

  $scope.UpdateByLineID = function (i, id, discountid) {
    var isAllValid = true;

    // Hide previous errors for this row
    $("#equantity" + i)
      .siblings("span.error")
      .css("visibility", "hidden");
    $("#eunitprice" + i)
      .siblings("span.error")
      .css("visibility", "hidden");

    // Quantity validation
    var qty = parseFloat($("#equantity" + i).val());
    if (isNaN(qty) || qty <= 0) {
      isAllValid = false;
      $("#equantity" + i)
        .siblings("span.error")
        .css("visibility", "visible");
    }

    // Unit price validation
    var price = parseFloat($("#eunitprice" + i).val());
    if (isNaN(price) || price <= 0) {
      isAllValid = false;
      $("#eunitprice" + i)
        .siblings("span.error")
        .css("visibility", "visible");
    }

    if (!isAllValid) return;

    // Pull existing row from $scope.edetailsbyid for fields not in the form
    var rowObj = ($scope.edetailsbyid && $scope.edetailsbyid[i]) || {};

    // Resolve discount id: prefer the param, fall back to the dropdown's current value
    var resolvedDiscountId = parseInt(discountid);
    if (isNaN(resolvedDiscountId)) {
      resolvedDiscountId = parseInt($("#ediscountid" + i).val()) || 0;
    }

    var details = {
      ID: id,
      ITEMTYPEID: rowObj.itemtypeid || 0,
      ITEMID: parseInt(rowObj.itemid) || 0,
      UOMID: parseInt(rowObj.uomid) || 0,
      SIZE: $("#esize" + i).val() || "",
      CONSTRUCTION: $("#econstruction" + i).val() || "",
      WEIGHT: $("#eweight" + i).val() || "",
      SLIT: $("#eslit" + i).val() || "",
      SCRIM: $("#escrim" + i).val() || "",
      QUALITY: $("#equality" + i).val() || "",
      ITEMTITLE: $("#eitemtitle" + i).val() || "",
      PACKINGDETAILS: $("#epackingdetails" + i).val() || "",
      QUANTITY: qty,
      PRICE: price,
      DISCOUNTID: resolvedDiscountId,
      DISCOUNT: parseFloat($("#ediscountamount" + i).val()) || 0,
      TOTALAMOUNT: parseFloat($("#etotalamount" + i).val()) || 0,
      DESCRIPTIONS: $("#eshortdetails" + i).val() || "",
      REMARKS: rowObj.remarks || "",
    };

    var aggtypeid = $("#eagreementtypeid").val();

    $.ajax({
      type: "POST",
      url: "/CombineSQ/UpdateDetailsByID",
      dataType: "json",
      data: { sqd: details, agreementtypeid: aggtypeid },
      success: function (result) {
        notify("success", "Success Message", result);
        // Refresh the line list so the row reflects the saved state
        $scope.EditbyDetailsID($("#eagreementid").val());
      },
      error: function (errormessage) {
        notify("error", "Error Message", errormessage.responseText);
      },
    });
  };

  $scope.GetUOMList = function (unitid) {
    if (!unitid) {
      $scope.uomlist = [];
      return;
    }
    $http({
      method: "get",
      url: "/Common/GetUOMForAll",
      params: { unitid: unitid },
    }).then(function (response) {
      $scope.uomlist = response.data;
    });
  };

  // ============================================================
  // Edit-mode line autocomplete handlers (Item Name + 6 attributes)
  // ============================================================

  // Item Name (Finished Goods) — picks new ITEMID + UOM
  $scope.SearchFGLineEdit = function (index) {
    $("#eitemname" + index).autocomplete({
      source: function (request, response) {
        $.ajax({
          url: "/SalesQuatationLanding/GetFGlist/",
          type: "GET",
          dataType: "json",
          data: {
            prefix: request.term,
            unitid: $("#txtTariffCodehidden").val(),
          },
          success: function (data) {
            response(
              $.map(data, function (item) {
                return { label: item.name, id: item.id, uoM: item.uoM };
              }),
            );
          },
        });
      },
      select: function (event, ui) {
        // Update bound model so ng-model fields stay in sync
        var row = $scope.edetailsbyid[index];
        $scope.$apply(function () {
          row.itemname = ui.item.label;
          row.itemid = ui.item.id;
          // Note: ui.item.uoM is the UOM *text*; the dropdown is bound to uomid (int).
          // We don't auto-update uomid here — the user can change it manually if needed.
        });
        // Mirror to the visible input
        $("#eitemname" + index).val(ui.item.label);
        return false;
      },
      minLength: 1,
    });
  };

  $scope.eSearchSizeLineEdit = function (index) {
    $("#esize" + index).autocomplete({
      source: function (request, response) {
        $.ajax({
          url: "/Common/GetSize/",
          type: "GET",
          dataType: "json",
          data: {
            prefix: request.term,
            unitid: $("#txtTariffCodehidden").val(),
          },
          success: function (data) {
            response(
              $.map(data, function (item) {
                return { label: item.size, id: item.id };
              }),
            );
          },
        });
      },
      select: function (event, ui) {
        $("#esize" + index).val(ui.item.label);
        $scope.$apply(function () {
          $scope.edetailsbyid[index].size = ui.item.label;
        });
        return false;
      },
      minLength: 1,
    });
  };

  $scope.eSearchConstructionLineEdit = function (index) {
    $("#econstruction" + index).autocomplete({
      source: function (request, response) {
        $.ajax({
          url: "/Common/GetConstruction/",
          type: "GET",
          dataType: "json",
          data: {
            prefix: request.term,
            unitid: $("#txtTariffCodehidden").val(),
          },
          success: function (data) {
            response(
              $.map(data, function (item) {
                return { label: item.construction, id: item.id };
              }),
            );
          },
        });
      },
      select: function (event, ui) {
        $("#econstruction" + index).val(ui.item.label);
        $scope.$apply(function () {
          $scope.edetailsbyid[index].construction = ui.item.label;
        });
        return false;
      },
      minLength: 1,
    });
  };

  $scope.eSearchWeightLineEdit = function (index) {
    $("#eweight" + index).autocomplete({
      source: function (request, response) {
        $.ajax({
          url: "/Common/GetWeight/",
          type: "GET",
          dataType: "json",
          data: {
            prefix: request.term,
            unitid: $("#txtTariffCodehidden").val(),
          },
          success: function (data) {
            response(
              $.map(data, function (item) {
                return { label: item.weight, id: item.id };
              }),
            );
          },
        });
      },
      select: function (event, ui) {
        $("#eweight" + index).val(ui.item.label);
        $scope.$apply(function () {
          $scope.edetailsbyid[index].weight = ui.item.label;
        });
        return false;
      },
      minLength: 1,
    });
  };

  $scope.eSearchSlitLineEdit = function (index) {
    $("#eslit" + index).autocomplete({
      source: function (request, response) {
        $.ajax({
          url: "/Common/GetSlit/",
          type: "GET",
          dataType: "json",
          data: {
            prefix: request.term,
            unitid: $("#txtTariffCodehidden").val(),
          },
          success: function (data) {
            response(
              $.map(data, function (item) {
                return { label: item.slit, id: item.id };
              }),
            );
          },
        });
      },
      select: function (event, ui) {
        $("#eslit" + index).val(ui.item.label);
        $scope.$apply(function () {
          $scope.edetailsbyid[index].slit = ui.item.label;
        });
        return false;
      },
      minLength: 1,
    });
  };

  $scope.eSearchScrimLineEdit = function (index) {
    $("#escrim" + index).autocomplete({
      source: function (request, response) {
        $.ajax({
          url: "/Common/GetScrim/",
          type: "GET",
          dataType: "json",
          data: {
            prefix: request.term,
            unitid: $("#txtTariffCodehidden").val(),
          },
          success: function (data) {
            response(
              $.map(data, function (item) {
                return { label: item.scrim, id: item.id };
              }),
            );
          },
        });
      },
      select: function (event, ui) {
        $("#escrim" + index).val(ui.item.label);
        $scope.$apply(function () {
          $scope.edetailsbyid[index].scrim = ui.item.label;
        });
        return false;
      },
      minLength: 1,
    });
  };

  $scope.eSearchQualityLineEdit = function (index) {
    $("#equality" + index).autocomplete({
      source: function (request, response) {
        $.ajax({
          url: "/Common/GetQuality/",
          type: "GET",
          dataType: "json",
          data: {
            prefix: request.term,
            unitid: $("#txtTariffCodehidden").val(),
          },
          success: function (data) {
            response(
              $.map(data, function (item) {
                return { label: item.quality, id: item.id };
              }),
            );
          },
        });
      },
      select: function (event, ui) {
        $("#equality" + index).val(ui.item.label);
        $scope.$apply(function () {
          $scope.edetailsbyid[index].quality = ui.item.label;
        });
        return false;
      },
      minLength: 1,
    });
  };

  $scope.Report = function (id) {
    let ALPHA = id.substring(0, 2);

    var rooturl = "";
    if (ALPHA == "SC") {
      var folder = "/EXPORT/Common/Sales_Contract";
    } else {
      var folder = "/EXPORT/Common/PIreport";
    }

    var url =
      rooturl + folder + "&pinum=" + id + "&rs:Embed=true&rc:LinkTarget=_self";

    var base_url = window.location.origin;
    newwindow = window.open(
      url,
      "/DocumentLanding/Print?id=" + id,
      "scrollbars=yes,toolbar=0,height=400,width=800,top=70,left=50",
    );
    if (window.focus) {
      newwindow.focus();
    }
  };
});
