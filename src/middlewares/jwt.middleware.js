import jwt from 'jsonwebtoken';

const jwtAuth = (req, res, next)=>{
    // 1. read the token
    // console.log(req.headers);
    const token = req.headers['authorization'];
    // console.log(token);
    // console.log(req.headers);
    // 2. If no token, return the error message
    if(!token){
        return res.status(403).send({message: 'No token provided.'});
    }

    // 3. check if token is valid 
    try {
        const payload = jwt.verify(token, 'qwertyuiop'); 
        req.userId = payload.userId;
        console.log(payload);
    } catch (error) {
        // 4. return error
        return res.status(403).send({message: 'No token provided.'});
    }

    // 5. call the next middleware
    next();
};

export default jwtAuth