import { doToken } from './config.js'
import { FRAMEWORKS, FRAMEWORKS_SPECS } from './frameworks.js'

const fs = require('fs')
const keygen = require('ssh-keygen')
const digitalocean = require('digitalocean')
export const client = digitalocean.client(doToken)
const axios = require('axios')
const captureWebsite = require('capture-website')
const shell = require('shelljs')

export const getCustomSSHWithRepo = (gitRepo, spec) => {
  return `
      git clone ${gitRepo} project
      cd /root/project
      rm package-lock.json
      export PATH=$PATH:/usr/local/bin
      export NODE_PATH=/usr/local/share/node
      export USER=root
      export HOME=/root
      source $HOME/.nvm/nvm.sh
      nvm --version
      nvm install 10
      node --version
      ${
        spec.output
          ? `
      npm install -g serve
      `
          : ''
      }
      npm install pm2 -g --unsafe-perm
      npm install
      ${spec.preInstall || ''}
      npm run build
      pm2 kill
      ${spec.output ? `pm2 serve ${spec.output}` : `pm2 start ${spec.serve}`}
      sudo apt-get update
      sudo apt-get -y install nginx
      sudo rm /etc/nginx/sites-available/default
      sudo rm /etc/nginx/sites-enabled/default
      sudo ln -s /root/default /etc/nginx/sites-available/default
      sudo ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default
      nginx -t
      sudo systemctl restart nginx

      sudo nginx -t
      echo "sudo nginx -t"
      sudo systemctl restart nginx
      echo "sudo systemctl restart nginx"
      sudo systemctl reload nginx
      echo "sudo ufw --force enable"
      sudo ufw --force enable
      sudo ufw allow 'Nginx Full'
      sudo ufw delete allow 'Nginx HTTP'
      echo "sudo add-apt-repository -y ppa:certbot/certbot"
      sudo add-apt-repository -y ppa:certbot/certbot
      sudo apt-get update
      sudo apt-get -f install -y python-certbot-nginx
      sudo rm /var/lib/apt/lists/lock
      sudo rm /var/cache/apt/archives/lock
      sudo rm /var/lib/dpkg/lock*
      sudo dpkg --configure -a
      sudo apt-get -f install -y
      sudo apt-get update
      sudo apt-get -f install -y python-certbot-nginx
    `
}
export const getCNAMEParams = (bucketName, cloudfrontDomain) => {
  return {
    HostedZoneId: '/hostedzone/Z028303239D5LO2N9DLY1',
    ChangeBatch: {
      Changes: [
        {
          Action: 'CREATE',
          ResourceRecordSet: {
            Name: `${bucketName}.sailsdock.app`,
            Type: 'CNAME',
            TTL: 60, // 5 minutes
            ResourceRecords: [{ Value: cloudfrontDomain }]
          }
        }
      ]
    }
  }
}
export const getCloudFrontParams = (bucketName) => {
  return {
    DistributionConfig: {
      CallerReference: Date.now().toString(),
      // Aliases: {
      //   Quantity: 0,
      //   Items: []
      // },
      Aliases: {
        Quantity: 1,
        Items: [`${bucketName}.sailsdock.app`]
      },
      DefaultRootObject: '',
      Origins: {
        Quantity: 1,
        Items: [
          {
            Id: `S3-Website-${bucketName}.s3-website-us-west-2.amazonaws.com`,
            DomainName: `${bucketName}.s3-website-us-west-2.amazonaws.com`,
            OriginPath: '',
            CustomHeaders: {
              Quantity: 0,
              Items: []
            },
            CustomOriginConfig: {
              HTTPPort: 80,
              HTTPSPort: 443,
              OriginProtocolPolicy: 'http-only',
              OriginSslProtocols: {
                Quantity: 3,
                Items: ['TLSv1', 'TLSv1.1', 'TLSv1.2']
              },
              OriginReadTimeout: 30,
              OriginKeepaliveTimeout: 5
            },
            ConnectionAttempts: 3,
            ConnectionTimeout: 10
          }
        ]
      },
      OriginGroups: {
        Quantity: 0,
        Items: []
      },
      DefaultCacheBehavior: {
        TargetOriginId: `S3-Website-${bucketName}.s3-website-us-west-2.amazonaws.com`,
        ForwardedValues: {
          QueryString: false,
          Cookies: {
            Forward: 'none'
          },
          Headers: {
            Quantity: 0,
            Items: []
          },
          QueryStringCacheKeys: {
            Quantity: 0,
            Items: []
          }
        },
        TrustedSigners: {
          Enabled: false,
          Quantity: 0,
          Items: []
        },
        ViewerProtocolPolicy: 'allow-all',
        MinTTL: 0,
        AllowedMethods: {
          Quantity: 2,
          Items: ['HEAD', 'GET'],
          CachedMethods: {
            Quantity: 2,
            Items: ['HEAD', 'GET']
          }
        },
        SmoothStreaming: false,
        DefaultTTL: 86400,
        MaxTTL: 31536000,
        Compress: false,
        LambdaFunctionAssociations: {
          Quantity: 0,
          Items: []
        },
        FieldLevelEncryptionId: ''
      },
      CacheBehaviors: {
        Quantity: 0,
        Items: []
      },
      CustomErrorResponses: {
        Quantity: 0,
        Items: []
      },
      Comment: '',
      Logging: {
        Enabled: false,
        IncludeCookies: false,
        Bucket: '',
        Prefix: ''
      },
      PriceClass: 'PriceClass_All',
      Enabled: true,
      // ViewerCertificate: {
      //   CloudFrontDefaultCertificate: true,
      //   MinimumProtocolVersion: 'TLSv1',
      //   CertificateSource: 'cloudfront'
      // },
      ViewerCertificate: {
        ACMCertificateArn:
          'arn:aws:acm:us-east-1:782027680081:certificate/55693917-49c2-4b0f-a9e9-e4900e944781',
        SSLSupportMethod: 'sni-only',
        MinimumProtocolVersion: 'TLSv1.2_2018',
        Certificate:
          'arn:aws:acm:us-east-1:782027680081:certificate/55693917-49c2-4b0f-a9e9-e4900e944781',
        CertificateSource: 'acm'
      },
      Restrictions: {
        GeoRestriction: {
          RestrictionType: 'none',
          Quantity: 0,
          Items: []
        }
      },
      WebACLId: '',
      HttpVersion: 'http2',
      IsIPV6Enabled: true
    }
  }
}
export const getReadOnlyAnonUserPolicy = (bucketName) => {
  return {
    Version: '2012-10-17',
    Statement: [
      {
        Sid: 'PublicReadGetObject',
        Effect: 'Allow',
        Principal: '*',
        Action: ['s3:GetObject'],
        Resource: [`arn:aws:s3:::${bucketName}/*`]
      }
    ]
  }
}
export const getBucketFileParams = (
  bucketName,
  bucketPath,
  bucketBody,
  contentType
) => {
  return {
    Bucket: bucketName,
    Key: bucketPath,
    Body: bucketBody,
    ACL: 'public-read',
    ContentType: contentType,
    Metadata: {
      'Content-Type': contentType,
      content_type: contentType
    }
  }
}
export const getStaticHostParams = (bucketName) => {
  return {
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
}

export const captureScreen = async (url, file) => {
  await captureWebsite.file(url, file, {
    launchOptions: {
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
  })
}
export const createARecord = async (client, domain, name, ip) => {
  await client.domains
    .createRecord(domain, {
      type: 'A',
      name,
      data: ip,
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
}
export const createDOCertificate = (bucketName, domain) => {
  return axios.post(
    'https://api.digitalocean.com/v2/certificates',
    {
      name: bucketName,
      type: 'lets_encrypt',
      dns_names: [domain, `${bucketName}.${domain}`]
    },
    {
      headers: {
        Authorization: `Bearer ${doToken}`,
        'Content-Type': 'application/json'
      }
    }
  )
}

export const moveSpaceToProject = (bucketName) => {
  return axios.post(
    'https://api.digitalocean.com/v2/projects/54d20dc3-108a-4335-a419-7cc8df378750/resources',
    {
      resources: [`do:space:${bucketName}`]
    },
    {
      headers: {
        Authorization: `Bearer ${doToken}`,
        'Content-Type': 'application/json'
      }
    }
  )
}
export const createCDNEndpoint = (bucketName, certificateId, domain) => {
  return axios.post(
    'https://api.digitalocean.com/v2/cdn/endpoints',
    {
      origin: `${bucketName}.ams3.digitaloceanspaces.com`,
      certificate_id: certificateId,
      custom_domain: `${bucketName}.${domain}`,
      ttl: 600
    },
    {
      headers: {
        Authorization: `Bearer ${doToken}`,
        'Content-Type': 'application/json'
      }
    }
  )
}
export const parseBucketName = (str) => {
  return str
    .replace(/_/g, '-')
    .replace(/ /g, '-')
    .toLowerCase()
}
export const updateDomainInFiles = (domain, port = 3000) => {
  try {
    if (fs.existsSync('bash/default')) {
      const data = fs.readFileSync('bash/default')
      const newStr = data
        .toString()
        .replace('www.sailsdock.com', `${domain}.sailsdock.com`)
        .replace('localhost:3000', `localhost:${port}`)
      fs.writeFileSync('bash/default_new', newStr)
    }
    if (fs.existsSync('bash/ssl.sh')) {
      const data = fs.readFileSync('bash/ssl.sh')
      const newStr = data
        .toString()
        .replace('www.sailsdock.com', `${domain}.sailsdock.com`)
      fs.writeFileSync('bash/ssl_new.sh', newStr)
    }
  } catch (err) {
    console.error(err)
  }
}
export const generateKeys = async () => {
  return await new Promise((resolve, reject) => {
    // This is where we'll store the public and private keys
    const location = __dirname + '/foo_rsa'
    const comment = 'blueshark0811@gmail.com'

    // Now generate the key
    keygen(
      {
        location,
        comment,
        password: null, // No password as we're automating usage
        read: true,
        format: 'PEM'
      },
      function(err, out) {
        if (err) {
          console.log(err)
          reject(new Error('Error creating SSH key: ' + err))
          return
        }
        console.log(out)
        resolve({
          privateSSHKey: out.key,
          publicSSHKey: out.pubKey
        })
      }
    )
  })
}

export const createKey = async (attributes) => {
  return await client.account
    .createSshKey(attributes)
    .then((key) => {
      return key
    })
    .catch(function(err) {
      console.log(err)
    })
}

export const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export const gitConfig = (gitRepo, domain) => {
  const rawURL = `https://raw.githubusercontent.com/${gitRepo
    .replace('https://github.com/', '')
    .replace('.git', '')}/master/package.json`
  const command = `curl -o cloned.json ${rawURL}`
  if (fs.existsSync('cloned.json')) {
    fs.unlinkSync('cloned.json')
  }
  shell.exec(command)
  console.log('Finished')
  if (fs.existsSync('cloned.json')) {
    fs.readFile('cloned.json', 'utf8', function(err, data) {
      if (err) console.log(err)
      const obj = JSON.parse(data)
      console.log(obj)
      let frameworkKey = obj.scripts.build.split(' ')[0]
      if (!FRAMEWORKS[frameworkKey]) {
        if (obj.scripts.build.includes('hugo')) {
          frameworkKey = 'hugo'
        } else if (obj.dependencies.react) {
          frameworkKey = 'react'
        }
      }
      console.log(frameworkKey)
      const spec = FRAMEWORKS_SPECS[FRAMEWORKS[frameworkKey]]
      updateDomainInFiles(domain, spec.output ? 8080 : 3000)
      const ssh = getCustomSSHWithRepo(gitRepo, spec)
      fs.writeFileSync('bash/git_ssh.sh', ssh)
      console.log(ssh)
    })
  }
}