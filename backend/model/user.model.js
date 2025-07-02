import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
        lowercae:true,
        enum:["admin","user"]
    }
})

userSchema.pre("save",async function(next){
this.password=await bcrypt.hash(this.password,10);
next();
})

userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.genrateToken=function(){
    return jwt.sign(
        {
            email:this.email,
            role:this.email
        },
        'this_is_secret_token_should_store_in_.env_file_',
        {
            expiresIn:'1d'
        }
    )
}

export const User=mongoose.model("User",userSchema);

