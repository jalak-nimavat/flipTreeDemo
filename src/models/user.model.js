import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

const schema = mongoose.Schema;

const userSchema = new schema(
    {
        name: {
            type: String,
            required: true,
        },
        dob: {
            type: Date,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        motherTongue: {
            type: String,
            required: true,
        },
        religion: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        maritalStatus: {
            type: String,
            required: true,
        },
        // height will be stored in cm
        height: {
            type: Number,
            required: true,
        },
        caste: {
            type: String,
            required: true,
        },
        birthStar: {
            type: String,
            required: true,
        },
        ifDisabled: {
            type: Boolean,
            default: false,
        },
        education: {
            type: String,
            required: true,
        },
        job: {
            type: String,
            required: true,
        },
        bio: {
            type: String,
            required: true,
        },
        food: {
            type: String,
            required: true,
        },
        drinking: {
            type: String,
            required: true,
        },
        smoking: {
            type: String,
            required: true,
        },
        ideologiesAndBeliefs: {
            type: String,
            required: true,
        },
        hobbies: {
            type: Array,
            required: true,
        },
        showFullName: {
            type: Boolean,
            default: true,
        },
        showDob: {
            type: Boolean,
            default: false,
        },
        showDob: {
            type: Boolean,
            default: false,
        },
        image: {
            type: String,
            required: true,
        },
        referralCode: {
            type: String,
            required: false,
        },
    },
    { timestamps: true, autoIndex: true }
);

userSchema.plugin(aggregatePaginate);
userSchema.plugin(mongoosePaginate);

userSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        delete returnedObject.__v;
    },
});

const UserModel = mongoose.model('users', userSchema);
export default UserModel;
