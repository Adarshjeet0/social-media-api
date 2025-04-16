import express from 'express';
import SendOTPController from './sendOTP.controller.js';
export const sendOTPRouter = express.Router();
const sendOTPController = new SendOTPController();

sendOTPRouter.post('/send', (req, res)=>{
    sendOTPController.send(req, res);
})
sendOTPRouter.post('/verify', (req, res)=>{
    sendOTPController.verify(req, res);
})
sendOTPRouter.post('/reset-password', (req, res)=>{
    sendOTPController.resetPassword(req, res);
})