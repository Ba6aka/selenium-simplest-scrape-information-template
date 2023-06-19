const { Builder, By } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const countries = []

async function example() {
  const options = new chrome.Options()

  options.addArguments('--headless')
  options.addArguments('--window-size=1920,1080')
  options.addArguments('--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36')

  const driver = new Builder().forBrowser('chrome').setChromeOptions(options).build()

  try {
    await driver.get('https://www.wipo.int/members/ru/')
    console.log('load page')

    const elements = await driver.findElements(By.css('div.cols.cols--three ul li'))
    console.log('find elements')

    for (const element of elements) {
      const text = await element.getText()
      if (text != '') {
        console.log(`find country:${text}`)
        countries.push(text)
      }
    }

    console.log(`find ${countries.length} countries`)

  } finally {
    await driver.quit()
  }
}

example()