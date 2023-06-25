import userServices from '../services/user.service.js';
import apiResponse from '../helpers/apiResponse.helper.js';
import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

const register = async (req, res, next) => {
    try {
        const {
            name,
            dob,
            phoneNumber,
            motherTongue,
            religion,
            location,
            email,
            maritalStatus,
            height,
            caste,
            birthStar,
            education,
            job,
            bio,
            food,
            drinking,
            smoking,
            ideologiesAndBeliefs,
            hobbies,
        } = req.body;

        // if success response
        return apiResponse(res, {
            code: 201,
            status: 200,
            message: 'profile updated successfully.',
            data: { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUwN2YxZjc3YmNmODZjZDc5OTQzOTAxMSIsIm5hbWUiOiJKaW51IEphY29iIiwiaWF0IjoxNTE2MjM5MDIyfQ.N2XEnp5SwTfEfRu3bOyaMpu1_zxTjqsjhe5oDD66zdY', user: { name: "Jinu Jacob", dob: "20-07-1992", phoneNumber: +918888888888, motherTongue: "Malayalam", religion: "Hindu", location: "Kaloor, Ernakulam, Kerala, India", email: 'jinu@yopmail.com', maritalStatus: 'single', height: 167, caste: 'Hindu-Nair', birthStar: 'aswathy', ifDisabled: 0, education: 'BE-computer science', job: 'software engineer', bio: 'This is demo to show', food: 'non veg', drinking: 'occassional drinker', smoking: 'non-smoker', ideologiesAndBeliefs: 'spiritual', hobbies: ['cooking', 'cycling'], showFullName: 1, showDob: 1, showLocation: 1, referralCode: 'A3523SFG', profileImage: 'profile photo url' } }
        });

    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({
                status: 400,
                message: 'Email address already register with us',
            });
        } else next(error);
    }
};

const verifyOtp = async (req, res, next) => {
    try {
        const { phoneNumber, otp } = req.body;
        // if success
        return apiResponse(res, {
            code: 201,
            status: 200,
            message: 'OTP verified.',
        });

        // if fails: {
        //     code: 400,
        //     status: 400,
        //     message: "OTP does't match.",
        // }
    } catch (e) {
        next(e);
    }
};

const verifyMobileNumber = async (req, res, next) => {
    try {
        apiResponse(res, {
            code: 201,
            status: 200,
            message: 'OTP sent to mobile number.',
        });

        // if registration fails with existing mobile number:
        apiResponse(res, {
            code: 400,
            status: 400,
            message: 'Mobile number already exists. Please login',
        });
    } catch (err) {
        next(err);
    }
};

const getCountForConnection = async (req, res, next) => {
    try {
        const { _id } = req.user;

        // if success:
        //     {
        //         code: 201,
        //             status: 200,
        //                 data: { connectionRequests: 14, shortlistedProfiles: 14, recentlyViewed: 14, profileVisitors: 14 }
        //     }
    } catch (error) {
        next(error);
    }
};

const getProfile = (req, res, next) => {
    const { _id } = req.user;
    userServices
        .getById(_id)
        .then((user) =>
            apiResponse(res, {
                code: 200,
                status: 200,
                data: user,
            })
        )
        .catch((e) => next(e));
};

const updateProfile = async (req, res, next) => {
    try {
        const { _id } = req.user;
        // if success:
        //     {
        //         code: 201,
        //             status: 200,
        //                 message: 'profile updated successfully.',
        //             }
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({
                status: 400,
                message: 'Email address already register with us',
            });
        } else next(error);
    }
};

const getConnectionList = async (req, res, next) => {
    try {
        const { _id } = req.user;

        // if success:
        //     {
        //         code: 201,
        //             status: 200,
        //                 data: {
        //                     newMatches: {
        //                         count: 145
        //                         profiles: {
        //                             // profiles lists
        //                         }
        //                     },
        //             nearByProfiles: {
        //                 // profiles lists
        //             }
        //         }
    } catch (error) {
        next(error);
    }
};

export {
    register,
    getProfile,
    verifyOtp,
    updateProfile,
    verifyMobileNumber,
    getCountForConnection,
    getConnectionList
};
