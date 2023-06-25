import mongoose from 'mongoose';
import 'dotenv/config';
import getConfig from './config.js';

const connectDB = async () => {
    try {
        const db = getConfig(process.env.NODE_ENV);
        const host = db.MONGO_HOST;
        const username = db.MONGO_USERNAME;
        const password = db.MONGO_PASSWORD;
        const database = db.MONGO_DATABASE;
        const dbUrl = `mongodb://${username}:${encodeURIComponent(password)}@${host}:27017/${database}`;
        await mongoose.connect(dbUrl);
    } catch (e) {
        console.log(e)
        process.exit(-1);
    }
};

export default connectDB;
