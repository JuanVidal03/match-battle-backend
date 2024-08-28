import mongoose from "mongoose";

const dbConnection = async() => {
    try {
        
        await mongoose.connect(process.env.MONGO_URI);
        console.log("<<< DB connected >>>");

    } catch (error) {
        console.log("<<< Error trying to connect to mongoDB >>>");
    }
}

export default dbConnection;
