const router = require('express').Router();
const Posts = require('../data/db.js');

router.get('/', (req,res)=>{
    Posts.find(req.query)
    .then(data =>{
        res.status(200).json(data);
    }).catch(error =>{
        console.log(error)
        res.status(500).json({
            message: 'Error retreiving the post data!'
        })
    })
})

router.get('/:id', (req,res)=>{
    Posts.findById(req.params.id)
    .then(([data]) =>{
        if(data){
            res.status(200).json(data)
            
        }else{
            res.status(404).json({message: 'Post data not found!'})
        }
    })
})

router.post('/', (req, res) =>{
    Posts.insert(req.body)
    .then(data =>{
        res.status(201).json(data);
    }).catch(error =>{
        console.log(error)
        res.status(500).json({
            message: 'Error adding the post data'
        })
    })
})

router.delete('/:id', (req, res)=>{
    Posts.remove(req.params.id)
    .then(data =>{
        if(data > 0){
            res.status(200).json({message: 'This post has been deleted'})
        }else{
            res.status(404).json({message: 'This post could not be found!'})
        }
    })
})




// /api/posts/:id   
//| Removes the post with the specified id and returns the **deleted post object**. 
//You may need to make additional calls to the database in order to satisfy this requirement. |








module.exports = router;