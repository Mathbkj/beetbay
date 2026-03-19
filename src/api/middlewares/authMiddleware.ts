import jwt from "jsonwebtoken";
import express from "express";



export function authMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
const bearerToken = req.headers.authorization?.split(" ")[1];
if(!bearerToken) return res.status(403).json({ message: "Unauthorized access attempt." });
try{
    const decodedToken = jwt.verify(bearerToken,process.env.JWT_SECRET!);
    (req as any).user = decodedToken;
}
catch(err){
    let message = "";
    if(err instanceof jwt.JsonWebTokenError){
        message = err.message;
    }  
    return res.status(403).json({message:message})
}
finally{
    next();
}
}