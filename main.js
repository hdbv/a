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