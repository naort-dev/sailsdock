require('dotenv').config()
export const publicKey = process.env.STRIPE_PUBLIC_KEY
export const secretKey = process.env.STRIPE_SECRET_KEY
export const doSpacesKey = process.env.DO_SPACES_KEY
export const doSpacesSecret = process.env.DO_SPACES_SECRET
export const doToken = process.env.DO_TOKEN
export const awsKey = process.env.AWS_ACCESS_KEY_ID
export const awsSecret = process.env.AWS_SECRET_ACCESS_KEY
export const awsRegion = process.env.AWS_REGION
export const privateSSHKey = process.env.PRIVATE_KEY
export const publicSSHKey = process.env.PUBLIC_KEY