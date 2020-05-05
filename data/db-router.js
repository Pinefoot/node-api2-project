const router = require('express').Router();
const Database = require('./db.js');

router.get('/', (req,res)=>{
    Database.find(req.query)
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
    Database.findById(req.params.id)
    .then(data =>{
        if(data){
            res.status(200).json(data)
        }else{
            res.status(404).json({message: 'Post data not found!'})
        }
    })
})

router.post('/', (req, res) =>{
    Database.add(req.body)
    .then(data =>{
        res.status(201).json(data);
    }).catch(error =>{
        console.log(error)
        res.status(500).json({
            message: 'Error adding the post data'
        })
    })
})








module.exports = router;