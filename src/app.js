/* eslint-disable no-case-declarations */
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import unless from 'express-unless';
import connectDB from './config/db.js';
import userRouter from './routes/user.routes.js';
import { authenticateToken } from './helpers/jwt.helper.js';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

connectDB();
const app = express();
app.use(cors({ credentials: true, origin: '*' }));
app.use(express.json({ limit: '50mb' }));

app.use(
    bodyParser.urlencoded({
        extended: false,
        limit: '50mb',
    })
);
app.use(helmet());
app.use(mongoSanitize());
app.use(cookieParser());

// ignore specific routes for validiting by user
authenticateToken.unless = unless;
app.use(
    authenticateToken.unless({
        path: [
            { url: '/user/verify-mobile', methods: ['POST'] },
            { url: '/user/register', methods: ['POST'] },
            { url: '/user/verify-otp', methods: ['POST'] },
        ],
    })
);

app.use('/user', userRouter);

export default app;
