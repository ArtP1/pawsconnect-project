const { catchAsync } = require('../config/utils'); 
const postsModel = require('../models/postsModel');


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
    })
}


module.exports = postsController;