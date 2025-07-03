import jwt from 'jsonwebtoken';

export const authMiddleware=async(req,res,next)=>{
    try {
        const token=req.cookies.token;
        if(!token){
            return res
            .status(401)
            .json({"message":"Unauthorised request"})
        }
        const decodedToken=jwt.verify(token,'this_is_secret_token_should_store_in_.env_file_');
        const user={
            email:decodedToken.email,
            role:decodedToken.role
        }
        req.user=user;
        next();

    } catch (error) {
        console.log(error);
        
        return res
            .status(401)
            .json({"message":"Unauthorised request"})
    }
    
}

export const adminCheck=async(req,res,next)=>{
    try {
        const role=req.cookies.role;
        if(role==='admin'){
            next();
        }
        else{
            return res
            .status(402)
            .json({"message":"You are not authorised to create task",success:false})
            }
    }catch (error){
        return res
            .status(501)
            .json({"message":"Somthing went wrong"})
    }
}