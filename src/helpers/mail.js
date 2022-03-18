// Dependencies
import nodemailer from 'nodemailer'

const forgotPass = (email, token) => {
    const subject = 'Recover your password'
    const urlClient = process.env.URL_CLIENT
    const urlRedirect = `${urlClient}/change-password?token=${token}`
    const templateHTML = `
		<h1>Password reset instructions</h1>
        <p>
            We received a request to reset the password. This link is valid for the next 24 hours: &nbsp;
            <a href="${urlRedirect}">Recover Password</a>
        </p>        		
	`
    return sendMailInfo(email, subject, templateHTML)
}

const passChanged = email => {
    const subject = 'Password changed successfully'
    const urlClient = process.env.URL_CLIENT
    const templateHTML = `
		<h1>Password changed successfully</h1>
        <p>
            Now you can login into the app. <a href="${urlClient}">Go to App</a>            
        </p>        		
	`
    return sendMailInfo(email, subject, templateHTML)
}

const sendMailInfo = async (to, subject, templateHTML) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
            user: process.env.EMAIL_AUTH_USER,
            pass: process.env.EMAIL_AUTH_PASS,
        },
        tls: {
            rejectUnauthorized: false,
        },
    })

    const info = await transporter.sendMail({
        from: `Job Finder App <${process.env.EMAIL_AUTH_USER}>`,
        to,
        subject,
        html: templateHTML,
    })

    return info
}

module.exports = {
    forgotPass,
    passChanged,
}
