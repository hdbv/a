import { calculatedayvalue } from './calculatedayvalue.js';
import { find } from './find.js';

document.addEventListener('DOMContentLoaded',function(){
    //reads txt file
    document.getElementById('file').addEventListener('change',function(e){
        const reader = new FileReader();
        reader.onload = function(){
            //turns file into an array
            var fileresult=reader.result.split('\r\n')
            //ask for employee to calculate payment
            var employee = prompt("Please enter employee name",'').toUpperCase();
            //call find function expects a false or an array
            var empfound = find(fileresult,employee);
            //if empfound is false asks for a new file
            if( empfound === false){
                alert('Please select a file');
            }
            else{
                //get the name just in case there was recursion
                employee = empfound.pop()
                //shows the amount after calculations
                alert(`The amount to pay ${employee} is ${payment(empfound)} USD`);

            }
            //clears the file selector for next use
            document.getElementById("file").value = "";
        };
        reader.readAsText(e.target.files[0]);
    });
});

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