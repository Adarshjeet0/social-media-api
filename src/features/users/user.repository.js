import UserModel from './user.schema.js';

// const UserModel = mongoose.model('users', userSchema)
export default class UserRepository{
    async signUp(name, email,password){
        console.log("request is here");
        const newUser = new UserModel({name,email,password});
        await newUser.save();
        return newUser;
    }
    async signIn(email,password){
        const user = new UserModel({email,password});
        await newUser.save();
        return newUser;
    }

    async findByEmail(email) {
        try{
            return await UserModel.findOne({email});
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }
}