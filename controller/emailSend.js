import nodemailer from 'nodemailer';
import User from '../model/user.model.js';
// import addToGoogleSheet from '../utils/googleSheet.js';

const emailSend = async (req, res) => {
  try {
    const { email, name } = req.body;

    console.log(email, name);
    
    
    if (!email || !name) {
      return res.status(400).json({ message: 'Email & Name required' });
    }
    console.log('Received request:', name, email);
    
    console.log("run");
    
    
    // 💾 Save to database (only email & name)
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ name, email });
      await user.save();
      console.log('User saved to DB ✅', user);
    } else {
      console.log('User already exists in DB ✅', user);
    }


    // transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    
    // Colors
    const colors = {
      darkBlue: '#1B2A41',
      offWhite: '#F0EEE9',
      beige: '#D1C7BD',
      brown: '#8E795E',
      blackBlue: '#0D1321',
    };
    
    // Admin email
    const adminMail = {
      from: `"Vexoraa" <${process.env.EMAIL_USER}>`,
      to: 'yp7201007221@gmail.com',
      subject: 'New User Contact',
      html: `
      <div style="font-family:Arial; background:${colors.offWhite}; padding:20px">
      <h2 style="color:${colors.darkBlue}">New User Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <hr />
      <p style="color:${colors.brown}">Vexoraa Backend</p>
      </div>
      `,
    };
    
    // User email
    const userMail = {
      from: `"Vexoraa Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Thank you for contacting Vexoraa',
      html: `
      <div style="font-family:Arial; background:${colors.blackBlue}; padding:25px; color:white">
      <h2 style="color:${colors.beige}">Hello ${name},</h2>
      <p>You’re in! Early access + exclusive discount on our <strong>Premium Shirts</strong> awaits.</p>
      <p>We’ll be in touch as soon as the collection drops.</p>
      <img src="cid:paletteImage" alt="Color Palette" style="width:100%; border-radius:8px; margin-top:15px"/>
      <p style="margin-top:20px; color:${colors.brown}">
      Regards,<br/>
      The Vexoraa Team
      </p>
      </div>
      `,
      attachments: [
        { filename: 'palette.png', path: './assets/palette.png', cid: 'paletteImage' },
      ],
    };
    
    
    // send emails
    await transporter.sendMail(adminMail);
    await transporter.sendMail(userMail);
    
    // await addToGoogleSheet(name, email);

    res.status(200).json({ message: 'Emails sent & user saved successfully ✅' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Email sending failed ❌' });
  }
};

export default emailSend;
