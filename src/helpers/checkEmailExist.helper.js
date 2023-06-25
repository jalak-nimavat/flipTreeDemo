import userServices from '../services/user.service.js';
import apiResponse from './apiResponse.helper.js';

const checkEmailExists = (req, res, next) => {
    userServices
        .getByEmail(req.body.email.toLowerCase())
        .then((data) => {
            data
                ? apiResponse(res, {
                      code: 409,
                      status: 400,
                      message: 'Email already exists!!',
                  })
                : next();
        })
        .catch((e) => next(e));
};

export default checkEmailExists;
