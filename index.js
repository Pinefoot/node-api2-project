const express = require('express');
const postsRouter = require('./posts/postsRouter.js');
//const commentRouter = require('./posts/commentRouter.js'); //for the routing not sure if its posts yet.
const server = express();
const cors = require('cors')




server.use(express.json());
server.use(cors());

server.get('/:id', cors(), function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for a Single Route'})
  })




server.get('/', cors(), (req, res, next)=>{
    
    res.json({ query: req.query, params: req.params, headers: req.headers})
    res.send(`
    <h2>Server Place Holder title</h2>
    <p>Welcome to this Api</p>
    `)
    res.json({msg: 'this is CORS-enabled'})
})

server.use('/api/posts',  postsRouter);

server.listen(5000, ()=>{
    console.log('\n*** Server running on http://localhost:5000***\n')
})