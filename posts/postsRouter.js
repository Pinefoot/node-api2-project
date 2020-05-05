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
    }).catch(err => {
        res.status(500).json({message: "There was an error while saving to the database"})
    })
})

router.post('/', (req, res) =>{
    const {title, contents} = req.body
    if(!title || !contents){
        return res.status(400).json({message: 'Please provide title and content!'})
    }
    Posts.insert({title,contents})
    .then(({id})=>{
        Posts.findById(id)
        .then(([post]) =>{
            res.status(201).json(post)

        }).catch(err =>{
            res.status(500).json({message: 'Error adding the post data'})
        })
    })

    // Posts.insert(req.body)
    // .then(data =>{
    //     res.status(201).json(data);
    // }).catch(error =>{
    //     console.log(error)
    //     res.status(500).json({
    //         message: 'Error adding the post data'
    //     })
    // })
})

router.delete('/:id', (req, res)=>{
    Posts.remove(req.params.id)
    .then(data =>{
        if(data > 0){
            res.status(200).json({message: 'This post has been deleted'})
        }else{
            res.status(404).json({message: 'This post with the specified ID does not exist!'})
        }
    }).catch(err => {
        res.status(500).json({message: "There was an error while saving to the database"})
    })
})


router.put('/:id', (req, res)=>{
    const changes = req.body
    if(!req.body.title || !req.body.contents){
       return res.status(400).json({message: 'The error is the error that i need to update to be the correct error.'})
}

    Posts.update(req.params.id, changes)
    .then(update =>{
        console.log(update, "this is the update");
        if (update === 0){
        res.status(404).json({message: "The post with the specified ID does not exist "})
       
    }else{
        res.status(200).json(update)
    }
    }).catch(error =>{
        console.log(error);
        res.status(500).json({
            message: 'There was an error while saving to the database.'
        })
    })
})






//comment stuff

router.get('/:id/comments', (req, res) =>{
    Posts.findCommentById(req.params.id)
    .then(([data]) =>{
        if(data){
            res.status(200).json(data)
            
        }else{
            res.status(404).json({message: 'The post with the specified ID does not exist'})
        }
    }).catch(err => {
        res.status(500).json({message: "There was an error while saving to the database"})
    })

})




router.post('/:post_id/comments', (req, res) =>{
    const {post_id} = req.params
    const {text} = req.body
    if(text === "" || typeof text != "string" ){
       return res.status(400).json({message: 'Please provide text for the comment.'})
    }

    Posts.insertComment({post_id, text})
    .then(({id: comment_id})=>{
        Posts.findCommentById(comment_id)
        .then(([comment])=>{
            if(comment){
                res.status(200).json(comment)
            }else{
                res.status(404).json({message: 'This does not exist'})
            }
        })
    }).catch(err => {
        res.status(500).json({message: "There was an error while saving to the database"})
    })
})






module.exports = router;