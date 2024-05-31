import mongoose from "mongoose";

const connectDB = async () =>{
    try{
        const conn = await mongoose.connect(`mongodb+srv://ishaan:3151095@cluster0.gg1wljs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,{useNewUrlParser: true});
        console.log("MongoDB Connected")
    } catch{
        console.error(error.message);
        process.exit(1);
    }
}

export default connectDB;