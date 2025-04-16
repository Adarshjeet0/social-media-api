import express from 'express';
import swagger from 'swagger-ui-express';
import bodyParser from 'body-parser';
import {userRouter} from './src/features/users/user.routes.js';
import {postsRouter} from './src/features/posts/posts.routes.js';
import {likesRouter} from './src/features/likes/likes.routes.js';
import {commentsRouter} from './src/features/comments/comments.routes.js';
// import apiDocs from './swagger.json' assert {type:"json"};
import loggerMiddleware from './src/middlewares/logger.middleware.js';
import {ApplicationError} from './src/error-Handler/applicationError.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';
import {sendOTPRouter} from './src/features/sendOTP/sendOTP.routes.js';
import {friendRouter} from './src/features/friends/friends.routes.js';
import fs from 'fs';
import cors from 'cors';

const apiDocs = JSON.parse(fs.readFileSync('./swagger.json', 'utf-8'));

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(loggerMiddleware);
app.use('/api-docs', swagger.serve, swagger.setup(apiDocs));
app.use('/api/users', userRouter);
app.use('/api/posts',jwtAuth, postsRouter);
app.use('/api/comments',jwtAuth, commentsRouter);
app.use('/api/likes',jwtAuth, likesRouter);
app.use('/api/otp',jwtAuth, sendOTPRouter);
app.use('/api/friends',jwtAuth, friendRouter);

app.use((err, req, res, next)=>{
    console.log(err);
    if (err instanceof ApplicationError){
      return res.status(err.status).send(err.message);
    }
    // server errors.
    res
    .status(500)
    .send(
      'Something went wrong, please try later'
      );
  });

app.get('/', (req, res)=>{
    res.send("Welcome to Postaway");
});


export {app};