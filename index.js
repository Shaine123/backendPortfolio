const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const nodeMailer = require('nodemailer')
const app = express()

dotenv.config()

const portNum = process.env.PORT
app.use(cors())
app.use(express.json())

let transporter = nodeMailer.createTransport({
   host: 'smtp.gmail.com',
   port: 465,
   secure: true,
   auth: {
     user: process.env.EMAIL,
     pass: process.env.PASSWORD
   }
})

app.post('/sendEmail',(req,res) => {
    const {to,subject ,text,html} = req.body

    const sendNewMessage = {
       from: `Me <shaineberdida@gmail.com>`,
       to: to,
       subject: subject,
       text: text,
       html: html
    }

    transporter.sendMail(sendNewMessage,(error,info) => {
       if(error){
         console.log(`Error exist: ${error}`)
       }
       console.log(`Message Sent: ${info.messageId}`)
    })
})


app.listen(portNum,() => {
    console.log(`Server Started on Port:${portNum}`)
})