const prompt = require('prompt-sync')();

//import the getfile function for the start of the process 
const getFile = require('./modules/readfile');

var file= prompt('Please insert a file path example:(D:\\user\\docs\\file.txt) if nothing is input it will use default file  ');
if(file.length>0 ){
    getFile(file);
}
else {
    getFile('employees.txt');    
}

//npm run test

//node app.js