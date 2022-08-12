const {Router} = require('express');
const express = require('express');
const todoRouter = express.Router();
const pool = require('../modules/pool.js');

//get 
todoRouter.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "list" ORDER BY "task";';
    pool.query(queryText).then((results) => {
        console.log("success for get", results )
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
            console.log("these are my posts", results);
            res.send(results);
        }).catch((error) => {
            console.log("error in task post", error );
            res.sendStatus(500);
        });
});

//put 
todoRouter.put('/:id', (req, res) => {
    const taskId = req.params.id;
    console.log(req.body); // data from client
    const queryText = `UPDATE "list"
                       WHERE "complete" = $1;`;
    pool.query(queryText, [taskId])
        .then((results) => {
            res.sendStatus(200);
        }).catch((error) => {
            res.sendStatus(500);
        })
});



//delete 
todoRouter.delete('/:id', (req, res) => {
    const taskId = req.params.id;
    console.log('DELETE /list', taskId);
    const queryText = `DELETE FROM "list"
                       WHERE "id" = $1`;
    pool.query(queryText, [taskId])
        .then((results) => {
            res.sendStatus(200);
        }).catch((error) => {
            res.sendStatus(500);
        })
});


//export to server.js 
module.exports = todoRouter;