//imorting web server framework express
const express = require('express');

//express aplication
const app = express()

//server running on port 7000
const server = app.listen(7000, () => {
    console.log(`Express running → PORT ${server.address().port}`);
  });

//set the server default page with index.html
app.use( express.static('.',{index: 'index.html'}) );

app.get('/', (req, res) => {
    res.send('Hello World!');
  });