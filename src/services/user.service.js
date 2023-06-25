import UserModel from '../models/user.model.js';

//sample to operate database query

const add = async (param) => {
    const newUser = new UserModel(param);
    return await newUser.save();
};

const userService = {
    add
};

export default userService;
