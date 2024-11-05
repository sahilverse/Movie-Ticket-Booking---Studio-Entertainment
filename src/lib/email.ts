import nodemailer from 'nodemailer';

interface EmailOptions {
    to: string;
    subject: string;
    html: string;

}


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


export const sendEmail = async ({ to, subject, html }: EmailOptions): Promise<void> => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html
    };

    try {

        await transporter.sendMail(mailOptions);

    } catch (error) {

        console.log('Error sending email', error);

    }
}