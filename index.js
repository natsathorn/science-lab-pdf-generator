var phantomjs = require('phantomjs-prebuilt')

exports.handler = function(event, context, callback) {
    var sourceUrl = ""
    var program = phantomjs.exec('phantom.js', sourceUrl)
    program.stdout.pipe(process.stdout)
    program.stderr.pipe(process.stderr)
    program.on('exit', code => {
        // do something here after you phantomjs finish.
        return
    })
}
