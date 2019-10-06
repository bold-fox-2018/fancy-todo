const nodemailer = require('nodemailer');

function sendEmail(user){
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });
  let mailOptions = {
    from: 'hacktivoverflow@gmail.com',
    to: user.email,
    subject: "You've Been Invited To Join Project",
    text: "Check Our Fancy Todo",
    html: `<a href="${process.env.FANCYTODO}">Go To Fancy Todo Right Now</a>`
  };
  
  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, done) {
    if(error){
      console.log(error)
    } else {
      done()
    }
  })
}

module.exports = sendEmail