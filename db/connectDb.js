import mongoose from "mongoose";

const connectDB = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true});
        console.log("MongoDB Connected")
    } catch{
        console.error(error.message);
        process.exit(1);
    }
}

export default connectDB;