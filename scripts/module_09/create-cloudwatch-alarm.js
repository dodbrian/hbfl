// Imports
const AWS = require('aws-sdk')

AWS.config.update({ region: 'eu-central-1' })

// Declare local variables
const cw = new AWS.CloudWatch()
const alarmName = 'hamster-elb-alarm'
const topicArn = 'arn:aws:sns:eu-central-1:318731036434:hamster-topic'
const tg = 'targetgroup/hamsterTG/cbf4add4df7f6a83'
const lb = 'app/hamsterELB/7b91d7662fa4eef0'

createCloudWatchAlarm(alarmName, topicArn, tg, lb)
  .then(data => console.log(data))

function createCloudWatchAlarm(alarmName, topicArn, tg, lb) {
  const params = {
    AlarmName: alarmName,
    ComparisonOperator: 'LessThanThreshold',
    EvaluationPeriods: 1,
    MetricName: 'HealthyHostCount',
    Namespace: 'AWS/ApplicationELB',
    Period: 60,
    Threshold: 1,
    AlarmActions: [
      topicArn
    ],
    Dimensions: [
      {
        Name: 'TargetGroup',
        Value: tg
      }, {
        Name: 'LoadBalancer',
        Value: lb
      }
    ],
    Statistic: 'Average',
    TreatMissingData: 'breaching'
  }

  return new Promise((resolve, reject) => {
    cw.putMetricAlarm(params, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}
