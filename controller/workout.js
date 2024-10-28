const Workout = require("../models/Workout");


// Add a new workout for the logged-in user
exports.addWorkout = async (req, res) => {
    try {
        // Debug: Log the user object
        console.log("User object in request:", req.user);

        // Check if req.user is populated
        if (!req.user || !req.user.id) {
            return res.status(400).json({ message: "User information not found" });
        }

        // Get the logged-in user's ID from the request
        const userId = req.user.id;

        // Create a new workout with the logged-in user's ID
        const newWorkout = new Workout({
            name: req.body.name,
            duration: req.body.duration,
            status: req.body.status || 'Pending', // Optional: Set status from request or use default
            user: userId
        });

        // Save the workout to the database
        const savedWorkout = await newWorkout.save();

        // Return the newly created workout as a response
        res.status(201).json({
            message: 'Workout added successfully!',
            workout: savedWorkout
        });
    } catch (error) {
        console.error('Error adding workout:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};


// Get all workouts for the logged-in user
exports.getUserWorkouts = async (req, res) => {
    try {
        // Get the logged-in user's ID from the request
        const userId = req.user.id;

        // Find all workouts where the user matches the logged-in user
        const workouts = await Workout.find({ user: userId });

        // Return the workouts in the response
        res.status(200).json({
            message: 'Workouts fetched successfully!',
            workouts: workouts
        });
    } catch (error) {
        console.error('Error fetching workouts:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

// //get workout by Id
// module.exports.getWorkoutById = (req, res) => {
// 	Workout.findById(req.params.id)
// 	.then(workout => {
// 		if(!workout){
// 			return res.status(404).json({message: "workout not found"})
// 		}
// 		res.status(200).json(workout);
// 	})
// 	.catch(err => res.status(500).json({error: "failed to retrieve workouts "}))
// }



//update workout by Id
module.exports.updateWorkout = (req, res) => {
	const workoutId = req.params.id;

	const updateData ={
		name:req.body.name,
		duration: req.body.duration,
		status: req.body.status
	};

	Workout.findByIdAndUpdate(workoutId, updateData, {new:true})
		.then(updatedWorkout =>{
			if(!updatedWorkout){
				return res.status(404).json({message: "workout not found"});

			}
			res.status(200).json({message:"workout updated!!"})
		})
		.catch(err=>{
			res.status(500).json({error: "failed to update the workout "})
		})


}



// delete workout by id
module.exports.deleteWorkout = (req, res) => {
    const workoutId = req.params.id;

    Workout.findByIdAndDelete(workoutId)
        .then(deletedWorkout => {
            if (!deletedWorkout) {
                return res.status(404).json({ message: "Workout not found" });
            }
            res.status(200).json({ message: 'Workout deleted successfully!' });
        })
        .catch(err => {
            res.status(500).json({ error: 'Failed to delete workout', details: err });
        });
};

