import apiResponse from '../helpers/apiResponse.helper.js';
import jwt from 'jsonwebtoken';
import getConfig from '../config/config.js';
const secret = getConfig(process.env.NODE_ENV);

export default () => {
    return (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        // from postman
        if (!req.header('Origin')) {
            // if token is passed from postman, join the user object
            if (token) {
                jwt.verify(token, secret.TOKEN_SECRET || 'sample', (err, user) => {
                    if (err)
                        return apiResponse(res, {
                            code: 403,
                            status: 400,
                            message: err.message,
                        });

                    req.user = user;
                    next();
                });
            } else {
                // no token
                next();
            }
            return;
        }
        const domainName = req.header('Origin').split('//')[1]
            ? req.header('Origin').split('//')[1]
            : req.header('Origin');
        const userDomains = process.env.USER_DOMAIN.split(',');

        const adminDomains = process.env.ADMIN_DOMAIN.split(',');

        if (userDomains.includes(domainName)) {
            if (token) {
                jwt.verify(token, secret.TOKEN_SECRET || 'sample', (err, user) => {
                    if (err)
                        return apiResponse(res, {
                            code: 403,
                            status: 400,
                            message: err.message,
                        });

                    req.user = user;
                    next();
                });
            } else {
                // no token
                next();
            }
        } else if (adminDomains.includes(domainName)) {
            if (!token)
                return apiResponse(res, {
                    code: 401,
                    status: 400,
                    message: 'Access token is missing in the request header.',
                });

            jwt.verify(token, secret.TOKEN_SECRET || 'sample', (err, user) => {
                if (err)
                    return apiResponse(res, {
                        code: 403,
                        status: 400,
                        message: err.message,
                    });

                req.user = user;

                next();
            });
        } else {
            return apiResponse(res, {
                code: 500,
                status: 500,
                message: 'Domain not allowed.',
            });
        }
    };
};
