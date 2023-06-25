import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
    path: path.resolve(__dirname, '../../', process.env.NODE_ENV + '.env'),
});

const getConfig = () => {
    return {
        TOKEN_SECRET: process.env.TOKEN_SECRET || 'sample',
        MONGO_HOST: process.env.MONGO_HOST || 'localhost',
        MONGO_URI: process.env.MONGO_URI,
        MONGO_USERNAME: process.env.MONGO_USERNAME,
        MONGO_PASSWORD: process.env.MONGO_PASSWORD,
        MONGO_DATABASE: process.env.MONGO_DATABASE,
        PORT: process.env.PORT || '3001',
        MAIL_HOST: process.env.MAIL_HOST || 'smtp.gmail.com',
    };
};

export default getConfig;
