// import SendOTPRepository from './sendOTP.repository.js';
// import nodemailer from 'nodemailer';

// export default class SendOTPController{
//     constructor(){
//         this.sendOTPRepository = new SendOTPRepository();
//         this.otpStore = new Map(); // Temporary in-memory storage for OTPs (use Redis/DB in production)
//     }

//     async send(req, res){
//         const {useremail} = req.body; 
        
//         //1. Create transporter
//         const transporter = nodemailer.createTransport({
//             service:'gmail',
//             auth:{
//                 user:'codingninjas2k16@gmail.com',
//                 pass:'slwvvlczduktvhdj',
//                 // pass:'bpctcyawmzijrdtx',
//             },
//         });
//         const otp = Math.floor(1000 + Math.random() * 9000);
//         //2. Configure email
//         const mailOptions = {
//             from:'codingninjas2k16@gmail.com',
//             to:useremail,
//             subject:'Coding Ninjas',
//             text:'The world has enough coders; be a coding ninja! Your OTP is' + otp,
//         };
    
//         try {
//             //3. sent email
//             const result = await transporter.sendMail(mailOptions);
//             //save otp and timestamp in memory
//             this.otpStore.set(useremail, { otp, timestamp: Date.now() });
//             res.send('Email sent successfully')
//             console.log('Email Sent Successfully');
            
//         } catch (err) {
//             console.log("Failed to sent mail: "+err);
//             res.status(500).send('Failed to send OTP');
            
//         }   
        
        
//     }
//     async verify(req, res){
//         const {otp} = req.body;
//         //write code here

//     }
//     async resetPassword(req, res){
//         //write code here
//     }
// }


import SendOTPRepository from './sendOTP.repository.js';
import nodemailer from 'nodemailer';

export default class SendOTPController {
    constructor() {
        this.sendOTPRepository = new SendOTPRepository();
        this.otpStore = new Map(); // Temporary in-memory storage for OTPs (use Redis/DB in production)
    }

    async send(req, res) {
        const { useremail } = req.body;

        // 1. Create transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'codingninjas2k16@gmail.com',
                pass: 'slwvvlczduktvhdj',
            },
        });

        // 2. Generate OTP
        const otp = Math.floor(1000 + Math.random() * 9000);

        // 3. Configure email
        const mailOptions = {
            from: 'codingninjas2k16@gmail.com',
            to: useremail,
            subject: 'Coding Ninjas',
            text: 'The world has enough coders; be a coding ninja! Your OTP is ' + otp,
        };

        try {
            // 4. Send email
            const result = await transporter.sendMail(mailOptions);
            // Save OTP and timestamp in memory (better to use a database)
            this.otpStore.set(useremail, { otp, timestamp: Date.now() });
            res.send('Email sent successfully');
            console.log('Email Sent Successfully');
        } catch (err) {
            console.log('Failed to send mail: ' + err);
            res.status(500).send('Failed to send OTP');
        }
    }

    async verify(req, res) {
        const { useremail, otp } = req.body;

        // Retrieve OTP from memory
        const storedOtpData = this.otpStore.get(useremail);

        if (!storedOtpData) {
            return res.status(400).send('No OTP found for this email.');
        }

        const { otp: storedOtp, timestamp } = storedOtpData;

        // Check OTP validity (e.g., within 5 minutes)
        const isOtpExpired = Date.now() - timestamp > 5 * 60 * 1000; // 5 minutes

        if (isOtpExpired) {
            this.otpStore.delete(useremail);
            return res.status(400).send('OTP has expired. Please request a new one.');
        }

        if (otp == storedOtp) {
            this.otpStore.delete(useremail); // Clear OTP after successful verification
            return res.status(200).send('OTP verified successfully');
        } else {
            return res.status(400).send('Invalid OTP');
        }
    }

    async resetPassword(req, res) {
        const { useremail, newPassword } = req.body;

        try {
            // Check if the user exists in the database
            const user = await this.sendOTPRepository.findUserByEmail(useremail);
            if (!user) {
                return res.status(404).send('User not found');
            }

            // Hash the new password (bcrypt recommended)
            const hashedPassword = await this.sendOTPRepository.hashPassword(newPassword);

            // Update the password in the database
            await this.sendOTPRepository.updatePassword(useremail, hashedPassword);

            res.status(200).send('Password reset successfully');
        } catch (error) {
            console.error('Error resetting password:', error);
            res.status(500).send('Failed to reset password');
        }
    }
}
