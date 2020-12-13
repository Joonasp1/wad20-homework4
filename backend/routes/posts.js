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

router.post('/', authorize, (request, response) => {
    // Endpoint to create a new post
    if (request.body.text == null) {
        response.status(400).json({
            ok: false
        })
    } else {
        request.body.userId = request.currentUser.id;

        PostModel.create(request.body, () => {
            response.status(201).json({
                ok: true
            })
        });
    }
});


router.put('/:postId/likes', authorize, (request, response) => {

    let postId = request.params.postId;
    let userId = request.currentUser.id;
    // Endpoint for current user to like a post

    PostModel.getLikesByUserIdAndPostId(userId, postId, (rows) => {

        if (rows.length) {
            response.status(409)
                .json({
                    code: 'already_liked',
                    message: 'The post is already liked'
                });
        } else {
            PostModel.like(userId, postId, () => {
                response.json({
                    ok: true
                })
            })
        }

    });

});

router.delete('/:postId/likes', authorize, (request, response) => {

    // Endpoint for current user to unlike a post
    let postId = request.params.postId;
    let userId = request.currentUser.id;

    PostModel.getLikesByUserIdAndPostId(userId, postId, (rows) => {

        if (!rows.length) {
            response.status(409)
                .json({
                    code: 'not_liked',
                    message: 'The post is not liked'
                });
        } else {
            PostModel.unlike(userId, postId, () => {
                response.json({
                    ok: true
                })
            })
        }

    });

});

module.exports = router;
