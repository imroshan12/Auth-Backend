import 'dotenv/config';
import mongoose from 'mongoose';
const { MONGODB_URI } = process.env;

const connectToDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('DB connected')
    } catch (err) {
        console.log('Error connecting to the DB..')
    }
}

export default connectToDB;