import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
import getConfig from '../config/config.js';

const s3 = new S3Client({
    region: 'ap-south-1',
    credentials: {
        accessKeyId: getConfig().AWS_ACCESS_KEY_ID,
        secretAccessKey: getConfig().AWS_SECRET_ACCESS_KEY,
    },
});

const upload = multer({
    // fileFilter,
    storage: multerS3({
        acl: 'public-read',
        s3,
        bucket: 'sample',
        s3BucketEndpoint: true,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: 'sample' });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString());
        },
    }),
});

export default upload;
