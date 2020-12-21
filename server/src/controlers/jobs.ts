import { RequestHandler } from 'express';
import { Jobs } from '../models/Jobs';
import { sortByType, SortingRule } from '../utils/utils';
import { getData } from '../services/algoliaHN';
import { scrap } from '../services/puppeteer';

//that could be variable request
const pageSize = 20;

export const getJobs: RequestHandler = (req, res) => {
  const { filter, sortBy, pageIndex } = req.query;
  console.log(req.query);
  Jobs.find({}, (err, jobs) => {
    if (err) return res.status(500).json(err);
    if (!jobs)
      return res.status(400).json({
        key: 'no.result',
        message: 'No jobs found',
      });
    let page = jobs[0].json.children;
    const len = page.length;
    if (filter)
      page = page.filter((job) => {
        job.text.match(new RegExp(filter as string, 'gmi'));
      });

    if (sortBy) page = page.sort(sortByType(sortBy as SortingRule));

    const startRow = pageSize * Number(pageIndex);
    const endRow = startRow + pageSize;
    page = page.slice(startRow, endRow);
    return res.json({ page, hasMore: endRow < len });
  })
    .sort({ $natural: -1 })
    .limit(1);
};

export const scrapJobs: RequestHandler = async (req, res) => {
  const data = await scrap();
  res.send(`<pre><code>${JSON.stringify(data, null, 4)}</code></pre>`);
};

export const algoliaJobs: RequestHandler = async (req, res) => {
  const data = await getData();
  res.send(`<pre><code>${JSON.stringify(data, null, 4)}</code></pre>`);
};
