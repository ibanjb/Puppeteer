const puppeteer = require('puppeteer');
const IMDB_URL = (movie_id) => `https://www.imdb.com/title/${movie_id}/`;
const MOVIE_ID = `tt6763664`;
(async () => {
  /* Initiate the Puppeteer browser */
  // const browser = await puppeteer.launch();
  // const browser = await puppeteer.launch({headless: false}); // default is true
  const browser = await puppeteer.launch({ headless: false, slowMo: 250 }); // 250ms slow down
  const page = await browser.newPage();
  /* Go to the IMDB Movie page and wait for it to load */
  await page.goto(IMDB_URL(MOVIE_ID), { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'screenshot.png' });
  /* Run javascript inside of the page */
  let data = await page.evaluate(() => {
    let title = document.querySelector('div[class="title_wrapper"] > h1').innerText;
    let rating = document.querySelector('span[itemprop="ratingValue"]').innerText;
    let ratingCount = document.querySelector('span[itemprop="ratingCount"]').innerText;
    /* Returning an object filled with the scraped data */
    return {
      title,
      rating,
      ratingCount
    }
  });
  /* Outputting what we scraped */
  console.log(data);
  await browser.close();
})();