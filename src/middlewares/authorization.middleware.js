import apiResponse from '../helpers/apiResponse.helper.js';

export default (...permittedRoles) => {
    return (req, res, next) => {
        const { user } = req;
        if (user && permittedRoles.includes(user.role)) {
            next();
        } else {
            return apiResponse(res, {
                code: 403,
                status: 400,
                message: 'Forbidden',
            });
        }
    };
};
