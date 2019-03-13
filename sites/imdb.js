const puppeteer = require('puppeteer');
const IMDB_URL = (movie_id) => `https://www.imdb.com/title/${movie_id}/`;
const MOVIE_ID = `tt6763664`;
const uri = '127.0.0.1';

exports.craw = function() {
  var imdbPromise = new Promise(function(resolve, reject){
    try {
      (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
          
        await page.goto(IMDB_URL(MOVIE_ID), { waitUntil: 'networkidle0' });
        await page.screenshot({ path: 'screenshot.png' });
        
        let data = await page.evaluate(() => {
          let title = document.querySelector('div[class="title_wrapper"] > h1').innerText;
          let rating = document.querySelector('span[itemprop="ratingValue"]').innerText;
          let ratingCount = document.querySelector('span[itemprop="ratingCount"]').innerText;
          return {
            title,
            rating,
            ratingCount
          }
        });
        await browser.close();
        resolve(data);
      })();
    } catch (error) {
      reject(error);
    }
  });
  return imdbPromise;
};