const express = require('express');
const app = express();
const PORT = 5002; 
app.use(express.static('servers/public'));
app.use(express.urlencoded({extended: true}));

//routes
const todoRouter = require('./routes/todo.js');
app.use('/list', todoRouter);


app.listen(PORT,() => {
    console.log('listening on port', PORT);
});