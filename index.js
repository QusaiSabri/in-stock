const puppeteer = require('puppeteer');

const VIEWPORT = { width: 1280, height: 720, deviceScaleFactor: 2 }; // Your default values

var content = [];

(async () => {
  const browser = await puppeteer.launch({
    headless: true
  });
  const page = await browser.newPage();

  await page.tracing.start({
    path: 'trace.json',
    categories: ['devtools.timeline']
  });
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36'
  );
  await page.goto(
    'https://www.nvidia.com/en-us/shop/geforce/?page=1&limit=9&locale=en-us',
    { waitUntil: 'networkidle2' }
  );
  // await page.setViewport(
  //   Object.assign({}, VIEWPORT, { height: fullPageSize.height })
  // );

  // page.$eval('#resultsDiv > div > div:nth-child(3)', el => el.scrollIntoView());

  await page.screenshot({ path: 'screenshots/Nvidia.png', fullPage: true });

  const stories = await page.$$eval('.product-details-container', anchors => {
    return anchors.map(anchor => anchor.textContent).slice(0, 10);
  });

  content = await page.evaluate(() => {
    let divs = [...document.querySelectorAll('.product-details-list-tile')];
    // return divs.map(div => div.innerText);
    return divs
      .filter(div => div.innerText.trim().includes('RTX 3080'))
      .map(div => div.innerText);
  });
  // console.log('');
  // const html = await page.$eval(
  //   '#resultsDiv > div > div:nth-child(3)',
  //   e => e.textContent
  // );

  // console.log('content');

  // console.log(html);
  // console.log(stories);

  await page.tracing.stop();
  await browser.close();

  // const name = await page.$eval(
  //   '.product-details-list-tile',
  //   el => el.innerText
  // );
  console.log('');
  // console.log(name);

  await browser.close();

  ///Send SMS


  // req.type('json');

  if (
    content
      .toString()
      .toLowerCase()
      .includes('out of stock')
  ) {
    console.log('');
    console.log(content);
    console.log('');
    console.log('still sold out');
    req.send({
      content: 'The RTX 3080 is available!',
      from: 'Name ',
      to: 'PhoneNumber'
    });

    req.end(function(res) {
      if (res.error) throw new Error(res.error);

      console.log(res.body);
    });
  }
})();
