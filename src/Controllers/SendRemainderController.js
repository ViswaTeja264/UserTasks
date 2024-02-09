import nodemailer from 'nodemailer';

const SendReminder = async (req, res) => {
    const { to, subject, text } = req.body;
    console.log(to);
  
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: to,
          pass: 'mkme xmii dxqg nhdo',
        },
      });
    
      const mailOptions = {
        from: to,
        to,
        subject,
        text,
      };
    
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          res.status(500).send({message : 'Error sending email'});
        } else {
          console.log('Email sent successfully');
          res.send({message : 'Email sent successfully'});
        }
      });
  };

  export default SendReminder;