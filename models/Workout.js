const mongoose = require('mongoose');
const workoutSchema = new mongoose.Schema({
	name:{
		type: String,
		required: [true, "name of workout is required"]
	},
	duration:{
		type: Number,
		required:[true, "duration is Required"]
	},
	dateAdded:{
		type: Date,
		default: Date.now,
	},

	status: {
		type: String,
		enum:['Pending', 'Completed',' In Proggress'],
		default:'Pending'
	},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Refers to the User model
        required: true
    }
});

module.exports = mongoose.model('Workout',workoutSchema)

