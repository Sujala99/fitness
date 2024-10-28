const express = require("express");
const router = express.Router();
const workoutController = require("../controller/Workout")
const authMiddleware = require("../auth"); // Import your authentication middleware


router.post("/add", authMiddleware.verify, workoutController.addWorkout);
router.get("/myworkouts", authMiddleware.verify, workoutController.getUserWorkouts);
// router.get("/:id",workoutController.getWorkoutById);
router.put("/:id", workoutController.updateWorkout);
router.delete("/:id", workoutController.deleteWorkout);



module.exports= router;

