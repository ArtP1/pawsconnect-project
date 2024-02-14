const { catchAsync } = require('../config/utils'); 
const postsModel = require('../models/postsModel');


const postsController = {
    getPosts: catchAsync(async (req, res) => {
        const posts = await postsModel.getPosts();
        res.json(posts);
    }),
    getPostByUserId: catchAsync(async (req, res) => {
        const { user_id } = req.params;
        const post = await postsModel.getPostByUserId(user_id);
        res.json(post);
    }),
    getPostById: catchAsync(async (req, res) => {
        const { post_id } = req.params;
        const post = await postsModel.getPostById(post_id);
        res.json(post);
    })
}


module.exports = postsController;