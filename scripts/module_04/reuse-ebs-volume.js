// Imports
const AWS = require('aws-sdk')

AWS.config.update({ region: 'eu-central-1' })

// Declare local variables
const ec2 = new AWS.EC2()
const volumeId = 'vol-01e2f176774465e0a'
const instanceId = 'i-0f9c9e146c189501b'

detachVolume(volumeId)
  .then(() => attachVolume(instanceId, volumeId))

function detachVolume(volumeId) {
  const params = {
    VolumeId: volumeId
  }

  return new Promise((resolve, reject) => {
    ec2.detachVolume(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

function attachVolume(instanceId, volumeId) {
  const params = {
    InstanceId: instanceId,
    VolumeId: volumeId,
    Device: '/dev/sdf'
  }

  return new Promise((resolve, reject) => {
    ec2.attachVolume(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
