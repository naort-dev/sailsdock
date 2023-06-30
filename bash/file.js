const fs = require('fs')

try {
  const data = fs.readFileSync('default')
  const newStr = data
    .toString()
    .replace(
      'server_name www.sailsdock.com',
      'server_name droplet1.sailsdock.com'
    )
  fs.writeFileSync('default_new', newStr)
  console.log(data.toString())
} catch (err) {
  console.error(err)
}
