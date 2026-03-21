const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma');


const protect = async (req, res, next) => {
    try {
        // 1. check the authorization header exists
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token provided' });
        }

        //2. Extract the token
        const token = authHeader.split(' ')[1];

        //verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // find the user in database
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId}
        });

        if (!user) {
            return res.status(401).json({ message: 'User no longer exists '});
        }
        // attach the user to the request object
        req.user = user;
        // go to the next function (the route handler)
        next();

    } catch (error) {
        return res.status(401).json({ message: 'Not authorized' });
    }
};

module.exports = { protect };