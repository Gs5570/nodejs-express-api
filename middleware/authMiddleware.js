const jwt = require('jsonwebtoken')

module.exports = (req,res,next) => {
    //get token from the headers object
    const token = req.header('x-auth-token');
    //verify if token exist
    if(!token){
        return res.json('No token access denied');
    }
    //if we have to the token
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        console.log(decoded);

        next();
    } catch (error) {
        console.log(error);
        res.status(400).json('Token not valid')
    }
}