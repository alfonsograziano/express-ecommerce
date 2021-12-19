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
    const mailOptions = { from, to, subject, html, text: html }

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => { 
            if(err) return reject(err)
            resolve(info)
         })

    })
}


module.exports = sendEmail

