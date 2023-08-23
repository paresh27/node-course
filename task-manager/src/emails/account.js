const nodemailer = require("nodemailer");

const user = process.env.MAILTRAP_USER;
const pass = process.env.MAILTRAP_PASS;


var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {user, pass}
});


const sendWelcomeEmail = (email, name) => {

    transport.sendMail({
        from: 'taskmanager@test.com',
        to: email, // list of receivers
        subject: "Welcome to task manager", // Subject line
        html: `<b>Hello ${name}</b>`, // html body
      });
}

const sendCancelEmail = (email, name) => {
    transport.sendMail({
        from: 'taskmanager@test.com',
        to: email, // list of receivers
        subject: "We're sorry to loose you!", // Subject line
        html: `<b>Hey ${name} can you please share with us the reason for leaving?</b>`, // html body 
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
};