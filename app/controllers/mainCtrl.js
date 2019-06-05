/**
 * Created by ashishtyagi9622 on 4/6/19.
 */
angular.module('mainCtrl', [])
    .controller('mainController', function ($http,$window) {

        var vm =this;
        vm.maps=false;
        vm.calendar=false;
        var today = new Date().toISOString().split("T")[0];
        vm.startDate = today;
        vm.setMaps= function (x) {
            vm.maps=x;
            vm.calendar=!x;
        };
        vm.setCalendar= function (x) {
            vm.calendar=x;
            vm.maps=!x;
        };
        vm.setBoth =function (x) {
            vm.calendar=x;
            vm.maps=x;
        };
        vm.initialize = function () {

            console.log("hello");
            var autocomplete = new google.maps.places.Autocomplete(document.getElementById('txtAutocomplete'));
            google.maps.event.addListener(autocomplete, 'place_changed', function () {
                var place = autocomplete.getPlace();
                vm.location=place.formatted_address;
            });
        };

        vm.submittingForm= function () {

            console.log(vm.location,"location");
            $.ajax({
                url: '/addEvent',
                type: "POST",
                data: {
                    event_name:vm.name,
                    event_details:vm.details,
                    event_location:vm.location,
                    event_start:convert(vm.sDate),
                    event_end:convert(vm.eDate)
                },
                success: function(response){
                    if(response.date=='Valid Date'){
                        alert(response.date);

                        addingEvent(response.data);
                        $window.location.assign('/');
                    }
                    else{
                        if(response.place=='Same place'){
                            alert(response.date + ' and '+ response.place);
                        }
                        else{
                            alert(response.date);
                        }
                    }


                }
            });
        };
        function convert(str) {
            var date = new Date(str),
                mnth = ("0" + (date.getMonth()+1)).slice(-2),
                day  = ("0" + date.getDate()).slice(-2);
            return [ date.getFullYear(), mnth, day ].join("-");
        }

        function addingEvent(y) {
            console.log("adding events now");
            $http.get("data.json")
                .then(function(response) {
                    var oneDay=false;
                    var dataWrite = response.data;
                    if(y.event_start==y.event_end){
                        oneDay=true;
                    }
                    var d ={
                        title:y.event_name,
                        details:y.event_details,
                        start:y.event_start,
                        end:y.event_end,
                        location:y.event_location,
                        onDay:oneDay
                    };
                    dataWrite.push(d);

                    $.ajax({
                        url: '/add',
                        type: "POST",
                        data: {
                            data:dataWrite
                        },
                        success: function(response) {
                            alert("event added");
                            $window.location.assign('/');
                        }
                    });
                });
        }

    });