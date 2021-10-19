const pup = require('puppeteer')
const browserSettings = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/5s37.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36'

async function getBrowser (){
    console.log('>Setting up browser')
    let browser = await pup.launch({ headless: false })
    let page = await browser.newPage()
    await page.setViewport({ width: 1920, height: 1180});
    await page.setUserAgent(browserSettings)
    return browser
}

module.exports = {
    getBrowser,
}