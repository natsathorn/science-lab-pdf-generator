var phantomjs = require('phantomjs-prebuilt')
var s3 = require('./s3')
var moment = require('moment-timezone')

exports.handler = function(event, context, callback) {
    console.log('app start')
    var endpointURL = "https://labs.overboost.studio/api/v1/exercise/"
    endpointURL += "?name=" + event.params.querystring.name
    endpointURL += "&ex01con01=" + event.params.querystring.ex01con01
    endpointURL += "&ex01con02=" + event.params.querystring.ex01con02
    endpointURL += "&ex01con03=" + event.params.querystring.ex01con03
    endpointURL += "&ex02con01=" + event.params.querystring.ex02con01
    endpointURL += "&ex02con02=" + event.params.querystring.ex02con02
    endpointURL += "&ex02con03=" + event.params.querystring.ex02con03
    endpointURL += "&ex03con01=" + event.params.querystring.ex03con01
    endpointURL += "&ex04con01=" + event.params.querystring.ex04con01
    endpointURL += "&ex05con01=" + event.params.querystring.ex05con01
    endpointURL += "&ex05con02=" + event.params.querystring.ex05con02

    console.log("execute phantomjs with url : " + endpointURL)
    var program = phantomjs.exec('./phantom-script.js', endpointURL)
    program.stdout.pipe(process.stdout)
    program.stderr.pipe(process.stderr)
    program.on('exit', code => {
        var filename = ""
        var now = new Date()
        var date = moment().tz('Asia/Bangkok').format("DD")
        var month = moment().tz('Asia/Bangkok').format("MMMM")
        var year = moment().tz('Asia/Bangkok').format("YYYY")
        var hour = moment().tz('Asia/Bangkok').format("HH")
        var minute = moment().tz('Asia/Bangkok').format("mm")
        filename += month + "-" + date + "-" + year + "_" + hour + minute
        s3(year + '/' + month + '/' + date + '/' + filename + '.pdf')
        console.log('task done')
        return true
    })
}
