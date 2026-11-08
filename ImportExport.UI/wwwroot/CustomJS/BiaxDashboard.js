var app = angular.module("App", ['angularUtils.directives.dirPagination']);

app.controller("ChartController", function ($scope, $window, $http) {


        $scope.DashBoardGraphBar = function (TYPE) {
            $http({
                method: "get",
                url: "/BiaxDashboard/DashBoardGraphBar",
                params: { type: TYPE }
            }).then(function (response) {


                $scope.chartData = {
                    labels: [
                        response.data[0].currentmonth,
                        response.data[0].nextmontH1,
                        response.data[0].nextmontH2,
                        response.data[0].nextmontH3
                    ],
                    datasets: [
                        {
                            label: 'Sales Qoutation Aproval',
                            data: [
                                response.data[0].id,
                                response.data[0].nexT_MONTH_1,
                                response.data[0].nexT_MONTH_2,
                                response.data[0].nexT_MONTH_3
                            ],
                            backgroundColor: [
                                'rgb(175, 229, 202)',
                                'rgba(255, 206, 86, 0.6)',
                                'rgba(70, 102, 206,0.6)',
                                'rgba(54, 162, 235, 0.6)'
                            ],
                            borderColor: [
                                'rgb(175, 229, 202)',
                                'rgba(255, 206, 86, 0.6)',
                                'rgba(70, 102, 206,0.6)',
                                'rgba(54, 162, 235, 0.6)'
                            ],

                            //backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            //borderColor: 'rgba(255, 99, 132, 1)'
                        }
                    ]
                };

                $scope.initChart();

            });

        };

        $scope.initChart = function () {
            var ctx = document.getElementById('myChart').getContext('2d');
            if (ctx) {
                // Destroy the chart if it already exists to avoid overwriting issues
                if ($scope.myBarChart) {
                    $scope.myBarChart.destroy();
                }

                // Create the chart with the data
                $scope.myBarChart = new Chart(ctx, {
                    type: 'bar',
                    data: $scope.chartData,
                    options: {
                        responsive: true, // Ensure responsiveness
                        scales: {
                            y: {
                                beginAtZero: true // Start the Y-axis from 0
                            }
                        }
                    }
                });
            }
        };


        $scope.DashBoardGraphBar2 = function (TYPE) {
            $http({
                method: "get",
                url: "/BiaxDashboard/DashBoardGraphpie",
                params: { type: TYPE }
            }).then(function (response) {
                $scope.bardataaa = response.data;
                console.log(response.data);

                // Correct the data array (use counts instead of month names)
                $scope.chartPIData = {
                    labels: [
                        response.data[0].currentmonth, // "September"
                        response.data[0].nextmontH1, // "October"
                        response.data[0].nextmontH2, // "November"
                        response.data[0].nextmontH3 // "December"
                    ],
                    datasets: [
                        {
                            label: 'Proforma Invoice',
                            data: [
                                response.data[0].id, // Count for current month
                                response.data[0].nexT_MONTH_1, // Count for next month 1
                                response.data[0].nexT_MONTH_2, // Count for next month 2
                                response.data[0].nexT_MONTH_3 // Count for next month 3
                            ],
                            backgroundColor: [
                                'rgb(175, 229, 202)',
                                'rgba(255, 206, 86, 0.6)',
                                'rgba(70, 102, 206,0.6)',
                                'rgba(54, 162, 235, 0.6)'
                            ],
                            borderColor: [
                                'rgb(175, 229, 202)',
                                'rgba(255, 206, 86, 0.6)',
                                'rgba(70, 102, 206,0.6)',
                                'rgba(54, 162, 235, 0.6)'
                            ],
                            borderWidth: 1
                        }
                    ]
                };

                // Initialize the pie chart after setting the data
                $scope.initPIChart();
            });
        };

        $scope.initPIChart = function () {
            console.log("I am in");
            const ctx = document.getElementById('chartPIData').getContext('2d');

            // Destroy the previous chart instance if it exists
            if ($scope.myPieChart) {
                $scope.myPieChart.destroy();
            }

            // Create the pie chart with the data
            $scope.myPieChart = new Chart(ctx, {
                type: 'pie',
                data: $scope.chartPIData,
                options: {
                    responsive: true // Make sure the chart is responsive
                }
            });
        };
        $scope.DashBoardGraphBar3 = function (TYPE) {
            console.log("I am in");
            $http({
                method: "get",
                url: "/BiaxDashboard/DashBoardGraphBardo", // Make sure the endpoint is correct
                params: { type: TYPE }
            }).then(function (response) {
                console.log(response.data);

                // Assigning data from the response to the chart
                $scope.chartdoughnutData = {
                    labels: [
                        response.data[0].currentmonth, // "September"
                        response.data[0].nextmontH1, // "October"
                        response.data[0].nextmontH2, // "November"
                        response.data[0].nextmontH3 // "December"
                    ],
                    datasets: [
                        {
                            label: 'Spot Order',
                            data: [
                                response.data[0].id, // Count for current month
                                response.data[0].nexT_MONTH_1, // Count for next month 1
                                response.data[0].nexT_MONTH_2, // Count for next month 2
                                response.data[0].nexT_MONTH_3 // Count for next month 3
                            ],
                            backgroundColor: [
                                'rgb(175, 229, 202)',
                                'rgba(255, 206, 86, 0.6)',
                                'rgba(70, 102, 206,0.6)',
                                'rgba(54, 162, 235, 0.6)'
                            ],
                            borderColor: [
                                'rgb(175, 229, 202)',
                                'rgba(255, 206, 86, 0.6)',
                                'rgba(70, 102, 206,0.6)',
                                'rgba(54, 162, 235, 0.6)'
                            ],
                            borderWidth: 1
                        }
                    ]
                };

                // Initialize the doughnut chart after setting the data
                $scope.initdoughnutChart();
            });
        };

        // Initialize the doughnut chart
        $scope.initdoughnutChart = function () {
            const ctx = document.getElementById('doughnut').getContext('2d');

            // Destroy the previous chart instance if it exists
            if ($scope.myDoughnutChart) {
                $scope.myDoughnutChart.destroy();
            }

            // Create the new doughnut chart
            $scope.myDoughnutChart = new Chart(ctx, {
                type: 'doughnut',
                data: $scope.chartdoughnutData,
                options: {
                    responsive: true // Optional chart options for responsiveness
                }
            });
        };

        $scope.DashBoardGraphBar4 = function (TYPE) {
            $http({
                method: "get",
                url: "/BiaxDashboard/DashBoardGraphbarr",

                params: { type: TYPE }
            }).then(function (response) {



                $scope.bardataaaa = null;

                $scope.bardataaaa = response.data;

                $scope.chartlineData = {
                    labels: [
                        response.data[0].currentmonth,
                        response.data[0].nextmontH1,
                        response.data[0].nextmontH2,
                        response.data[0].nextmontH3
                    ],
                    datasets: [
                        {
                            label: 'Conditional Proposal',
                            data: [
                                response.data[0].id,
                                response.data[0].nexT_MONTH_1,
                                response.data[0].nexT_MONTH_2,
                                response.data[0].nexT_MONTH_3
                            ],
                            backgroundColor: [
                                'rgb(175, 229, 202)',
                                'rgba(255, 206, 86, 0.6)',
                                'rgba(70, 102, 206,0.6)',
                                'rgba(54, 162, 235, 0.6)'
                            ],
                            borderColor: [
                                'rgb(175, 229, 202)',
                                'rgba(255, 206, 86, 0.6)',
                                'rgba(70, 102, 206,0.6)',
                                'rgba(54, 162, 235, 0.6)'
                            ],
                        }
                    ]
                };


                $scope.initmyChart2Chart();

            });
        }


        $scope.initmyChart2Chart = function () {
            var ctx = document.getElementById('myChart2').getContext('2d');
            if (ctx) {
                // Destroy the chart if it already exists to avoid overwriting issues
                if ($scope.myBarChartt) {
                    $scope.myBarChartt.destroy();
                }

                // Create the chart with the data
                $scope.myBarChartt = new Chart(ctx, {
                    type: 'bar',
                    data: $scope.chartlineData,
                    options: {
                        responsive: true, // Ensure responsiveness
                        scales: {
                            y: {
                                beginAtZero: true // Start the Y-axis from 0
                            }
                        }
                    }
                });
            }
        };



        $scope.DashBoard = function () {
            var id = $('#txtpoID').val();
            $http({
                method: "get",
                url: "/BiaxDashboard/Dashboard",

                params: { type: 1 }
            }).then(function (response) {
                //alert(response.data[0].poheadeR_PENDING)
                $('#po').text(response.data[0].poheadeR_COM);
                $('#fundreq').text(response.data[0].fundreqheadeR_PENDING);
                $('#treasury').text(response.data[0].fundreqdetailS_PEMDING);
                $('#identpen').text(response.data[0].indenT_PENDING);
                $('#indentack').text(response.data[0].indenT_ACK);
                $('#lc').text(response.data[0].pM_COM);
                $('#ship').text(response.data[0].shipmenT_COM);
                $('#lcm').text(response.data[0].lcmheadeR_PENDING);
            });
        }

    });