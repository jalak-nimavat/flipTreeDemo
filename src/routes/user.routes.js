import express from 'express';
const router = express.Router();
import joiValidateMiddleware from '../middlewares/joiValidate.middleware.js';
import userSchema from '../joiValidators/user.validator.js';
import {
    register,
    updateProfile,
    verifyMobileNumber,
    verifyOtp,
    getProfile,
    getCountForConnection,
    getConnectionList
} from '../controllers/user.controller.js';
import authorizationMiddelware from '../middlewares/authorization.middleware.js';
import s3upload from '../helpers/imageUpload.helper.js';

router.post('/register', [joiValidateMiddleware(userSchema.register, 'form-data'), s3upload.single('photo')], register);

router.post('/verify-mobile', joiValidateMiddleware(userSchema.verifyMobileNumber, 'body'), verifyMobileNumber);

router.post('/verify-otp', joiValidateMiddleware(userSchema.verifyOtp, 'body'), verifyOtp);

router.put(
    '/',
    joiValidateMiddleware(userSchema.userUpdate, 'form-data'),
    s3upload.single('photo'),
    updateProfile
);
router.get('/get-count-fo-connection', authorizationMiddelware('user'), getCountForConnection);

router.get('/', authorizationMiddelware('user'), getProfile);

router.get('/get-connection-list?viewall=true/false&byCondition=location/job/education/interests', authorizationMiddelware('user'), getConnectionList);

export default router;
