import {
  parseBucketName,
  client,
  createKey,
  generateKeys,
  updateDomainInFiles,
  sleep,
  createDOCertificate,
  moveSpaceToProject,
  createCDNEndpoint,
  createARecord,
  getReadOnlyAnonUserPolicy,
  getCloudFrontParams,
  getCNAMEParams,
  getStaticHostParams
} from '../../../utils'
import { awsKey, awsSecret } from '../../../config.js'
const fs = require('fs')
const path = require('path')
const { Router } = require('express')
const router = Router()
const NodeSSH = require('node-ssh')
const ssh = new NodeSSH()
const AWS = require('aws-sdk')
const mime = require('mime')
require('dotenv').config()

function walkSync(currentDirPath, callback) {
  fs.readdirSync(currentDirPath).forEach(function(name) {
    const filePath = path.join(currentDirPath, name)
    const stat = fs.statSync(filePath)
    if (stat.isFile()) {
      callback(filePath, stat)
    } else if (stat.isDirectory()) {
      walkSync(filePath, callback)
    }
  })
}
router.post('/deploy/hand-over-fist/s3', function(req, res, next) {
  // AWS Credentials Params
  AWS.config.update(
    new AWS.Config({
      accessKeyId: awsKey,
      secretAccessKey: awsSecret,
      region: 'us-west-2'
    })
  )
  const s3 = new AWS.S3({ apiVersion: '2006-03-01' })
  const bucketName = parseBucketName(req.body.title)
  const framework = req.body.framework
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
  s3.createBucket(bucketParams, function(err, data) {
    if (err) {
      console.log('Error', err)
    } else {
      console.log('Bucket URL is ', data, data.Location)
      s3.putBucketWebsite(staticHostParams, function(err, data) {
        if (err) {
          // Display error message
          console.log('Error', err)
          res.json(err)
        } else {
          // Update the displayed policy for the selected bucket
          const s3Path = 'static_sites/' + framework
          walkSync(s3Path, function(filePath, stat) {
            const bucketPath = filePath.substring(s3Path.length + 1)
            const contentType = mime.getType(filePath)
            const params = {
              Bucket: bucketName,
              Key: bucketPath,
              Body: fs.readFileSync(filePath),
              ACL: 'public-read',
              ContentType: contentType,
              Metadata: {
                'Content-Type': contentType,
                content_type: contentType
              }
            }
            s3.upload(params, function(err, data) {
              if (err) {
                console.log(err)
              } else {
              }
            })
          })
          s3.putBucketPolicy(bucketPolicyParams, function(err, data) {
            if (err) {
              // Display error message
              console.log('Error', err)
              res.json(err)
            } else {
              // Update the displayed policy for the selected bucket
              console.log('putBucketPolicy Success', data)
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
                        bucket: bucketName
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

router.post('/deploy/hand-over-fist/space', function(req, res, next) {
  const SESConfig = {
    accessKeyId: process.env.DO_SPACES_KEY,
    secretAccessKey: process.env.DO_SPACES_SECRET,
    region: 'ams3',
    endpoint: 'ams3.digitaloceanspaces.com'
  }
  AWS.config.update(SESConfig)
  console.log(req.body)
  const s3 = new AWS.S3({ apiVersion: '2006-03-01' })
  const bucketName = parseBucketName(req.body.title)
  // const bucketName = 'aasd2'
  console.log(bucketName)
  const framework = req.body.framework
  // const framework = 'svelte'
  const bucketParams = {
    Bucket: bucketName,
    ACL: 'public-read'
  }
  // Create params JSON for S3.setBucketWebsite
  const staticHostParams = {
    Bucket: bucketName,
    WebsiteConfiguration: {
      ErrorDocument: {
        Key: 'error.html'
      },
      IndexDocument: {
        Suffix: 'index.html'
      }
    }
  }

  // Call S3 to create the bucket
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
        } else {
          // Update the displayed policy for the selected bucket
          const s3Path = 'static_sites/' + framework
          walkSync(s3Path, function(filePath, stat) {
            const bucketPath = filePath.substring(s3Path.length + 1)
            const contentType = mime.getType(filePath)
            const params = {
              Bucket: bucketName,
              Key: bucketPath,
              Body: fs.readFileSync(filePath),
              ACL: 'public-read',
              ContentType: contentType,
              Metadata: {
                'Content-Type': contentType,
                content_type: contentType
              }
            }
            s3.upload(params, function(err, data) {
              if (err) {
                console.log(err)
              } else {
              }
            })
          })
          createDOCertificate(bucketName, 'sailsdock.pro')
            .then((response) => {
              console.log('certification', response.data.certificate)
              const certificateId = response.data.certificate.id
              moveSpaceToProject(bucketName)
                .then((response) => {})
                .catch((err) => {
                  console.log(err.response, err.request)
                })
              createCDNEndpoint(bucketName, certificateId, 'sailsdock.pro')
                .then((response) => {
                  res.json({ bucket: bucketName })
                  console.log('cdn endpoint', response.data.endpoint)
                })
                .catch(async (err) => {
                  await sleep(3000)
                  console.log(err.response, err.request)
                  createCDNEndpoint(bucketName, certificateId, 'sailsdock.pro')
                    .then((response) => {
                      res.json({ bucket: bucketName })
                      console.log('cdn endpoint', response.data.endpoint)
                    })
                    .catch((err) => {
                      console.log(err.response, err.request)
                    })
                })
            })
            .catch((err) => {
              console.log(err.response, err.request)
            })
        }
      })
    }
  })
})
// Creating Droplet from Snapshot
router.post('/deploy/hand-over-fist/dock', async function(req, res, next) {
  const { privateKey, publicKey } = await generateKeys()
  const key = await createKey({ name: req.body.id, public_key: publicKey })
  const title = req.body.title
  const domain = parseBucketName(title)
  updateDomainInFiles(domain)

  client.images
    .list({ private: true })
    .then(function(images) {
      const snapshot = images.filter(
        (image) => image.name === req.body.framework + '-ssl'
      )[0]
      console.log(req.body.framework, snapshot, snapshot.id)
      const options = {
        name: req.body.id,
        region: 'nyc3',
        size: 's-1vcpu-1gb',
        image: snapshot.id,
        ssh_keys: [key.id],
        tags: [req.body.theme, req.body.technology, req.body.droplet]
      }
      client.droplets
        .create(options)
        .then(async function(resDroplet) {
          delete resDroplet._digitalOcean
          delete key._digitalOcean
          const dropletID = resDroplet.id

          let droplet = null
          do {
            await sleep(5000)
            const result = await client.droplets.get(dropletID)
            droplet = result
            console.log('Droplet status: ' + droplet.status)
          } while (droplet.status === 'new')
          if (droplet.status !== 'active') {
            throw new Error('Droplet had the status ' + droplet.status)
          }
          createARecord(
            client,
            'sailsdock.pro',
            domain,
            droplet.networks.v4[0].ip_address
          )

          delete droplet._digitalOcean
          res.json({
            subdomain: domain,
            droplet,
            ssh: key,
            privateKey
          })
        })
        .catch(function(err) {
          console.log(err)
        })
    })
    .catch(function(err) {
      console.log(err)
    })
})
router.post('/deploy/hand-over-fist/run_dock', async function(req, res, next) {
  const { dropletIP, privateKey, framework } = req.body
  await sleep(5000)
  ssh
    .connect({
      host: dropletIP,
      username: 'root',
      privateKey
    })
    .then(async function() {
      console.log(
        await ssh.putFile(
          `snapshot_bash/${framework}.sh`,
          `/root/${framework}_snapshot.sh`
        )
      )
      console.log(
        await ssh.putFile(
          `bash/default_new`,
          `/etc/nginx/sites-available/default`
        )
      )
      console.log(
        await ssh.putFile(
          `bash/default_new`,
          `/etc/nginx/sites-enabled/default`
        )
      )
      console.log(await ssh.putFile(`bash/ssl_new.sh`, `/root/ssl.sh`))
      console.log('The File thing is done')
      console.log(
        await ssh.execCommand(`chmod +x ${framework}_snapshot.sh`, {
          cwd: '/root'
        })
      )
      console.log(
        await ssh.execCommand(`chmod +x ssl.sh`, {
          cwd: '/root'
        })
      )
      console.log(
        await ssh.execCommand(`source ${framework}_snapshot.sh`, {
          cwd: '/root'
        })
      )
      await ssh
        .execCommand(`source ssl.sh`, {
          cwd: '/root'
        })
        .then((result) => {
          console.log('STDOUT: ' + result.stdout)
          console.log('STDERR: ' + result.stderr)
        })

      res.json({})
    })
})
export default router
