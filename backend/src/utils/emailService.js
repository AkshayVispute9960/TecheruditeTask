import nodemailer from 'nodemailer'
// dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const sendVerificationEmail = async (email, verificationToken) => {
    const verificationUrl = `http://localhost:3000/verify-email?token=${verificationToken}`;
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Verify Your Email',
        html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email.</p>`,
    });
};


export default sendVerificationEmail
