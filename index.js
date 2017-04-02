var phantomjs = require('phantomjs-prebuilt')
var ses = require('./ses')
var s3 = require('./s3')

exports.handler = function(event, context, callback) {
    console.log('app start')
    console.log(event.params.querystring.name)
    console.log(context)
    var receiver = process.env.RECEIVER_ADDRESS.split(',')
    var sourceUrl = "http://localhost:3010/api/v1/exercise/"
    console.log("execute phantomjs with url : " + sourceUrl)
    var program = phantomjs.exec('./phantom-script.js', sourceUrl)
    program.stdout.pipe(process.stdout)
    program.stderr.pipe(process.stderr)
    program.on('exit', code => {
        var filename = ""
        var now = new Date()
        var date = (now.getDate() < 10)
            ? "0" + now.getDate()
            : now.getDate()
        var month = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ]
        month = month[now.getMonth()]
        var year = now.getFullYear()
        var hour = now.getHours()
        var minute = now.getMinutes()
        filename += + month + "-" + date + "-" + year + "_" + hour + ":" + minute
        s3(year + '/' + month + '/' + filename + '.pdf')
        console.log('task done')
        return
    })
}
