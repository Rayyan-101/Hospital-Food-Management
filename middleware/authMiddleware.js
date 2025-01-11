const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Get the token from the authorization header
    const token = req.header('Authorization')?.split(' ')[1];

    // Check if there's a token
    if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Add user information to the request object
        next(); // Allow the request to proceed to the controller
    } catch (err) {
        res.status(401).json({ error: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
