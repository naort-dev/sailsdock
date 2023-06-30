import {
  doSpacesKey,
  doSpacesSecret,
  awsKey,
  awsSecret
} from '../../../config.js'
import {
  parseBucketName,
  sleep,
  getStaticHostParams,
  createDOCertificate,
  moveSpaceToProject,
  createCDNEndpoint,
  captureScreen,
  getBucketFileParams,
  getReadOnlyAnonUserPolicy,
  getCloudFrontParams,
  getCNAMEParams
} from '../../../utils'
const fs = require('fs')
const { Router } = require('express')
const router = Router()
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })
const AdmZip = require('adm-zip')
const AWS = require('aws-sdk')
const mime = require('mime-types')

router.post('/deploy/cut-and-run/s3', upload.single('file'), function(
  req,
  res,
  next
) {
  const zip = new AdmZip(req.file.buffer)
  const zipEntries = zip.getEntries()
  if (fs.existsSync('screenshot.png')) {
    fs.unlinkSync('screenshot.png')
  }
  let isDeployable = false
  for (let i = 0; i < zipEntries.length; i++) {
    if (zipEntries[i].entryName === 'index.html') isDeployable = true
  }
  if (!isDeployable) {
    res.json({ error: 'index.html is missing' })
  }
  console.log(awsKey, awsSecret)
  // AWS Credentials Params
  AWS.config.update(
    new AWS.Config({
      accessKeyId: awsKey,
      secretAccessKey: awsSecret,
      region: 'us-west-2'
    })
  )
  const s3 = new AWS.S3({ apiVersion: '2006-03-01' })
  const bucketName = parseBucketName(req.body.data)
  const bucketParams = {
    Bucket: bucketName,
    ACL: 'public-read'
  }
  const staticHostParams = getStaticHostParams(bucketName)
  const readOnlyAnonUserPolicy = getReadOnlyAnonUserPolicy(bucketName)
  const bucketPolicyParams = {
    Bucket: bucketName,
    Policy: JSON.stringify(readOnlyAnonUserPolicy)
  }

  const cloudFrontParams = getCloudFrontParams(bucketName)

  const cloudfront = new AWS.CloudFront()
  const route53 = new AWS.Route53()
  let screenshot
  s3.createBucket(bucketParams, function(err, data) {
    if (err) {
      console.log('Error', err)
    } else {
      console.log('Bucket URL is ', data, data.Location)
      s3.putBucketWebsite(staticHostParams, function(err, data) {
        if (err) {
          console.log('Error', err)
          res.json(err)
        } else {
          console.log('putBucketWebsite Success', data)
          for (let i = 0; i < zipEntries.length; i++) {
            const bucketPath = zipEntries[i].entryName
            const contentType = mime.lookup(zipEntries[i].name)
            const bucketBody = zipEntries[i].getData()
            const params = getBucketFileParams(
              bucketName,
              bucketPath,
              bucketBody,
              contentType
            )
            s3.upload(params, function(err, data) {
              if (err) {
                console.log(err)
              } else {
                console.log(data)
                console.log(
                  'Successfully uploaded ' + bucketPath + ' to ' + bucketName
                )
              }
            })
          }
          s3.putBucketPolicy(bucketPolicyParams, function(err, data) {
            if (err) {
              // Display error message
              console.log('Error', err)
              res.json(err)
            } else {
              // Update the displayed policy for the selected bucket
              console.log('putBucketPolicy Success', data)
              captureScreen(
                `http://${bucketName}.s3-website-us-west-2.amazonaws.com`,
                'screenshot.png'
              )
              if (fs.existsSync('screenshot.png')) {
                screenshot = fs.readFileSync('screenshot.png', {
                  encoding: 'base64'
                })
              }

              cloudfront.createDistribution(cloudFrontParams, function(
                err,
                data
              ) {
                if (err) console.log(err, err.stack)
                // an error occurred
                else {
                  console.log('cloudfront success', data)
                  const cloudfrontDomain = data.Distribution.DomainName
                  const cnameParams = getCNAMEParams(
                    bucketName,
                    cloudfrontDomain
                  )

                  route53.changeResourceRecordSets(cnameParams, function(
                    err,
                    data
                  ) {
                    if (err) {
                      console.log(err, err.stack)
                    } else {
                      console.log(data)
                      res.json({
                        bucket: `https://${bucketName}.sailsdock.app`,
                        screenshot
                      })
                    }
                  })
                } // successful response
              })
            }
          })
        }
      })
    }
  })
})

