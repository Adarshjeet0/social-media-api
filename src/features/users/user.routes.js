import express from 'express';
import UserController from './user.controller.js';

export const userRouter = express.Router();
const userController = new UserController();

userRouter.post('/signup', (req, res, next)=>{
    userController.signUp(req, res, next);
});
userRouter.post('/signin', (req, res, next)=>{
    userController.signIn(req, res, next);
});
userRouter.get('/logout', (req, res, next)=>{
    userController.logOut(req, res, next);
});
userRouter.get('/logout-all-devices', (req, res, next)=>{
    userController.logoutFromAllDevices(req, res, next);
});
userRouter.get('/get-details/:userId', (req, res, next)=>{
    userController.getUserById(req, res, next);
});
userRouter.get('/get-all-details', (req, res, next)=>{
    userController.getAllUser(req, res, next);
});
userRouter.put('/update-details/:userId', (req, res, next)=>{
    userController.updateUser(req, res, next);
});

// userRouter.post('/signin', UserController.signin);

