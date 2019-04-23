// Imports
const AWS = require('aws-sdk')

AWS.config.update({ region: 'eu-central-1' })

// Declare local variables
const route53 = new AWS.Route53()
const hzId = '/hostedzone/ZA2UVM0MZXJYB'

createRecordSet(hzId)
  .then(data => console.log(data))

function createRecordSet(hzId) {
  const params = {
    HostedZoneId: hzId,
    ChangeBatch: {
      Changes: [
        {
          Action: 'CREATE',
          ResourceRecordSet: {
            Name: 'idsgn.ru',
            Type: 'A',
            AliasTarget: {
              DNSName: 'hamsterELB-1379142874.eu-central-1.elb.amazonaws.com',
              EvaluateTargetHealth: false,
              HostedZoneId: 'Z215JYRZR1TBD5'
            }
          }
        }
      ]
    }
  }
  // Link to ELB Regions:
  // https://docs.aws.amazon.com/general/latest/gr/rande.html#elb_region

  return new Promise((resolve, reject) => {
    route53.changeResourceRecordSets(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
