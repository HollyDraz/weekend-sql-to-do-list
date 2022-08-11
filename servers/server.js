const express = require('express');
const app = express();
const PORT = 5002; 
const todoRouter = require('./routes/todo.js');
app.use(express.static('server/public'));
app.use(express.urlencoded({extended: true}));

//routes
app.use('/list', todoRouter);

//get 
//test for get
app.get('/list', (req, res) =>{
    res.send("get request called", );

});


app.listen(PORT,() => {
    console.log('listening on port', PORT);
});