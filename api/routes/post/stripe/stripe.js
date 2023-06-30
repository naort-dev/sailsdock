import { publicKey, secretKey } from '../../../config.js'

const { Router } = require('express')

const router = Router()

// Strip init
const stripe = require('stripe')(secretKey)

/* / --------------------------------------------------------------------------------------------- / */
/* / -------------------------------- Get stripe keys  ------------------------------------------- / */
/* / --------------------------------------------------------------------------------------------- / */
router.get('/stripe/environment', (req, res, next) => {
  res.send({ stripePublicKey: publicKey })
})
/* / --------------------------------------------------------------------------------------------- / */
/* / -------------------------------- Setup intent  ---------------------------------------------- / */
/* / --------------------------------------------------------------------------------------------- / */
router.post('/setup-intents/create', async (req, res, next) => {
  await stripe.setupIntents
    .create({
      payment_method_types: ['card'],
      confirm: false,
      customer: req.body.customerId
    })
    .then((r) => {
      res.send(r)
    })
    .catch((e) => {
      res.send(e)
    })
})
/* / --------------------------------------------------------------------------------------------- / */
/* / -------------------------------- Setup intent  ---------------------------------------------- / */
/* / --------------------------------------------------------------------------------------------- / */
router.post('/stripe/setup-intents/confirm', async (req, res, next) => {
  await stripe.setupIntents
    .confirm(req.body.id, { payment_method: req.body.card })
    .then((r) => {
      res.send(r)
    })
    .catch((e) => {
      res.send(e)
    })
})
/* / --------------------------------------------------------------------------------------------- / */
/* / -------------------------------- Create customer  ------------------------------------------- / */
/* / --------------------------------------------------------------------------------------------- / */
router.post('/stripe/create/customer', async (req, res, next) => {
  console.log(req.body)
  await stripe.customers
    .create({
      name: req.body.name,
      email: req.body.email,
      description: req.body.description,
      balance: 0,
      tax_exempt: 'none',
      preferred_locales: ['en-US'],
      metadata: {
        db_uid: req.body.db_uid
      }
    })
    .then((r) => {
      res.send(r)
    })
    .catch((e) => {
      res.send(e)
    })
})
/* / --------------------------------------------------------------------------------------------- / */
/* / -------------------------------- Attach a card to customer ---------------------------------------- / */
/* / --------------------------------------------------------------------------------------------- / */
/* / Docs: https://stripe.com/docs/api/payment_methods/attach / */
router.post('/stripe/update/payment', async (req, res, next) => {
  await stripe.paymentMethods
    .attach(req.body.paymentId, {
      customer: req.body.customerId
    })
    .then((r) => {
      res.send(r)
    })
    .catch((e) => {
      res.send(e)
    })
})
/* / --------------------------------------------------------------------------------------------- / */
/* / -------------------------------- Create subscription ---------------------------------------- / */
/* / --------------------------------------------------------------------------------------------- / */
router.post('/stripe/subscriptions/create', async (req, res, next) => {
  await stripe.subscriptions
    .create({
      customer: req.body.customer,
      items: [{ plan: req.body.plan }],
      coupon: req.body.coupon,
      default_payment_method: req.body.card,
      expand: ['latest_invoice.payment_intent']
    })
    .then((r) => {
      console.info(r)
      res.send(r)
    })
    .catch((e) => {
      res.send(e)
    })
})
export default router
