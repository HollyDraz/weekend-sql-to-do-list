const {Router} = require('express');
const express = require('express');
const todoRouter = express.Router();
const pool = require('../modules/pool.js');

//get 
todoRouter.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "list" ORDER BY "task";';
    pool.query(queryText).then((results) => {
        res.send(results.rows);
    }).catch((error) => {
        console.log('error in list GET', error);
        res.sendStatus(500);
    });
} );

//post 
todoRouter.post('/', (req, res) => {
    const tasks = req.body;
    const queryText = `INSERT INTO "list" ("task")
                       VALUES($1)`
    pool.query(queryText,[tasks.task])
        .then((results) => {
            console.log(results);
            res.send(results);
        }).catch((error)=>{
            console.log("error in task post", error );
            res.sendStatus(500);
        });
});

//put 

//delete 

module.exports = todoRouter;