import express from 'express';
import CommentsModel from './comments.model.js';
import CommentRepository from './comments.repository.js';
import {ApplicationError} from '../../error-Handler/applicationError.js';

export default class CommentController{
    
    //------------------------------Old Comment Controller code-----------------------------
    // static getComment(req, res){
    //     const postId = req.params.postId;
    //     const comments = CommentsModel.getAll(postId);
    //     res.status(200).send(comments);
    // }

    // static addComment(req, res){
    //     const postId = parseInt(req.params.postId);
    //     const userId = req.userId;      
    //     const {content} = req.body;
    //     const comment = CommentsModel.addComment(userId, postId, content);
    //     if(comment){
    //         return res.status(201).send(comment);
    //     }
    //     return res.status(400).send("Failed to add Comment");
    // }

    // static updateComment(req, res){
    //     const commentId = req.params.commentId;
    //     const {content} = req.body;
    //     const updatedComment = CommentsModel.updateComment(commentId, content);
    //     if(updatedComment){
    //         return res.status(200).send(updatedComment);
    //     }
    //     return res.status(400).send("No comment found to update");
    // }

    // static deleteComment(req, res){
    //     const commentId = req.params.commentId;
    //     const comments = CommentsModel.deleteComment(commentId);
    //     if(comments){
    //         return res.status(200).send("Delete Successfully");
    //     }
    //     return res.status(404).send("No match found");
    // }

    //-----------------------------New Comment Controller code------------------------------------
    constructor(){
        this.commentRepository = new CommentRepository();
    }
    async getCommentByPostId(req,res){
        try {
            const postId = req.params.postId;
            const comments = await this.commentRepository.getCommentByPostId(postId);
            console.log(comments);
            if(comments){
                return res.status(200).send(comments);
            }else{
                return res.status(404).send("No comments are available");
            }
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong with databases", 501);
        }
    }
    async addCommentByPostId(req,res){
        try {
            const postId = req.params.postId;
            const {comment} = req.body;
            const userId = req.userId;
            // console.log(postId);
            // console.log(userId);
            // console.log(comment);
            const comments = await this.commentRepository.addCommentByPostId(postId, userId, comment);
            if(comments){
                return res.status(200).send(comments);
            }else{
                return res.status(404).send("Failed to add comment! Try again");
            }
        } catch (error) {
            console.log(error);
            res.send("You are not allowed to insert duplicate comment")
            // throw new ApplicationError("Something went wrong with databases", 501);
        }
    }
    async updateCommentByCommentId(req,res){
        try {
            const commentId = req.params.commentId;
            const {newComment} = req.body;
            const comment = await this.commentRepository.updateCommentByCommentId(commentId, newComment);
            if(comment){
                return res.status(200).send(comment);
            }else{
                return res.status(404).send("Failed to update comment, Try again later!");
            }
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong with databases", 501);
        }
    }
    async deleteCommentByCommentId(req,res){
        try {
            const commentId = req.params.commentId;
            const comment = await this.commentRepository.deleteCommentByCommentId(commentId);
            if(comment.deleteCount !== 0){
                return res.status(200).send("Deleted Successfully!!");
            }else{
                return res.status(404).send("Failed to delete!!");
            }
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong with databases", 501);
        }
    }

    
}