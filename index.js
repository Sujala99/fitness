// [SECTION] Dependencies and Modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

			
// [SECTION] Environment Setup
const port = 4000;

// [SECTION] Route requirements
const userRoutes = require("./routes/user");
const workoutRoutes = require("./routes/workout");

// [SECTION] Server Setup
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));	


app.use(cors());


//[SECTION] Database Connection 
//courseBookingAPI - no data
//booking-KT - with data
mongoose.connect("mongodb+srv://sujala-rai:admin123@mongodb-cluster.3zpdtzg.mongodb.net/fitness-tracker?retryWrites=true&w=majority&appName=MongoDB-Cluster", {
    useNewUrlParser: true, //both can be omitted since this will be deprecated in the next version
    useUnifiedTopology: true
});

mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'));


// Define URI Endpoints
 app.use("/users", userRoutes);
 app.use("/workouts", workoutRoutes);


// [SECTION] Server Gateway Response
if(require.main === module){
    app.listen(process.env.PORT || port, () => {
        console.log(`API is now online on port ${ process.env.PORT || port }`)
    });
}

module.exports = { app, mongoose };