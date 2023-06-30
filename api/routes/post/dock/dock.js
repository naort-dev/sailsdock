import {
  parseBucketName,
  client,
  createKey,
  generateKeys,
  updateDomainInFiles,
  sleep
} from '../../../utils'
const fs = require('fs')
const path = require('path')
const { Router } = require('express')
const router = Router()
const ssh2 = require('ssh2')
const node_ssh = require('node-ssh')
const ssh = new node_ssh()
const keygen = require('ssh-keygen')
const s3 = require('s3')
const AWS = require('aws-sdk')
const mime = require('mime')
const axios = require('axios')
require('dotenv').config()
console.log(process.env.DO_SPACES_KEY, process.env.DO_SPACES_SECRET)
const SESConfig = {
  accessKeyId: process.env.DO_SPACES_KEY,
  secretAccessKey: process.env.DO_SPACES_SECRET,
  region: 'nyc3',
  endpoint: 'nyc3.digitaloceanspaces.com'
}

AWS.config.update(SESConfig)


// Creating Droplet from scratch
/*
 router.post('/dock', async function(req, res, next) {
  const { privateKey, publicKey } = await generateKeys()
  const key = await createKey({ name: req.body.id, public_key: publicKey })
  console.log(req.body)
  const options = {
    name: req.body.id,
    region: 'nyc3',
    size: 's-1vcpu-1gb',
    image: 'ubuntu-16-04-x64',
    ssh_keys: [key.id],
    tags: [req.body.theme, req.body.technology, req.body.droplet]
  }
  // client.images
  //   .list({ private: true })
  //   .then(function(images) {
  //     console.log(images.filter((image) => image.name === 'nuxt'))
  //   })
  //   .catch(function(err) {
  //     console.log(err)
  //   })
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
      delete droplet._digitalOcean
      res.json({ droplet, ssh: key, privateKey })
    })
    .catch(function(err) {
      console.log(err)
    })
})
router.post('/run_dock', async function(req, res, next) {
  const { dropletIP, privateKey, framework } = req.body

  // The droplet is online
  // console.log('Droplet is online with IP ' + dropletIP)
  // console.log(privateKey)
  // await sshConnect(dropletIP, 'root', privateKey)
  // console.log(`Connected to ${dropletIP}`)

  // console.log('> whoami')
  // const { out } = await sshExec('whoami')
  // console.log(out)
  // await sshDisconnect().
  await sleep(5000)
  // await sshConnect(dropletIP, 'root', privateKey)
  // console.log(`Connected to ${dropletIP}`)

  // console.log('> whoami')
  // const { out } = await sshExec('whoami')
  // console.log(out)
  // await sshDisconnect()
  ssh
    .connect({
      host: dropletIP,
      username: 'root',
      privateKey
    })
    .then(function() {
      ssh.putFile('bash/default', '/root/default')
      ssh.putFile(`bash/${framework}.sh`, `/root/${framework}.sh`).then(
        function() {
          console.log('The File thing is done')
          ssh
            .execCommand(`chmod +x ${framework}.sh`, { cwd: '/root' })
            .then(function(result) {
              console.log('STDOUT: ' + result.stdout)
              console.log('STDERR: ' + result.stderr)
              ssh
                .execCommand(`sh ${framework}.sh`, { cwd: '/root' })
                .then(function(result) {
                  res.json(result)
                  console.log('STDOUT: ' + result.stdout)
                  console.log('STDERR: ' + result.stderr)
                })
            })
        },
        function(error) {
          console.log("Something's wrong")
          console.log(error)
        }
      )
    })
})
*/
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

function getAllCertificates() {
  var allCertificates = []

  function getCertificatePage(page) {
    if (page == null) {
      page = 1
    }

    return client.certificates
      .list(page)
      .each(function(certificate) {
        allCertificates.push(certificate)
      })
      .then(function(certificates) {
        const isLastPage = certificates.length < 10

        if (isLastPage) {
          return allCertificates
        } else {
          return getCertificatePage(page + 1)
        }
      })
  }

  return getCertificatePage()
}

router.post('/space', function(req, res, next) {
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
          console.log('Success', data)
          const s3Path = 'static_sites/' + framework
          walkSync(s3Path, function(filePath, stat) {
            const bucketPath = filePath.substring(s3Path.length + 1)
            const contentType = mime.getType(filePath)
            console.log(filePath, contentType)
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
                console.log(data)
                console.log(
                  'Successfully uploaded ' + bucketPath + ' to ' + bucketName
                )
              }
            })
          })
          axios
            .post(
              'https://api.digitalocean.com/v2/certificates',
              {
                name: bucketName,
                type: 'lets_encrypt',
                dns_names: ['sailsdock.com', `${bucketName}.sailsdock.com`]
              },
              {
                headers: {
                  Authorization: `Bearer ${process.env.DO_TOKEN}`,
                  'Content-Type': 'application/json'
                }
              }
            )
            .then((response) => {
              console.log('certification', response.data.certificate)
              const certificate_id = response.data.certificate.id
              axios
                .post(
                  'https://api.digitalocean.com/v2/cdn/endpoints',
                  {
                    origin: `${bucketName}.nyc3.digitaloceanspaces.com`,
                    certificate_id,
                    custom_domain: `${bucketName}.sailsdock.com`,
                    ttl: 600
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${process.env.DO_TOKEN}`,
                      'Content-Type': 'application/json'
                    }
                  }
                )
                .then((response) => {
                  console.log('cdn endpoint', response.data.endpoint)
                })
                .catch((err) => {
                  console.log(err.response, err.request)
                })
            })
            .catch((err) => {
              console.log(err.response, err.request)
            })
          res.json({ bucket: bucketName })
        }
      })
    }
  })
  // console.log(
  //   s3.createClient({
  //     s3Options: {
  //       accessKeyId: process.env.DO_SPACES_KEY,
  //       secretAccessKey: process.env.DO_SPACES_SECRET,
  //       region: 'nyc3',
  //       endpoint: 'nyc3.digitaloceanspaces.com'
  //     }
  //   })
  // )
})
// Creating Droplet from Snapshot
router.post('/dock', async function(req, res, next) {
  const { privateKey, publicKey } = await generateKeys()
  const key = await createKey({ name: req.body.id, public_key: publicKey })
  const title = req.body.title
  const domain = parseBucketName(title)
  updateDomainInFiles(domain)
  const options = {
    name: req.body.id,
    region: 'nyc3',
    size: 's-1vcpu-1gb',
    image: 'ubuntu-16-04-x64',
    ssh_keys: [key.id],
    tags: [req.body.theme, req.body.technology, req.body.droplet]
  }
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
          await client.domains
            .createRecord('sailsdock.com', {
              type: 'A',
              name: domain,
              data: droplet.networks.v4[0].ip_address,
              priority: null,
              port: null,
              ttl: 600,
              weight: null,
              flags: null,
              tag: null
            })
            .then((data) => {
              console.log(data)
            })
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
router.post('/run_dock', async function(req, res, next) {
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
