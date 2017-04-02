var AWS = require('aws-sdk');
var fs = require('fs');

AWS.config.update({region: 'ap-southeast-1'});

var s3 = new AWS.S3();

module.exports = function(key) {
    console.log('S3 start\r\n')
    var myBucket = process.env.S3_RESOURCE_BUCKET_NAME
    fs.readFile('/tmp/web.pdf', function(err, data) {
        if (err)
            throw err;
        params = {
            Bucket: myBucket,
            Key: key,
            Body: data,
            ContentType: 'application/octet-stream',
            ACL: 'public-read'
        };
        s3.putObject(params, function(err, data) {
            if (err) {
                console.error(err)
            } else {
                console.log("Successfully uploaded " + key );
            }
        })
    })
    return
}
