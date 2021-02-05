// table of amounts
const table = data;

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
    var amount=0;
    //RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00
    empfound.forEach( element => {
        days = element.split('=')[1];
        days = days.split(',');
        days2pay.push(...days);
    });
    //["MO10:00-12:00", "TU10:00-12:00", "TH01:00-03:00", "SA14:00-18:00", "SU20:00-21:00"]
    days2pay.forEach(element=>{
        amount += calculatedayvalue(element);
    });
    return amount;
}

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

//finds the employee on the file and returns it's record with all the days and hours the employee worked in an array
function find(file,employee){
    var employeerecord=[];
    var result;
    //on the file array conformed by the file breaklines. the file is iterated and it push into the return array the days found 
    file.forEach(element => {
        if(element.split('=')[0]==employee){
            employeerecord.push(element)
        }
    });
    //if nothing is found on the file it show a message for reenter a name or quit and clears the file selector.
    if (employeerecord.length!==0){
        //push the name to end of the array to recover on the original call and show the correct name
        employeerecord.push(employee)
        //set the result for the array of days and hours an the user name
        result = employeerecord;
    } else {        
        employee = prompt("Please enter a valid employee name or q to exit",'').toUpperCase();
        if(employee !== 'Q'){
            //recursion call with new name as it gets the result value
            result = find(file,employee);
        } else {
            //set result as false if the user quits
            result = false;
        }
    }
    return result;
}