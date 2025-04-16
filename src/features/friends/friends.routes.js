import express from 'express';
import FriendController from './friends.controller.js';

export const friendRouter = express.Router();
const friendController = new FriendController();

friendRouter.get('/get-friends/:userId',(req, res)=>{
    friendController.getAllFriend(req, res);
})
friendRouter.get('/get-pending-requests',(req, res)=>{
    friendController.getPendingRequests(req, res);
})
friendRouter.post('/toggle-friendship/:friendId',(req, res)=>{
    friendController.toggleFriendship(req, res);
})
friendRouter.post('/response-to-request/:friendId',(req, res)=>{
    friendController.responseTORequest(req, res);
})

// export {friendRouter};

