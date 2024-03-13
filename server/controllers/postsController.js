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
    }),
    createPost: catchAsync(async (req, res) => {
        const { user_id, content, caption, visibility } = req.body;

        // Assuming content is the image and stored as a file path in the server
        const imageUrl = req.file.path;

        // Call the corresponding function from the postsModel to insert the new post
        const newPost = await postsModel.createPost(user_id, content, caption, visibility, imageUrl);

        if (!newPost) {
            return sendResponse(res, 500, false, null, "Failed to create post. Please try again.");
        }

        sendResponse(res, 201, true, newPost, "Post created successfully.");
    })
}


module.exports = postsController;