router.post('/deploy/cut-and-run/space', upload.single('file'), function(
  req,
  res,
  next
) {
  const SESConfig = {
    accessKeyId: doSpacesKey,
    secretAccessKey: doSpacesSecret,
    region: 'ams3',
    endpoint: 'ams3.digitaloceanspaces.com'
  }
  AWS.config.update(SESConfig)
  console.log(req.file.buffer, req.body.data)
  const zip = new AdmZip(req.file.buffer)
  const zipEntries = zip.getEntries()
  let screenshot
  if (fs.existsSync('screenshot.png')) {
    fs.unlinkSync('screenshot.png')
  }
  const s3 = new AWS.S3({ apiVersion: '2006-03-01' })
  const bucketName = parseBucketName(req.body.data)
  const bucketParams = {
    Bucket: bucketName,
    ACL: 'public-read'
  }
  // Create params JSON for S3.setBucketWebsite
  const staticHostParams = getStaticHostParams(bucketParams)
  let isDeployable = false
  for (let i = 0; i < zipEntries.length; i++) {
    if (zipEntries[i].entryName === 'index.html') isDeployable = true
  }
  if (!isDeployable) {
    res.json({ error: 'index.html is missing' })
  }
  // res.json({ bucket: bucketName, screenshot })
  s3.createBucket(bucketParams, function(err, data) {
    if (err) {
      console.log('Error', err)
    } else {
      console.log('Bucket URL is ', data, data.Location)

      // Set the new policy on the newly created bucket
      s3.putBucketWebsite(staticHostParams, function(err, data) {
        if (err) {
          // Display error message
          console.log('Error', err)
          res.json(err)
        } else {
          // Update the displayed policy for the selected bucket
          console.log('Success', data)
          for (let i = 0; i < zipEntries.length; i++) {
            const bucketPath = zipEntries[i].entryName
            const contentType = mime.lookup(zipEntries[i].name)
            const bucketBody = zipEntries[i].getData()
            const params = getBucketFileParams(
              bucketName,
              bucketPath,
              bucketBody,
              contentType
            )
            s3.upload(params, function(err, data) {
              if (err) {
                console.log(err)
              } else {
                console.log(data)
                console.log(
                  'Successfully uploaded ' + bucketPath + ' to ' + bucketName
                )
              }
            })
          }
          console.log(zipEntries.length)

          createDOCertificate(bucketName, 'sailsdock.pro')
            .then((response) => {
              console.log('certification', response.data.certificate)
              const certificateId = response.data.certificate.id
              captureScreen(
                `https://${bucketName}.ams3.digitaloceanspaces.com/index.html`,
                'screenshot.png'
              )
              screenshot = fs.readFileSync('screenshot.png', {
                encoding: 'base64'
              })
              moveSpaceToProject(bucketName)
                .then((response) => {
                  console.log('=============================================')
                  console.log(response.data)
                })
                .catch((err) => {
                  console.log(err.response, err.request)
                })
              createCDNEndpoint(bucketName, certificateId, 'sailsdock.pro')
                .then((response) => {
                  console.log('cdn endpoint', response.data.endpoint)
                  res.json({
                    bucket: `https://${bucketName}.sailsdock.pro/index.html`,
                    screenshot
                  })
                })
                .catch(async (err) => {
                  await sleep(5000)
                  createCDNEndpoint(bucketName, certificateId, 'sailsdock.pro')
                    .then((response) => {
                      console.log('cdn endpoint', response.data.endpoint)
                      res.json({
                        bucket: `https://${bucketName}.sailsdock.pro/index.html`,
                        screenshot
                      })
                    })
                    .catch((err) => {
                      console.log(err.response, err.request)
                      res.json(err)
                    })
                  console.log(err.response, err.request)
                })
            })
            .catch((err) => {
              res.json(err)

              console.log(err.response, err.request)
            })
        }
      })
    }
  })
})
export default router
