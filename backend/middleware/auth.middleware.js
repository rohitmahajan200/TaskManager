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