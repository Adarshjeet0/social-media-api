import {ApplicationError } from '../../error-Handler/applicationError.js';



export default class PostModel{
    static id = 0;
    constructor(userId, caption, imageUrl){
        this.id = ++PostModel.id;
        this.userId = userId;
        this.caption = caption;
        this.imageUrl = imageUrl;
    }
    
    static addPost(userId, caption, imageUrl){
        // console.log(userId);
        // console.log(caption);
        // console.log(imageUrl);
        const newPost = new PostModel(userId, caption, imageUrl);
        posts.push(newPost);
        return newPost;
    }

    static getAll(){
        return posts;
    }

    static getById(id){
        return posts.find(post => post.id == id);
    }

    static updatePost(id, caption, imageUrl){
        // console.log(id);
        // console.log(caption);
        // console.log(imageUrl);
        const postIndex = posts.findIndex(po => po.id == id);
        if(postIndex >=0 ){
            if(caption){
                posts[postIndex].caption = caption;
            }
            if(imageUrl){
                posts[postIndex].imageUrl = imageUrl;
            }
            return posts[postIndex];
        }
        


    }

    static deletePost(id){
        const postIndex = posts.findIndex(po => po.id == id);
        if(postIndex == -1){
            throw new ApplicationError("No post found", 404); 
        }
        posts.splice(postIndex, 1);
        return posts;
        // if(postIndex >=0 ){
        //     posts.splice(postIndex, 1);
        //     return posts;
        // }
        
    }

    static filterPosts(value){
        return posts.filter(post => post.caption.toLowerCase().includes(value.toLowerCase()));
    }



    
}

let posts = [
    new PostModel(1, "Wild Animal", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-BTL0jgc3mKKohxE_Ilhj503T-0e8z4DsIT5skl8cSJ7D-DhnozaGSZDacpHYoe5LMAI&usqp=CAU"),
    new PostModel(1, "Creatures", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS96BY_ucfjDSgPJV-UCwNpcn_unDVtsRJ9xadW7yP45Fv08zAYMnDmrz0Qg1_45o70xUw&usqp=CAU"),
    new PostModel(2, "Animals", "https://cdn1.byjus.com/wp-content/uploads/2022/08/Wild-Animals-Names-Explore-List-of-100-Names-in-English.png")
];