import app from './app.js';
import 'dotenv/config';
import getConfig from './config/config.js';
import sendEmail from './utils/sendEmail.js';

const port = getConfig(process.env.NODE_ENV);

app.listen(port.PORT, () => true);

app.all('*', (req, res, next) => {
    const err = new Error(`Can't find ${req.originalUrl} on this server!`);
    err.status = '400';
    err.statusCode = 404;
    next(err);
});

// eslint-disable-next-line no-unused-vars
app.use(async (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 400;
    let developerMail = getConfig().DEVELOPER_MAIL.split(',');

    const mailBody = `
    <h3><b>User: ${JSON.stringify(req.user)} </b></h3> </br> 
    <h3><b>Route: ${req.url} </b></h3> </br> 
    <h3><b>Method: ${req.method} </b></h3> </br>  
    <h3><b>${err}</b></h3> </br> 
    <h3><b> Payload: ${JSON.stringify(req.body)}</b></h3> </br> `;
    await sendEmail(developerMail, 'sample - Email Log', mailBody);
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});
