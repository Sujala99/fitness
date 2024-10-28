const express = require('express');
const userController = require('../controller/user');
const auth = require('../auth');

const router = express.Router();

// Register and login routes
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
// router.get('/dashboard', auth.verify, adminController.getUsersAndWorkouts);


// Protected route example using JWT middleware
router.get('/protected', auth.verify, (req, res) => {
    res.status(200).send({
        message: 'This is a protected route',
        user: req.user
    });
});

module.exports = router;
