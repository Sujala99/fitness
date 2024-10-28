const jwt = require("jsonwebtoken");

const secret = "Inventory-Management-API";

// [Section] Token Creation
// module.exports.createAccessToken = (user) => {
//     const data = {
//         id: user._id, // Ensure the user's _id is included
//         email: user.email,
//         isAdmin: user.isAdmin
//     };

//     // Add an expiration time to the token (1 day)
//     return jwt.sign(data, secret, { expiresIn: "1d" });
// };



// Token Creation
module.exports.createAccessToken = (user) => {
    const data = {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin
    };

    // Create a token valid for 1 day
    return jwt.sign(data, secret, { expiresIn: '1d' });
};





// [Section] Token Verification Middleware
module.exports.verify = (req, res, next) => {
    let token = req.headers.authorization;

    // Check if token is provided
    if (!token) {
        return res.status(401).send({ auth: "Failed. No Token Provided" });
    }

    // Remove "Bearer " from the token string
    if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length); // Extract the token
    }

    // Verify the token
    jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
            return res.status(403).send({
                auth: "Failed",
                message: "Invalid or expired token"
            });
        }

        // Log the decoded token to verify its contents
        console.log("Decoded Token:", decodedToken);

        // Token is valid, store decoded token information in req.user
        req.user = decodedToken;
        next();
    });
};
