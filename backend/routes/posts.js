const express = require('express');
const router = express.Router();
const authorize = require('../middlewares/authorize');
const PostModel = require('../models/PostModel');


router.get('/', authorize, (request, response) => {

    // Endpoint to get posts of people that currently logged in user follows or their own posts

    PostModel.getAllForUser(request.currentUser.id, (postIds) => {

        if (postIds.length) {
            PostModel.getByIds(postIds, request.currentUser.id, (posts) => {
                response.status(201).json(posts)
            });
            return;
        }
        response.json([])

    })

});

router.post('/', authorize,  (request, response) => {
<<<<<<< HEAD
    console.log("Hello")
    // Endpoint to create a new post
    let params = {
        userId: request.currentUser.id,
        text: request.body.post.text,
        media: request.body.post.media,
    };
    PostModel.create(params, () => {
        response.status(201).json()
    });
    response.json([]);
=======

    // Endpoint to create a new post

>>>>>>> 5bc3dfe8aca5f10e11a585a4e00b202394c20411
});


router.put('/:postId/likes', authorize, (request, response) => {

<<<<<<< HEAD
    let postId = request.params.postId;
    let userId = request.currentUser.id;
    // Endpoint for current user to like a post

    PostModel.getLikesByUserIdAndPostId(userId, postId, (rows) =>{

        if (rows.length){
            response.status(409)
                .json({
                    code: 'already_liked',
                    message: 'The post is already liked'
                });
        }
        else{
            PostModel.like(userId, postId, () =>{
                response.json({
                    ok: true
                })
            })
        }

    });

=======
    // Endpoint for current user to like a post
>>>>>>> 5bc3dfe8aca5f10e11a585a4e00b202394c20411
});

router.delete('/:postId/likes', authorize, (request, response) => {

    // Endpoint for current user to unlike a post
<<<<<<< HEAD
    let postId = request.params.postId;
    let userId = request.currentUser.id;

    PostModel.getLikesByUserIdAndPostId(userId, postId, (rows) =>{

        if (!rows.length){
            response.status(409)
                .json({
                    code: 'not_liked',
                    message: 'The post is not liked'
                });
        }
        else{
            PostModel.unlike(userId, postId, () =>{
                response.json({
                    ok: true
                })
            })
        }

    });
=======
>>>>>>> 5bc3dfe8aca5f10e11a585a4e00b202394c20411

});

module.exports = router;
