// Imports
const AWS = require('aws-sdk')

AWS.config.update({ region: '/* TODO: Add your region */' })

// Declare local variables
const route53 = new AWS.Route53()
const hzName = 'idsgn.ru'

createHostedZone(hzName)
  .then(data => console.log(data))

function createHostedZone(hzName) {
  const params = {
    Name: hzName,
    CallerReference: `${Date.now()}`
  }

  return new Promise((resolve, reject) => {
    route53.createHostedZone(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
