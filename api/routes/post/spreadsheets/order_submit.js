/* / By Daniel Hendricks | Tikken.com
/* / Google spreadsheet API module
/* / Ref to error docs: https://theoephraim.github.io/node-google-spreadsheet/#/
/* /
/* / --------------------------------------------------------------------------------------------- / */
/* / -------------------------------- Import ----------------------------------------------------- / */
/* / --------------------------------------------------------------------------------------------- / */
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
const app = express()
require('dotenv').config()
/* / --------------------------------------------------------------------------------------------- / */
/* / -------------------------------- App use ---------------------------------------------------- / */
/* / --------------------------------------------------------------------------------------------- / */
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
/* / --------------------------------------------------------------------------------------------- / */
/* / -------------------------------- Setup intent  ---------------------------------------------- / */
/* / --------------------------------------------------------------------------------------------- / */
app.post('/submit', async (req, res, next) => {
  if (req.body.order) {
    const { GoogleSpreadsheet } = require('google-spreadsheet')
    const doc = new GoogleSpreadsheet(
      '1ePQUUnoK0tfDhUhd27bNLb0kKmb94EcNz-KzsuoBivM'
    )
    // await doc.useServiceAccountAuth(require('../config/google/credentials.json'))
    // use service account creds
    await doc.useServiceAccountAuth({
      client_email: 'tikken@cogent-spirit-272004.iam.gserviceaccount.com',
      private_key:
        '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDIDQRxpLZCz0yC\nlCFbJUkEh1BcnUowCUPAQF7YmT9MCpnXv/uKl7VAkVDFAK77VM1o7hGPMsxJDTaS\nP0ZNJ12pwr27ZJuW4184JxBd+0jOetkc5IKwVUolEk8JYw7aMeE2W1gMlQhGB8ys\nRAiwH1qtuY/VSSBQNYEU5m+lQnVf1K84W30qK/MmdzscOcM387LG0eg41ante00B\nY+v59XEQZp30PbIIlUIQuFfx5ZQr8PxcuxR8fFob5c2foGxqKsI+hDE8W3Qnry1/\n4SqhUyDPaT2mfcnpgHuTYSuIJjPIEnSmRspu4sQn2t7ti5B//lBbouWbO3seFuWv\nlpMAfQGrAgMBAAECggEAXGdC37k8pMR66y+/7olc3lYgRP80Ntb4r/MrvDGg/p9A\n61qWtjAX/SCCJdUIfjfv/2FDxBirKq0LQWcvslCWH2U/3TB9+6a/o0DL+xUoTpOI\n+KMGSKvEqTX5QvU59YgnpkNv+rPWE/7jR8jPGIcLDAaTzOlPnyzvmDdOZ4+4ho/2\nY8q6UiU0ycnoEc4liElQdylysQ9QSj/CSD/BUa+7RnvbKV51HUbURuB6De3ABFAD\nQ99cMc8FC5+eclLT05ZW1O6k9Xo2mlJcfnm4RYS9fpPeWtx6/EWkpT3CK4wBQLYU\nRDXhVVgNlclWVlk7cQ7pBpMN4n9rHLwZjQkFWR5VZQKBgQDkOyRdUdhaGJc9AAL4\nHSwKLsQFQAtXTMnQ/TSMsAj3oo6apj7BVy8soR8AnD4Wo6EehT/eIRoDwSQ5nlqQ\n0r/N7ZlRCYm0KanH/rbHAQ7c6fvUptYNKxciceUingLdBj9mKA4JWEiPY9PUiyhB\nPd31bFRy+s0OorAK+jLINzboxQKBgQDgZCEdV8db/NmLpl3guq2a8vlZuwjVHIJG\nKuiN7bKa0rpjM+9q+wQDlguxz3niICUledv3TCORZg+/e1tuB7bXlgbSewWj5O4Y\naNZ5d8rVfFtm51W5e0fFaaJvBPhRDi/AdJrmNjTVxq3q478sYUhRLhShBBnB8OCq\n+iwuY6SHrwKBgQDLklUlR9OKyVRc/J2pYZvemUgOxslW3Q9GchNlSb814rEAEDj5\niyJw1GYqzTI0T09vQbtuDmh94NDG9BAkDVc3/y45siA5qs/dq7ysVK1FLw+I5icX\nJ9BC0QRolDhJnUD/hcq/WxedjpVrh5QoXV6VgkLxK/OrkkEkCXcyTs2TYQKBgFhI\n7QJ3e9eEZy9buInnyNAzEsosHXCDs/nZfgABaokhqfXIBEXKFy02BsnhwKmoThUt\nmc71pPTa/A0xgqqK3HR78Zk0j+aI9uihrujBqgtOz0Nwdzjv+TABvMgDY5O4ii8l\ncaBr6WPGtLy6+IeEiwhtoe4sB9pXZH3AyktCJwS/AoGBANA7B3QSXY5WiemU8iOi\nH9jW7eEkMeT5a0f0KWeQz6OOEJy+5Cgef/z7oa6LnFlhRbrFIcVibjligvdRLrvF\nj/BuISl1QyI6hmGpvkM2P8FI9dMqKA5x1oU5UEYQn+Omml53k0Egth1qilMR6CCm\nW0Gim/bRLhz97mSB6BKinhj0\n-----END PRIVATE KEY-----\n'
    })
    await doc.loadInfo() // loads document properties and worksheets
    // const newSheet = await doc.addSheet(); // adds a new sheet
    const sheet = doc.sheetsByIndex[0] // in the order they appear on the sheets UI
    // const otherSheet = doc.sheetsById[123]; // accessible via ID if you already know it
    // read rows
    // const rows = await sheet.getRows() // can pass in { limit, offset }

    // read/write row values
    // console.log(rows) // 'Larry Page'
    const o = req.body.order.filter((i) => parseFloat(i.qty) !== 0)
    Object.keys(o).forEach(async function(key) {
      try {
        const val = o[key]
        await sheet.addRow({
          qty: val.qty,
          sku: val.sku,
          time: req.body.time,
          date: req.body.date,
          uri: req.body.uri,
          street: req.body.street,
          zip: req.body.zip,
          city: req.body.city,
          entity: req.body.entity,
          country: req.body.country,
          organization: req.body.organization,
          name: req.body.name,
          email: req.body.email,
          id: req.body.id,
          note: req.body.note
        })
      } catch (status) {
        res.sendStatus(status)
      }
    })
    res.status(200).json({ success: 200 })
  } else {
    res.status(404).send('DENIED')
  }
})
/* / --------------------------------------------------------------------------------------------- / */
/* / -------------------------------------- Export ----------------------------------------------- / */
/* / --------------------------------------------------------------------------------------------- / */
export default {
  path: '/api/order/',
  handler: app
}
