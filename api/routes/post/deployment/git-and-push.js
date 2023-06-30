import { FRAMEWORKS_SPECS, FRAMEWORKS } from '../../../frameworks.js'
import {
  parseBucketName,
  client,
  createKey,
  updateDomainInFiles,
  generateKeys,
  sleep,
  getCustomSSHWithRepo,
  createARecord,
  gitConfig
} from '../../../utils'

const fs = require('fs')
const { Router } = require('express')
const router = Router()
const NODE_SSH = require('node-ssh')
const ssh = new NODE_SSH()
require('dotenv').config()


router.post('/deploy/git-and-push/', async function(req, res, next) {
  console.log(req, req.body.git)

  const { privateSSHKey, publicSSHKey } = await generateKeys()
  const id = new Date().getTime().toString()
  const key = await createKey({ name: id, public_key: publicSSHKey })
  // const key = { id: 27788913 }
  const title = req.body.title
  const domain = parseBucketName(title)
  // const gitRepo = 'https://github.com/sailsdock-js-boilerplates/next.git'
  const gitRepo = req.body.git
  gitConfig(gitRepo, domain)
  client.images
    .list({ private: true })
    .then(function(images) {
      const snapshot = images.filter((image) => image.name === 'next')[0]
      console.log(req.body.framework, snapshot, snapshot.id)
      const options = {
        name: id,
        region: 'nyc3',
        size: 's-1vcpu-1gb',
        image: snapshot.id,
        ssh_keys: [key.id]
      }
      client.droplets.create(options).then(async function(resDroplet) {
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
          'sailsdock.com',
          domain,
          droplet.networks.v4[0].ip_address
        ).then((data) => {
          console.log(data)
        })
        // delete droplet._digitalOcean
        // res.json({
        //   subdomain: domain,
        //   droplet,
        //   ssh: key,
        //   privateSSHKey
        // })
        const dropletIP = droplet.networks.v4[0].ip_address
        await sleep(10000)
        console.log(privateSSHKey)
        ssh
          .connect({
            host: dropletIP,
            username: 'root',
            privateKey: privateSSHKey
          })
          .then(async function() {
            console.log('Connected')
            console.log(await ssh.putFile(`bash/git_ssh.sh`, `/root/run.sh`))
            console.log(await ssh.putFile(`bash/default_new`, `/root/default`))
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
              await ssh.execCommand(`chmod +x run.sh`, {
                cwd: '/root'
              })
            )
            console.log(
              await ssh.execCommand(`chmod +x ssl.sh`, {
                cwd: '/root'
              })
            )
            console.log(
              await ssh.execCommand(`source run.sh`, {
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
            res.json({
              ip: dropletIP,
              domain: `${domain}.sailsdock.com`
            })
          })
      })
    })
    .catch(function(err) {
      console.log(err)
    })
})

export default router
