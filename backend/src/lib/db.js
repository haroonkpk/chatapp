import mongoose from "mongoose";

export default async function connectDB() {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`DB Connect ${conn.connection.host}`)
    } catch(err){
        console.log("DB Connection Failed",err);
    }
};