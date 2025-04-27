import mongoose from "mongoose";

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGOURI);
        console.log("mongostring ", process.env.MONGOURI);
    } catch (error) {
        console.log("Error in mongoDB connection: ", error);
    }
}

export default connectDB;