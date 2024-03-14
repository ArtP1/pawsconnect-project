const { catchAsync } = require('../config/utils'); 
const postsModel = require('../models/postsModel');
const { sendResponse } = require('../config/responseHandler');


const postsController = {
    getPosts: catchAsync(async (req, res) => {
        const posts = await postsModel.getPosts();
        sendResponse(res, 200, true, { posts }, "Posts retrieved successfully");
    }),
    getPostsByUserId: catchAsync(async (req, res) => {
        const { user_id } = req.params;
        const post = await postsModel.getPostsByUserId(user_id);
        sendResponse(res, 200, true, post, "Posts retrieved successfully");
    }),
    getPostById: catchAsync(async (req, res) => {
        const { post_id } = req.params;
        const post = await postsModel.getPostById(post_id);
        sendResponse(res, 200, true, post, "Post retrieved successfully");
    }),
    createPost: catchAsync(async (req, res) => {
        const { id } = req.user;
        const { content, caption, visibility } = req.body;

        const newPost = await postsModel.createPost(id, content, caption, visibility);
    
        if (!newPost) {
            return sendResponse(res, 500, false, null, "Failed to create post. Please try again.");
        }
    
        sendResponse(res, 201, true, null, "Post created successfully.");
    })
    
}


module.exports = postsController;