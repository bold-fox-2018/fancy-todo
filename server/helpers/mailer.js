const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

module.exports = (verify, user, callback) => {
  const mailOptions = {
    from: 'no-reply@makeitfancy.com',
    to: user.email,
    subject: 'Project Invitation Verification',
    text: `
    Hello, ${user.name},
    Please verify your invitation by clicking the link :
    http://localhost:3000/projects/confrim/${verify.token}
    `
  };

  transporter.sendMail(mailOptions, function(err, info) {
    if (err) {
      callback(err);
    } else {
      // console.log(info);
      callback();
    }
  });
  
};