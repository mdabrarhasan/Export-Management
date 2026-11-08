var app = angular.module("App", ['angularUtils.directives.dirPagination']);

app.controller("Ctl", function ($scope, $http) {

	$scope.LoadData = function () {
		$http({
			method: "get",
			url: "/Customer/GetCustomerAll"
		}).then(function (response) {
			console.log(response.data);
			$scope.CustomerList = response.data;
		}, function () {
			notify('error', 'Error Message', 'Failed to load customer data. Please try again.');
		});
	};

	$scope.SearchCustomer = function () {
		$("#txtCustomerName").autocomplete({
			source: function (request, response) {
				$.ajax({
					url: '/Customer/GetCustomerDropdown',
					type: "GET",
					dataType: "json",
					data: { prefix: request.term },
					success: function (data) {
						response($.map(data, function (item) {
							return {
								label: item.name,
								value: item.name,
								id: item.id
							};
						}));
					}
				});
			},
			select: function (event, ui) {
				$("#txtCustomerName").val(ui.item.value);
				$("#hcusid").val(ui.item.id);
				return false;
			},
			minLength: 1
		});
	};

	$scope.Clear = function () {
		$('#txtID').val(0);
		$('#hcusid').val('');
		$('#txtCustomerName').val('');
		$('#txtTIN').val('');
		$('#txtBIN').val('');
		$('#txtIRC').val('');
		$('#txtCustomerName').siblings('span.error').css('visibility', 'hidden');
	};

	$scope.Edit = function (list) {
		$('#txtID').val(list.id);
		$('#hcusid').val(list.customerid);
		$('#txtCustomerName').val(list.cusname);
		$('#txtTIN').val(list.tin || '');
		$('#txtBIN').val(list.bin || '');
		$('#txtIRC').val(list.irc || '');
		$('#txtCustomerName').siblings('span.error').css('visibility', 'hidden');
	};

	$scope.Save = function () {
		var isAllValid = true;

		if (($('#hcusid').val() || '').trim() === '') {
			isAllValid = false;
			$('#txtCustomerName').siblings('span.error').css('visibility', 'visible');
		} else {
			$('#txtCustomerName').siblings('span.error').css('visibility', 'hidden');
		}

		if (isAllValid && confirm('Are You Sure? You Want to Save this Record.') === true) {
			var customer = {
				ID: parseInt($('#txtID').val() || '0'),
				CUSTOMERID: parseInt($('#hcusid').val() || '0'),
				TIN: $('#txtTIN').val(),
				BIN: $('#txtBIN').val(),
				IRC: $('#txtIRC').val(),
				ISACTIVE: 1
			};

			var id = parseInt($('#txtID').val() || '0');
			var apiUrl = id > 0 ? '/Customer/Update' : '/Customer/Create';

			$.ajax({
				type: 'POST',
				url: apiUrl,
				dataType: 'json',
				data: { customer: customer },
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
					$('#savebutton').prop('disabled', false);
				}
			});
		} else {
			$('#savebutton').prop('disabled', false);
		}
	};

	$scope.DeleteMaster = function (id) {
		if (confirm('Are You Sure? You Want to Delete this Record.') === true) {
			$http({
				method: 'POST',
				url: '/Customer/Delete',
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
		}
	};
});