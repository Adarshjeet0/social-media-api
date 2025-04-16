import express from 'express';
import PostsController from './posts.controller.js';
import {upload} from '../../middlewares/fileUpload.middleware.js';
import jwtAuth from '../../middlewares/jwt.middleware.js';
export const postsRouter = express.Router();

const postController = new PostsController();

// -----------------------Old routes----------------------

// postsRouter.get('/all',jwtAuth, PostsController.getAll);

// postsRouter.get('/:postId',jwtAuth, PostsController.getById);

// // postsRouter.get('/:userSpecified', ()=>{});

// postsRouter.post('/',jwtAuth, upload.single('imageUrl'), PostsController.addPost);

// postsRouter.post('/filter',jwtAuth, PostsController.filterPosts);

// postsRouter.delete('/:postId',jwtAuth, PostsController.delete);

// postsRouter.put('/:postId',jwtAuth,upload.single('imageUrl'), PostsController.update);

//--------------------------New Routes-----------------------

//Retrieve all posts from various users to compile a news feed
postsRouter.get('/all', (req, res, next)=>{
    postController.getAll(req, res, next);
})

//Retrieve a specific post by ID
postsRouter.get('/:postId', (req, res, next)=>{
    postController.getPostById(req, res, next);
})

//Retrieve all posts for a specific user
postsRouter.get('/', (req, res, next)=>{
    postController.getUserPost(req, res, next);
})

//Create a new post
postsRouter.post('/', upload.single('imageUrl'), (req, res, next)=>{
    postController.createPost(req, res, next);
})

//Delete a specific post by ID
postsRouter.delete('/:postId', (req, res, next)=>{
    postController.deletePostById(req, res, next);
})

//Update a specific post
postsRouter.put('/:postId',upload.single('imageUrl'), (req, res, next)=>{
    postController.updatePostById(req, res, next);
})



