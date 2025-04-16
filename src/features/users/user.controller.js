import UserModel from './user.schema.js';
import jwt from 'jsonwebtoken';
import {ApplicationError} from '../../error-Handler/applicationError.js';
import UserRepository from './user.repository.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export default class UserController{
    constructor(){
        this.userRepository = new UserRepository();
    }

    async signUp(req, res){
        
        const {name, email, password} = req.body;
        try {
            // const hashedPassword = await bcrypt.hash(password,12);
            // const user = new UserModel(name,email,hashedPassword);
            const result = await this.userRepository.signUp(name,email,password);
            return res.status(201).send(result);
        } catch (error) {
            console.log(error);
            res.send("User already exist");
            throw new ApplicationError("Something went wrong with databases",404); 
        }
         
    }

    async signIn(req, res, next){
        try {
            const {email, password} = req.body;
            console.log(email);
            const user = await this.userRepository.findByEmail(email);
            if(!user){
                return res.status(401).send("Incorrect email or password");
            }
            else{
                const result = await bcrypt.compare(password, user.password)
                if(result){
                    const token = jwt.sign(
                        {
                          userId: user._id,
                          email: user.email,
                        },
                        JWT_SECRET,
                        {
                          expiresIn: '1h',
                        }
                    );
                    return res.status(200).send(token);
                }else{
                    return res.status(401).send("Incorrect email or password");
                }
            }
        } catch (err) {
            console.log("Wrong credentials");
            next(err);
        }
        

    }

    async logOut(req, res) {
        try {
            // Inform the client to delete the token
            // localStorage.removeItem('token');
            return res.status(200).send("Logged out successfully");
        } catch (error) {
            console.log(error);
            res.status(500).send("Error logging out");
        }
    }

    async logoutFromAllDevices(req, res) {
        const { userId } = req.body; // Extract userId from the request
        try {
            const user = await UserModel.findById(userId);

            if (!user) {
                return res.status(404).send("User not found");
            }

            // Increment the token version
            user.tokenVersion += 1;
            await user.save();

            return res.status(200).json({ message: "Logged out from all devices successfully" });
        } catch (error) {
            console.error("Error logging out from all devices:", error);
            res.status(500).json({ message: "Error logging out from all devices" });
        }
    }

    async getUserById(req, res){}

    async getAllUser(req, res){}
    
    async updateUser(req, res){}
}