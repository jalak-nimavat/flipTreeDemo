import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

const schema = mongoose.Schema;

const otpSchema = new schema(
    {
        phone: {
            type: Number,
            required: true
        },
        otp: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

otpSchema.plugin(mongoosePaginate);
otpSchema.plugin(aggregatePaginate);

currentSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 });

const OtpModel = mongoose.model('commonFields', otpSchema);
export default OtpModel;
