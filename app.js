const osu = require('node-os-utils')
const nodemailer = require('nodemailer')
const cpu = osu.cpu
require('dotenv').config()


setInterval(print, 3000)
setInterval(main, 3000)

let cpuUsage = 0
let memoryUsage = 0

function print(){
  cpu.usage()
  .then(info => {
      cpuUsage = 'CPU average usage in percentage: ' + info + ' '
      console.log(cpuUsage)
    })
    
    const mem = osu.mem
    mem.used()
    .then(info => {
      memoryUsage = info
      console.log(memoryUsage)
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
    to: process.env.DB_TO_MAIL,
    subject: 'Cpu and memory usage',
    text: cpuUsage + JSON.stringify(memoryUsage)
  }

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
    console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }

  })
}