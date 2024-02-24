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

  await page.goto(options.pageUrl, { waitUntil: "domcontentloaded" });

  // 输入用户名和密码
  await page.type("#fm-login-id", "pxl_0510@163.com", {
    delay: 100,
  }); //#username 是输入用户名的输入框的select选择器，与css选择方式一致，下方密码输入一致
  await page.type("#fm-login-password", "pxl_0510", {
    delay: 100, //键盘按下和释放间隔的时间，单位为毫秒
  });

  // 提交表单
  await Promise.all([
    page.click("#fm-login-submit"), //#btnSubmit 登录按钮的id
    page.waitForNavigation(), //如果点击事件发生跳转，会有一个独立的promise对象需要等待（等待页面跳转）
  ]);

  setTimeout(() => {
    page.click(".next-dialog-close");
  }, 3000);
   

  return {
    page,
    browser,
  };
};

module.exports = openPage;
