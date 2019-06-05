/**
 * Created by ashishtyagi9622 on 5/6/19.
 */
var http = require('http');
module.exports = {
    dateValidation:function (x,callback) {
        http.get('http://localhost:4000/data.json',function (da) {
            da.on('data', function(chunk) {
                var data=JSON.parse(chunk);
                var result ={};
                var start = Date.parse(x.event_start);
                var end = Date.parse(x.event_end);
                var i;
                var message='';
                var place='';
                var flag=false;
                for(i=0;i<data.length;i++){
                    var eventStart = Date.parse(data[i].start);
                    var eventEnd = Date.parse(data[i].end);
                    if(start==end){
                        if(data[i].oneDay){
                            if(eventStart==start){
                                message='Clashing with another event';
                                flag=true;
                                if(data[i].location==x.event_location){
                                    place='Same place';
                                }
                                break;
                            }
                        }
                        else{
                            if(start<eventStart||start>eventEnd){

                            }
                            else{
                                message = 'Clashing with another event';
                                flag=true;
                                if(data[i].location==x.event_location){
                                    place='Same place';
                                }
                                break;
                            }

                        }
                    }
                    else{
                        if(data[i].oneDay){
                            if(start>eventStart||end<eventStart){

                            }
                            else{
                                message = 'Clashing with another event';
                                flag=true;
                                if(data[i].location==x.event_location){
                                    place='Same place';
                                }
                                break;
                            }
                        }
                        else{
                            if(eventStart>end||eventEnd<start){

                            }
                            else{
                                message = 'Clashing with another event';
                                flag=true;
                                if(data[i].location==x.event_location){
                                    place='Same place';
                                }
                                break;
                            }
                        }
                    }
                }
                if(!flag){

                    message='Valid Date';
                }
                callback({data:x,date:message,place:place});

            });

        });
    }
};