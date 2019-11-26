const osu = require('node-os-utils')
const nodemailer = require('nodemailer')
const cpu = osu.cpu
require('dotenv').config()


setInterval(print, 30000)
setInterval(main, 30000)

function print(){
  cpu.usage()
  .then(info => {
      console.log('CPU average usage in percentage: ' + info)
    })
    
    const mem = osu.mem
    mem.used()
    .then(info => {
      console.log(info)
    })
}

function main(){

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.DB_MAIL,
      pass: process.env.DB_PASSWORD
    }
  })

  const mailOptions = {
    from: process.env.DB_MAIL,
    to: 'ajdinl@live.com',
    subject: 'Header',
    text: 'Your text message.'
  }

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
    console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }

  })
}