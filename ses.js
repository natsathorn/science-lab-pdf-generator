var AWS = require('aws-sdk')
AWS.config.update({region: "us-east-1"});

var sender = "No Reply <no-reply@overboost.studio>"
var ses = new AWS.SES()

module.exports = function(receiver, fileURL) {
    const params = {
        Source: sender,
        Destination: {
            ToAddresses: receiver
        },
        Message: {
            'Subject': {
                'Data': 'Your got new PDF file',
                'Charset': 'UTF-8'
            },
            'Body': {
                'Text': {
                    'Data': 'test test test',
                    'Charset': 'UTF-8'
                },
                'Html': {
                    'Data': 'test test test',
                    'Charset': 'UTF-8'
                }
            }
        }
    }

    ses.sendEmail(params, function(err, data) {
        if (err) {
            console.error(err, err.stack) // an error occurred
            return false
        } else {
            console.log(data) // successful response
            return true
        }
    })
}
