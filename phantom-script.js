var system = require('system')
var args = system.args

// Example of how to get arguments passed from node script
// args[0] would be this file's name: phantom-script.js
const url = args[1] || 'http://localhost:3010/api/v1/exercise/'

// Send some info node's childProcess' stdout

system.stdout.write('phantomJS opening page ' + url + '\r\n')
var webpage = require('webpage').create()

webpage.viewportSize = {
    width: 1920,
    height: 1080
};

webpage.paperSize = {
    format: 'A4',
    orientation: 'portrait'
}

webpage.open(url, function(status) {
    system.stdout.write('start open page\r\n')
    webpage.render('/tmp/web.pdf', {
        format: 'pdf',
        quality: '100'
    })
    system.stdout.write('finish render page\r\n')
    phantom.exit()
})
