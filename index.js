const express = require('express');
const databaseRouter = require('./data/db-router') //for the routing not sure if its posts yet.
const server = express();

server.use(express.json());

server.get('/', (req, res)=>{
    res.json({ query: req.query, params: req.params, headers: req.headers})
    res.send(`
    <h2>Server Place Holder title</h2>
    <p>Welcome to this Api</p>
    `)
})

server.use('/api/posts', databaseRouter);
server.listen(5000, ()=>{
    console.log('\n*** Server running on http://localhost:5000***\n')
})