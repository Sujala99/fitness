const bcrypt = require('bcrypt');
const User = require('../models/User');
const auth = require('../auth');

// // Register User
// module.exports.registerUser = async (req, res) => {
//     try {
//         // Validate email
//         if (!req.body.email.includes("@")) {
//             return res.status(400).send({ error: "Invalid email format" });
//         }
//         // Validate password length
//         if (req.body.password.length < 8) {
//             return res.status(400).send({ error: "Password must be at least 8 characters long" });
//         }

//         // Hash the password asynchronously
//         const hashedPassword = await bcrypt.hash(req.body.password, 10);

//         // Create new user
//         const newUser = new User({
//             email: req.body.email,
//             password: hashedPassword
//         });

//         // Save the user to the database
//         await newUser.save();
//         res.status(201).send({ message: "Registered successfully" });
//     } catch (err) {
//         console.error("Error registering user:", err);
//         res.status(500).send({ error: "Server error" });
//     }
// };

// // Login User
// module.exports.loginUser = async (req, res) => {
//     try {
//         if (!req.body.email.includes("@")) {
//             return res.status(400).send({ message: 'Invalid email format' });
//         }

//         // Find the user by email
//         const user = await User.findOne({ email: req.body.email });
//         if (!user) {
//             return res.status(404).send({ message: 'No email found' });
//         }

//         // Compare the password
//         const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
//         if (!isPasswordCorrect) {
//             return res.status(401).send({ message: 'Incorrect email or password' });
//         }

//         // Generate JWT access token
//         const token = auth.createAccessToken(user);

//         res.status(200).send({
//             message: 'User logged in successfully',
//             accessToken: token
//         });
//     } catch (error) {
//         console.error("Error logging in:", error);
//         res.status(500).send({ error: "Server error" });
//     }
// };

// Register User
module.exports.registerUser = async (req, res) => {
    try {
        // Validate email
        if (!req.body.email.includes("@")) {
            return res.status(400).send({ error: "Invalid email format" });
        }
        // Validate password length
        if (req.body.password.length < 8) {
            return res.status(400).send({ error: "Password must be at least 8 characters long" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).send({ error: "User already exists" });
        }

        // Hash the password asynchronously
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create new user
        const newUser = new User({
            email: req.body.email,
            password: hashedPassword
        });

        // Save the user to the database
        await newUser.save();
        res.status(201).send({ message: "Registered successfully" });
    } catch (err) {
        console.error("Error registering user:", err);
        res.status(500).send({ error: "Server error" });
    }
};



// Login User
module.exports.loginUser = async (req, res) => {
    try {
        if (!req.body.email.includes("@")) {
            return res.status(400).send({ message: 'Invalid email format' });
        }

        // Find the user by email
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).send({ message: 'No email found' });
        }

        // Compare the password
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).send({ message: 'Incorrect email or password' });
        }

        // Generate JWT access token
        const token = auth.createAccessToken(user);

        res.status(200).send({
            message: 'User logged in successfully',
            accessToken: token
        });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).send({ error: "Server error" });
    }
};