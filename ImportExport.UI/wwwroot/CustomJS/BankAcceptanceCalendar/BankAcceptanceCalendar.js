var app = angular.module("App", ['angularUtils.directives.dirPagination']);

app.controller("Ctl", function ($scope, $window, $http) {

    $scope.loading = false;

    $scope.calendarEvents = [];
    $scope.calendarDays = [];

    $scope.currentDate = new Date();

    $scope.currentMonth = $scope.currentDate.getMonth();
    $scope.currentYear = $scope.currentDate.getFullYear();

    $scope.monthNames = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ];

    $scope.monthTitle =
        $scope.monthNames[$scope.currentMonth] + " " + $scope.currentYear;



    //


    $scope.showMonthPicker = false;
    $scope.pickerYear = $scope.currentYear;



    $scope.ToggleMonthPicker = function () {
        $scope.pickerYear = $scope.currentYear;
        $scope.showMonthPicker = !$scope.showMonthPicker;
    };

    $scope.SelectMonthYear = function (monthIndex, year) {
        $scope.currentMonth = monthIndex;
        $scope.currentYear = year;

        $scope.UpdateMonthTitle();
        $scope.BuildCalendar();

        $scope.showMonthPicker = false;
    };







    $scope.UpdateMonthTitle = function () {
        $scope.monthTitle =
            $scope.monthNames[$scope.currentMonth] + " " + $scope.currentYear;
    };

    $scope.PreviousMonth = function () {
        $scope.currentMonth--;

        if ($scope.currentMonth < 0) {
            $scope.currentMonth = 11;
            $scope.currentYear--;
        }

        $scope.UpdateMonthTitle();
        $scope.BuildCalendar();
    };

    $scope.NextMonth = function () {
        $scope.currentMonth++;

        if ($scope.currentMonth > 11) {
            $scope.currentMonth = 0;
            $scope.currentYear++;
        }

        $scope.UpdateMonthTitle();
        $scope.BuildCalendar();
    };

    $scope.GoToday = function () {
        var today = new Date();

        $scope.currentMonth = today.getMonth();
        $scope.currentYear = today.getFullYear();

        $scope.UpdateMonthTitle();
        $scope.BuildCalendar();
    };



    $scope.hoverEvent = null;
    $scope.popupStyle = {};




    $scope.ShowEventPopup = function (ev, $event) {
        $scope.hoverEvent = ev;

        var popupWidth = 300;
        var popupHeight = 180;
        var margin = 12;

        var left = $event.clientX + margin;
        var top = $event.clientY + margin;

        if (left + popupWidth > window.innerWidth) {
            left = $event.clientX - popupWidth - margin;
        }

        if (top + popupHeight > window.innerHeight) {
            top = $event.clientY - popupHeight - margin;
        }

        if (left < margin) {
            left = margin;
        }

        if (top < margin) {
            top = margin;
        }

        $scope.popupStyle = {
            top: top + "px",
            left: left + "px"
        };
    };









    $scope.HideEventPopup = function () {
        $scope.hoverEvent = null;
    };




    //

    $(document).on('click', function (e) {

        if (!$(e.target).closest('.month-picker-wrapper').length) {

            $scope.$applyAsync(function () {
                $scope.showMonthPicker = false;
            });

        }

    });






    $scope.GetCalendarData = function () {

        $scope.loading = true;
        $http({
            method: "GET",
            url: "/BankAcceptanceCalendar/GetCalendarData"
        }).then(function (response) {


            console.log("RAW RESPONSE:", response);
            console.log("RAW DATA:", response.data);

            var rawEvents = response.data || [];

            $scope.calendarEvents = rawEvents.map(function (x) {

                var eventDate = x.eventdate || x.EVENTDATE;

                x.calendardate = eventDate
                    ? eventDate.split(' ')[0].split('T')[0]
                    : null;

                return x;
            });

            console.log($scope.calendarEvents);

            $scope.BuildCalendar();

            $scope.loading = false;

        }, function () {

            $scope.loading = false;

        });
    };


    $scope.BuildCalendar = function () {

        $scope.calendarDays = [];

        var firstDay =
            new Date($scope.currentYear, $scope.currentMonth, 1);

        var lastDay =
            new Date($scope.currentYear, $scope.currentMonth + 1, 0);

        var totalDays = lastDay.getDate();

        var startWeekDay = firstDay.getDay();

        for (var i = 0; i < startWeekDay; i++) {

            $scope.calendarDays.push({
                empty: true
            });
        }

        for (var day = 1; day <= totalDays; day++) {

            var fullDate =
                $scope.currentYear + "-" +
                String($scope.currentMonth + 1).padStart(2, '0') + "-" +
                String(day).padStart(2, '0');

            var events = ($scope.calendarEvents || []).filter(function (x) {


                if (!x.calendardate)
                    return false;

                return x.calendardate === fullDate;
            });

            $scope.calendarDays.push({
                empty: false,
                day: day,
                fullDate: fullDate,
                events: events
            });
        }
    };

    $scope.GetCalendarData();

});