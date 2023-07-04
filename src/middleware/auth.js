import jwt from 'jsonwebtoken';

const { TOKEN_KEY } = process.env;

export const verifyToken = async (req, res, next) => {
    // Check if the token is present in the header
    const authHeader = req.headers["authorization"];
    let token = '';
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const authToken = authHeader.substring(7); // Remove "Bearer " from the token string
        token = authToken;
    }

    // Return failed message if token is not present
    if (!token) {
        return res.status(403).json({
            status: "fail",
            message: "An authentication token is required"
        });
    }

    // Check if the token is valid
    try {
        const decodedToken = await jwt.verify(token, TOKEN_KEY);
        req.currentUser = decodedToken;
        req.token = token;
    } catch (error) {
        return res.status(401).json({
            status: "fail",
            message: "Invalid token"
        });
    }


    return next();
}