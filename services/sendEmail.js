const nodeMailer = require("nodemailer")
const keys = require('../config/keys')

const options = {
    host: keys.SMTP_SERVER,
    port: keys.SMTP_PORT,
    secure: true,
    auth: {
        user: keys.EMAIL,
        pass: keys.PSW_EMAIL
    }
}

const transporter = nodeMailer.createTransport(options)

const sendEmail = (from, to, subject, html) => {

    //TODO: Parse html into text, but how to handle links?
    const mailOptions = { from, to, subject, html, text: "Text version of the email..." }

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) return reject(err)
            resolve(info)
        })

    })
}



const sendSignupEmail = (to, url) => {
    const html = "<p> Hello, thank you for registering. Here is the link to activate your account! <a href='" + url + "'> Click here </a> </p> <br/> <p > If the link doesn't work, paste this link into your browser: " + url + " </p> "
    return sendEmail(keys.NO_REPLY_EMAIL, to, `Welcome to ${keys.SITE_NAME}`, html)
}


const sendWelcomeEmail = (to) => {
    return sendEmail(keys.NO_REPLY_EMAIL, to, `Account activated`, "Now your account is activated, you can start make orders on our platform")
}

const sendPasswordRecoveryEmail = (to, url) => {
    const html = `<p> As you requested, here is the link to change your password: <a href='${url}'> ${url} </a> <br> If you have not requested to change your password, ignore this mail` 
    return sendEmail(keys.NO_REPLY_EMAIL, to, `Password recovery request`, html)
}


module.exports = {
    sendEmail,
    sendSignupEmail,
    sendWelcomeEmail,
    sendPasswordRecoveryEmail
}

