// table of amounts
const table = require('../modules/table');

//calculate daily payment 
function calculatedayvalue(dayvalue){
    var value;
    var amount=0;
    //day that is requested
    var day = dayvalue.substring(0,2);
    
    //starting time in seconds
    var hourinit = parseInt(dayvalue.substring(2,4))*3600;
    var mininit = dayvalue.substring(5,7)*60;
    var init= hourinit+mininit;

    //ending time in seconds
    var hourend = parseInt(dayvalue.substring(8,10))*3600;
    var minend = dayvalue.substring(11)*60;
    var end = hourend+minend;
    
    //const table asignated to a variable for it use
    var element = table[day];

    //loop day options to obtain value of the day
    for (let i = 0; i < element.length; i++) {
        value = element[i][1];
        //starting time in table of the element
        var thourinit = parseInt(element[i][0].substring(0,2))*3600;
        var tmininit = parseInt(element[i][0].substring(3,5))*60;
        var tinit = thourinit+tmininit;
        //ending time in table of the element
        var thourend = parseInt(element[i][0].substring(6,8))*3600;
        var tminend = parseInt(element[i][0].substring(9))*60;
        var tend = thourend+tminend;
        //verify if the hours are in the interval
        if(tinit <= init && tend >= end){
            amount+=value*((end-init)/3600);
            break;
        }
        //if the employee worked in the last interval the ending time has to be greater
        //if not it won't fulfill the condition above,
        //so the ending time has to be smaller than 24hs (86400 seconds)
        if(tend==0){
            if(tinit <= init && end <= 86400){
                amount+=value*((end-init)/3600);
                break;
            }
        }
    }
    return amount;
}

module.exports =  calculatedayvalue;