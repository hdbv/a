const fs = require('fs');
const prompt = require('prompt-sync')();

const find = require('../modules/find');
const payment = require('../modules/payment');

function getFile(filedir){
    var file;
    //read the specified file
    fs.readFile(filedir, 'utf8', function (err,data) {
        //if there's an error it logs it on console
        if (err) {
          return console.log(err);
        }
        var fileresult = data.split('\r\n');
        var employee = prompt('Please enter employee name: ');
        employee = employee.toUpperCase();
        var empfound = find(fileresult,employee);
        if( empfound === false){
            console.log('The employee was not found')
            file= prompt('Please insert a file path example:(D:\\user\\docs\\file.txt) if nothing is input it will use default file  ');
            if(file.length>0 ){
                getFile(file);
            } else {
                getFile('employees.txt');    
            }
        }
        else{
            //get the name just in case there was recursion
            employee = empfound.pop()
            //shows the amount after calculations
            console.log(`The amount to pay ${employee} is ${payment(empfound)} USD`);
            var option = prompt('Want to try again? (y/n) ').toUpperCase();
            if(option === 'Y'){
                file= prompt('Please insert a file path example:(D:\\user\\docs\\file.txt) if nothing is input it will use default file  ');
                if(file.length>0 ){
                    getFile(file);
                } else {
                    getFile('employees.txt');    
                }
            } else {
                console.log('Thanks');
            }
        }
    });
};

module.exports = getFile;