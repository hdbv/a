const prompt = require('prompt-sync')();

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
        var answer = prompt('Please enter a valid employee name or q to exit: ');
        answer = answer.toUpperCase();
        if(answer !== 'Q'){
            //recursion call with new name as it gets the result value
            result = find(file,answer);
        } else {
            //set result as false if the user quits
            result = false;
        }
    }
    return result;
}

module.exports = find;