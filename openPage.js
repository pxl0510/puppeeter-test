const puppeteer = require("puppeteer");
// const devices = require('puppeteer/DeviceDescriptors');

// // puppeteer/DeviceDescriptors, If no device style, need to customize
// const desktopDevice = {
//   name: 'Desktop 1920x1080',
//   userAgent: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.75 Safari/537.36',
//   viewport: {
//     width: 1920,
//     height: 1080,
//   },
// };

const openPage = async (options) => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  // await page.emulate(device);
  if (options.cookies && options.cookies.length) {
    await page.setCookie(...options.cookies);
    await page.cookies(options.pageUrl);
  }
  await page.goto(options.pageUrl);

  return {
    page,
    browser,
  };
};

module.exports = openPage;
