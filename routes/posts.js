const express = require('express');
const { resetWatchers } = require('nodemon/lib/monitor/watch');
const router = express.Router();
const Post = require('../models/Post');

// we don't need /posts cause we call using /posts from app.js
// so when it reaches this file, it is for /posts


// this router gets back all the post
// router.get('/', async (req, res)=>{
router.get('/', async (req, res)=>{
    try{
        // Post is the const we created and find is a method of mongoose
        // if you give no parameter for find, it will return all
        const posts = await Post.find();
        res.json(posts);
    }
    catch(err){
        res.json({ message: err});
    }
});



// this router submits the posts
router.post('/', async (req, res) => {
    // creating a post to db
    // Post is the constant Post that we created in line 3
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    // save to database

    // explaination 
    // then(data.. put out the data to the screen(probably the website screen)
    // data is the data that we want to display
    // res.json does the action of desplaying 

    // this return a promise
    try{
        const savedPost = await post.save();
        res.json(savedPost);
    }catch(err){
        res.json({ message: err});
    }

});

// find specific post
// this is dynamic post so for http://localhost:3000/posts/Kaung Kaung will be postId
router.get('/:postId', async (req, res) =>{
    //console.log(req.params.postId);     // postId here is the same postId from '/:postId'

    //await function waits until the follow up function is executed
    try{
        const post = await Post.findById(req.params.postId);
        res.json(post);
    }
    catch(err){
        res.json({message:err});
    }
    
});

// delete specific post
router.delete('/:postId', async (req, res) =>{
    try{
        const removePost = await Post.remove({_id: req.params.postId});    // _id because that is what mongo generate for us 
        res.json(removePost);
    }
    catch(err){
        console.log(err);
        res.json({message:err});
    }
    
});

// update specific post
router.patch('/:postId', async(req, res) =>{
    try{
        const updatePost = await Post.updateOne(
            { _id: req.params.postId }, 
            { $set : { title: req.body.title } }
        );   
        res.json(updatePost);
    }
    catch(err){
        console.log(err);
        res.json({message:err});
    }
})

module.exports = router;