const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const secretKey = '4fa3b3e27b9e4e19d93b3aab3c95c1e74c7b9ef1dbd9d5932e7463a4c2b7a9f8f8d9f8c3a7e4f9a2d7c7f9b3a5c4d2e3'

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Token expired' });
        }
        req.user = user;
        next();
    });
}

module.exports = {
    authenticateToken
}