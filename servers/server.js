const express = require('express');
const app = express();
const PORT = 5002; 

app.use(express.static('server/public'));
app.use(express.urlencoded({extended: true}));

//routes
app.use('/list', todoRouter);

//get 
app.get('/list', (req, res) =>{
    res.send("get request called");

});
//post 

//put 

//delete 


app.listen(PORT,() => {
    console.log('listening on port', PORT);
});