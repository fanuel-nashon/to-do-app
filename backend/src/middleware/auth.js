const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next){

    // token is sent in the header using standard Bearer format
    // Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
    const authHeader = req.headers['authorization'];

    if(!authHeader) {
        return res.status(401).json({
            success: false,
            message: 'No token provided - please log in'
        });
    }

    // split "Bearer <token>" and take the 2nd part
    const token = authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({
            success: false,
            message: 'Invalid token format'
        });
    }

    try {
        // using jwt.verify to check the signature and the expiry
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // attach the decoded user to the request
        req.user=decoded;

        next();
    } catch(err) {
        return res.status(401).json({
            success: false,
            message: 'Token is invalid or expired - please log in again'
        });
    }
}

module.exports = authMiddleware;