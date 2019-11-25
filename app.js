var osu = require('node-os-utils')
var cpu = osu.cpu

setInterval(print, 30000)
setInterval(main, 30000)

function print(){
cpu.usage()
.then(info => {
    console.log('CPU average usage in percentage: ' + info)
  })
  
  var mem = osu.mem
  mem.used()
  .then(info => {
    console.log(info)
  })
  
}

const nodemailer = require('nodemailer');
async function main(){
let testAccount = await nodemailer.createTestAccount()

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
          user: 'ephraim.romaguera78@ethereal.email',
          pass: '3SHcdJRYUah7YRuFay'
    }
})
  
const info = await transporter.sendMail({
    from: '"Tester" <ephraim.romaguera78@ethereal.email>',
    to: 'ajdinl@live.com',
    subject: 'Sending Email using Node.js',
    text: 'some text blablabla',
    html: '<b>Hello from the other side</b>'
  })
  console.log('Message sent: %s', info.messageId)
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))

}

main().catch(console.error)