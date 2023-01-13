const jwt = require("jsonwebtoken");

export default function Auth(req, res, next) {
    try{

        const token = req.headers.authorization.split(" ")[1];

        const decodedToken = jwt.verify(token, "RANDOM-TOKEN");

        const user = decodedToken;

        req.user = user;

        next(); 

    } catch (error){
        
        res.status(401).json({
            error: new Error("Invalid request!"),  
        });
    }
};