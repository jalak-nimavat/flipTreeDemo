import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

const schema = mongoose.Schema;

const commonFieldsSchema = new schema(
    {
        motherTongue: {
            type: Array,
            required: true,
        },
        religion: {
            type: Array,
            required: true,
        },
        caste: {
            type: Array,
            required: true,
        },
        interestAndHobbies: {
            type: Array,
            required: true,
        },
        ideologiesAndBeliefs: {
            type: Array,
            required: true,
        },
        education: {
            type: Array,
            required: true,
        },
        job: {
            type: Array,
            required: true,
        },
        birthStar: {
            type: Array,
            required: true,
        },
        food: {
            type: Array,
            required: true,
        },
        drinking: {
            type: Array,
            required: true,
        },
        smoking: {
            type: Array,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

commonFieldsSchema.plugin(mongoosePaginate);
commonFieldsSchema.plugin(aggregatePaginate);

commonFieldsSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        delete returnedObject.__v;
    },
});

const CommonFieldsModel = mongoose.model('commonFields', commonFieldsSchema);
export default CommonFieldsModel;
