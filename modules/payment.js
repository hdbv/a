import { calculatedayvalue } from './calculatedayvalue.js';

function payment(empfound){
    var days2pay = [];
    var days = [];
    var amount=0;
    //splits the name and days to fill the days2pay array
    empfound.forEach( element => {
        days = element.split('=')[1];
        days = days.split(',');
        days2pay.push(...days);
    });
    //calls the function to calculate the amount of each day according to the hours worked
    days2pay.forEach(element=>{
        amount += calculatedayvalue(element);
    });
    return amount;
}

export { payment };