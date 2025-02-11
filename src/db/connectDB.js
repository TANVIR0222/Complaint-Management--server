import mongoose from "mongoose";

const connectDB = async () => {
    try {
        
        const connectionInstance  = await mongoose.connect(`${process.env.DATABASE_URL}/complaint`)
        console.log(`MongoDB Connected !! DB Host ${connectionInstance.connection.host}`);

    } catch (error) {
        console.log('Mongodb connection Faild : ', error);
        process.exit(1)
        
    }
}

export default connectDB;