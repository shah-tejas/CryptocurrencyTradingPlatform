var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'wt.musicstore@gmail.com',
      pass: 'wt-mstr@123'
    }
  });
  
 exports.sendemail = function(mailTo, subjectLine, emailText){ 
     
    var mailOptions = {
        from: 'no-reply@huskycoin.com',
        to: mailTo,
        subject: subjectLine,
        text: emailText
      };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

}