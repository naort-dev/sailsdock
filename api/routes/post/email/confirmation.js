// Modules
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import nodemailer from 'nodemailer'
require('dotenv').config()
// Secret
const app = express()
app.use(express.json())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
app.use(
  cors({
    origin: process.env.BASE_URL
  })
)
app.post('/customer/confirmation', (req, res) => {
  if (req.body.email) {
    const output = `
    <!--

    HTML Email Receipt
    
    https://tikken.com
    
    Original design by Daniel Hendricks | Tikken Inc | Tikken AS
    https://dribbble.com/shots/3081118-Email-Receipt-Daily-UI-017
    -->
    
    <!DOCTYPE html>
    <html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <meta charset="utf8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <meta name="x-apple-disable-message-reformatting">
      <title>Your reservation is now confirmed</title>
    
      <!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet"><!--<![endif]-->
    
      <!--[if mso]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
      <style>
        table {border-collapse: collapse;}
        td,th,div,p,a,h1,h2,h3,h4,h5,h6 {font-family: "Segoe UI", sans-serif; mso-line-height-rule: exactly;}
      </style>
      <![endif]-->
      <style>
        @media screen {
          img {
            max-width: 100%;
          }
          td,
          th {
            box-sizing: border-box;
          }
          u~div .wrapper {
            min-width: 100vw;
          }
          a[x-apple-data-detectors] {
            color: inherit;
            text-decoration: none;
          }
          .all-font-roboto {
            font-family: Roboto, -apple-system, "Segoe UI", sans-serif !important;
          }
          .all-font-sans {
            font-family: -apple-system, "Segoe UI", sans-serif !important;
          }
        }
        @media (max-width: 600px) {
          .sm-inline-block {
            display: inline-block !important;
          }
          .sm-hidden {
            display: none !important;
          }
          .sm-leading-32 {
            line-height: 32px !important;
          }
          .sm-p-20 {
            padding: 20px !important;
          }
          .sm-py-12 {
            padding-top: 12px !important;
            padding-bottom: 12px !important;
          }
          .sm-text-center {
            text-align: center !important;
          }
          .sm-text-xs {
            font-size: 12px !important;
          }
          .sm-text-lg {
            font-size: 18px !important;
          }
          .sm-w-1-4 {
            width: 25% !important;
          }
          .sm-w-3-4 {
            width: 75% !important;
          }
          .sm-w-full {
            width: 100% !important;
          }
        }
      </style>
      <style>
        @media (max-width: 600px) {
          .sm-dui17-b-t {
            border: solid #4299e1;
            border-width: 4px 0 0;
          }
        }
      </style>
    </head>
    <body style="box-sizing: border-box; margin: 0; padding: 0; width: 100%; word-break: break-word; -webkit-font-smoothing: antialiased; background-color: #cedff5;">
      <div style="display: none; line-height: 0; font-size: 0;">Hi, you have a new order from ${req.body.organization} ✔</div>
      <table class="wrapper all-font-sans" width="100%" height="100%" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
          <td align="center" style="padding: 24px;" width="100%">
            <table class="sm-w-full" width="600" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td colspan="2" class="sm-inline-block" style="display: none;">
                  <img src="https://images.unsplash.com/photo-1584926690616-41691dd1db9d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&w=600&h=400&q=80&fit=crop" alt="Double Room" style="border: 0; line-height: 100%; vertical-align: middle; border-top-left-radius: 4px; border-top-right-radius: 4px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -2px rgba(0, 0, 0, .05);">
                </td>
              </tr>
              <tr>
                <td class="sm-hidden" style="padding-top: 40px; padding-bottom: 40px;" width="160">
                  <img src="https://images.unsplash.com/photo-1584926690616-41691dd1db9d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=320&h=800&q=80&fit=crop" alt="Double room" style="border: 0; line-height: 100%; vertical-align: middle; border-top-left-radius: 4px; border-bottom-left-radius: 4px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -2px rgba(0, 0, 0, .05);" width="160">
                </td>
                <td align="left" class="sm-p-20 sm-dui17-b-t" style="border-radius: 2px; padding: 40px; position: relative; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -2px rgba(0, 0, 0, .05); vertical-align: top; z-index: 50;" bgcolor="#ffffff" valign="top">
                  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                      <td width="80%">
                        <h1 class="sm-text-lg all-font-roboto" style="font-weight: 700; line-height: 100%; margin: 0; margin-bottom: 4px; font-size: 24px;">New order</h1>
                        <p class="sm-text-xs" style="margin: 0; color: #a0aec0; font-size: 14px;">Customer #${req.body.id}</p>
                        <p class="sm-text-xs" style="margin: 0; color: #a0aec0; font-size: 14px;">Time: #${req.body.time}</p>
                        <p class="sm-text-xs" style="margin: 0; color: #a0aec0; font-size: 14px;">Date: #${req.body.date}</p>
                        <p class="sm-text-xs" style="margin: 0; color: #a0aec0; font-size: 14px;">Domain: #${req.body.uri}</p>
                      </td>
                      <td style="text-align: right;" width="20%" align="right">
                        <a href="https://example.com" target="_blank" style="text-decoration: none;">
                          <img src="https://image0.flaticon.com/icons/png/128/872/872220.png" alt="Download PDF" style="border: 0; line-height: 100%; vertical-align: middle; font-size: 12px;" width="24">
                        </a>
                      </td>
                    </tr>
                  </table>
                  <div style="line-height: 32px;">&zwnj;</div>
                  <table class="sm-leading-32" style="line-height: 28px; font-size: 14px;" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                      <td class="sm-inline-block" style="color: #718096;" width="50%">Entity</td>
                      <td class="sm-inline-block" style="font-weight: 600; text-align: right;" width="50%" align="right">${req.body.entity}</td>
                    </tr>
                    <tr>
                      <td class="sm-inline-block" style="color: #718096;" width="50%">Org</td>
                      <td class="sm-inline-block" style="font-weight: 600; text-align: right;" width="50%" align="right">${req.body.organization}</td>
                    </tr>
                    <tr>
                      <td class="sm-inline-block" style="color: #718096;" width="50%">Name</td>
                      <td class="sm-inline-block" style="font-weight: 600; text-align: right;" width="50%" align="right">${req.body.name}</td>
                    </tr>
                    <tr>
                      <td class="sm-inline-block" style="color: #718096;" width="50%">Email</td>
                      <td class="sm-inline-block" style="font-weight: 600; text-align: right;" width="50%" align="right">${req.body.email}</td>
                    </tr>
                    <tr>
                      <td class="sm-inline-block" style="color: #718096;" width="50%">Phone</td>
                      <td class="sm-inline-block" style="font-weight: 600; text-align: right;" width="50%" align="right">${req.body.phone}</td>
                    </tr>
                  </table>
                  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                      <td style="padding-top: 24px; padding-bottom: 24px;">
                        <div style="background-color: #edf2f7; height: 2px; line-height: 2px;">&zwnj;</div>
                      </td>
                    </tr>
                  </table>
                  ${req.body.order}
                  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                      <td style="padding-top: 24px; padding-bottom: 24px;">
                        <div style="background-color: #edf2f7; height: 2px; line-height: 2px;">&zwnj;</div>
                      </td>
                    </tr>
                  </table>
                  <table style="line-height: 28px; font-size: 14px;" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                      <td style="color: #718096;" width="50%">Address</td>
                      <td style="font-weight: 600; text-align: right;" width="50%" align="right">${req.body.street}</td>
                    </tr>
                    <tr>
                      <td style="color: #718096;" width="50%">Zip</td>
                      <td style="font-weight: 600; text-align: right;" width="50%" align="right">${req.body.zip}</td>
                    </tr>
                    <tr>
                      <td style="color: #718096;" width="50%">City</td>
                      <td style="font-weight: 600; text-align: right;" width="50%" align="right">${req.body.city}</td>
                    </tr>
                    <tr>
                      <td style="color: #718096;" width="50%">Country</td>
                      <td style="font-weight: 600; text-align: right;" width="50%" align="right">${req.body.country}</td>
                    </tr>
                  </table>
                   <table style="margin-top: 2rem;">
                    <tr>
                      <td style="color: #718096; font-size: 10px;" width="50%">The order has been published in spreadsheet. For your reference you can look it up by using order id: ${req.body.id}</td>
                    </tr>
                   </table>
                    <div style="width: 100%; text-align: center; font-size: 12px; margin-top: 2rem;"> © 2020 Eustandardmask.com</div>
                </td>

              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
    `

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // generated ethereal user
        pass: process.env.EMAIL_SECRET // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false // Set true for production mode, false for development
      }
    })

    // setup email data with unicode symbols
    const mailOptions = {
      from: process.env.EMAIL_USER, // sender address (`${req.body.email}`)
      to: ['daniel@tikken.no'], // list of receivers contact@eustandardmask.com
      subject: `Contact request`, // Subject line (`${req.body.subject}`),
      text: req.body.content, // plain text body
      html: output // html body
    }

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error)
      }
      console.log('Message sent: %s', info.messageId)
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))

      res.render('contact', {
        msg: 'Email has been sent'
      })
    })
    res.status(200).json({ success: 200 })
  } else {
    res.send(404)
  }
})

// Export
export default {
  path: '/api/order/',
  handler: app
}
