import puppeteer from 'puppeteer';

const scrap = (id: string) =>
  new Promise(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setRequestInterception(true);
      //ignore everything except document html
      page.on('request', (request) => {
        if (request.resourceType() === 'document') {
          request.continue();
        } else {
          request.abort();
        }
      });
      /**
       * Ask HN: Who is hiring? (December 2020)
       *
       * this could be variable request from the client
       * but for sake of simplicity I leave it hardcoded
       * */
      await page.goto(`https://news.ycombinator.com/item?id=${id}`);
      let data: any[] = [];
      let pageCount = 0;
      while (true) {
        console.log(++pageCount);
        await page.waitForSelector('tr.athing');
        data = data.concat(await page.evaluate(scrapPosts));
        // go to next page if exists
        const hasMore = await page
          .waitForSelector('a.morelink', { timeout: 2000 })
          .then((_) => true)
          .catch((_) => false);
        if (hasMore) {
          await page.click('a.morelink');
        } else break;
      }
      await browser.close();
      return resolve(data);
    } catch (e) {
      return reject(e);
    }
  });

const scrapPosts = () => {
  let items = document.querySelectorAll('td.default');
  const results: any[] = [];
  /**
   * unfortunately those functions cannot be extracted from page.evaluate(()=>CONTEXT)
   */
  const getCompanyURL = (item: Element) => {
    return item
      .querySelectorAll('div.comment')
      .item(0)
      ?.getElementsByTagName('a')
      .item(0)
      ?.getAttribute('href');
  };
  const getSalary = (item: Element) => {
    const finder = new RegExp(/[$€£]\d+.{0,2}-.{0,2}[$€£]?\d+k?/, 'gmi');
    return item.innerHTML.match(finder);
  };
  const getLocation = (item: Element) => {
    const finder = new RegExp(/(remote|onsite|local)/, 'gmi');
    return item.innerHTML.match(finder);
  };
  const getTimestamp = (item: Element) => {
    const date = item
      .querySelectorAll('span.age')
      .item(0)
      ?.getElementsByTagName('a')
      .item(0)
      ?.innerText?.split(' ');
    return createTimestamp(date);
  };
  const createTimestamp = (data: any[] | undefined) => {
    if (!data) return new Date();
    const number = data[0];
    const type = data[1];
    const now = new Date();
    let timestamp: Date = new Date();
    switch (type) {
      case 'minutes': {
        timestamp = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDay(),
          now.getHours(),
          now.getMinutes() - number
        );
        break;
      }
      case 'hours': {
        timestamp = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDay(),
          now.getHours() - number
        );
        break;
      }
      case 'days': {
        timestamp = new Date(now.getFullYear(), now.getMonth(), now.getDay() - number);
        break;
      }
      case 'months': {
        timestamp = new Date(now.getFullYear(), now.getMonth() - number);
        break;
      }
      case 'years': {
        timestamp = new Date(now.getFullYear() - number);
        break;
      }
    }
    return timestamp;
  };

  items.forEach((item) => {
    results.push({
      url: getCompanyURL(item),
      salary: getSalary(item),
      location: getLocation(item),
      timestamp: getTimestamp(item),
      text: item.querySelector('span.commtext.c00')?.innerHTML,
    });
  });
  return results;
};
export { scrap };
