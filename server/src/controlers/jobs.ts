import { RequestHandler } from 'express';
import { Job, Jobs } from '../models/Jobs';
import { sortByType } from '../utils/utils';
import { getData } from '../services/algoliaHN';
import { scrap } from '../services/puppeteer';
import { Scheduler } from '../services/scheduler';
import { isArray } from 'lodash';
//that could be variable request
const pageSize = 20;

export const getJobs: RequestHandler = async (req, res) => {
  let filters: string[] = [];
  if (req.query.filters)
    if (!isArray(req.query.filters)) {
      filters = [req.query.filters as string];
    } else {
      filters = [...(req.query.filters as string[])];
    }
  const pageIndex = req.query.pageIndex as string;
  const thread = req.query.thread as string;
  const sortBy = req.query.sortBy as string;
  const desc = req.query.desc as string;
  if (Scheduler.isRunning(thread)) {
    console.log(`search for thread ${thread}`);
    Jobs.find({ thread }, (err, jobs) => {
      if (err) return res.status(500).json(err);
      if (!jobs || !jobs.length)
        return res.status(400).json({
          key: 'no.result',
          message: 'No jobs found',
        });
      const { page, hasMore } = getPaginatedData(jobs, pageIndex, filters, sortBy, desc);
      return res.json({ page, hasMore });
    });
  } else {
    // first run unfortunately will be slow
    const jobs = await Jobs.find({ thread }, (err, jobs) => {
      if (err || !jobs || !jobs.length) return [];
      return jobs;
    })
      .exec()
      .catch(console.error);

    if (jobs && jobs.length) {
      const { page, hasMore } = getPaginatedData(jobs, pageIndex, filters, sortBy, desc);
      res.json({ page, hasMore });
    } else {
      //in this case we never asked for specified thread
      getData(thread)
        .then((jobs) => {
          const { page, hasMore } = getPaginatedData(
            [{ json: jobs, thread } as Job],
            pageIndex,
            filters,
            sortBy,
            desc
          );
          res.json({ page, hasMore });
        })
        .catch(console.error);
    }
  }
  // we set up scheduler which will update thread
  Scheduler.runSchedule(thread, () => {
    getData(thread)
      .then((jobs) => {
        const JobsEntity = new Jobs({ json: jobs, thread });
        return JobsEntity.save();
      })
      .then((recent) => {
        return Jobs.find({}, (err, docs) => {
          docs
            .filter((doc) => doc.thread === recent.thread && doc.id !== recent.id)
            .forEach((doc) => doc.delete());
        });
      })
      .catch(console.error);
  });
};

export const scrapJobs: RequestHandler = async (req, res) => {
  const startHrTime = process.hrtime();
  const data = await scrap('25266288');
  const elapsedHrTime = process.hrtime(startHrTime);
  const time = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
  res.send(`<pre><code>${JSON.stringify({ time, data }, null, 4)}</code></pre>`);
};

export const algoliaJobs: RequestHandler = async (req, res) => {
  const startHrTime = process.hrtime();
  const data = await getData('25266288');
  const elapsedHrTime = process.hrtime(startHrTime);
  const time = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
  res.send(`<pre><code>${JSON.stringify({ time, data }, null, 4)}</code></pre>`);
};

/**
 * for further optimization naturally data should be stored not as a json but as normal searchable entities
 * so that filters could be applied in where statement, not afterwords on all results.
 */
export const getPaginatedData = (
  jobs: Job[],
  pageIndex: string,
  filters?: string[],
  sortBy?: string,
  desc?: string
) => {
  let page = jobs[0].json.children;

  const len = page.length;
  if (filters) {
    page = page.filter((job) => job.text?.match(new RegExp(filters.join('|'), 'gmi') ?? true));
  }
  if (sortBy) {
    if (sortBy == 'date')
      page = page.sort(sortByType({ id: 'created_at_i', desc: desc === 'true' }));
    if (sortBy == 'salary') {
      page = page
        .filter((job) =>
          job.text?.match(new RegExp(/[$€£]\d+.{0,2}-.{0,2}[$€£]?\d+k?/, 'gmi') ?? true)
        )
        .map((job) => {
          let salary: any[] =
            job.text.match(new RegExp(/[$€£]\d+.{0,2}-.{0,2}[$€£]?\d+k?/, 'gmi')) || [];
          if (salary && salary.length) salary = salary[0].match(/\d+/) || [];
          return { ...job, salary };
        })
        .sort((l, r) => (desc === 'true' ? l.salary[0] - r.salary[0] : r.salary[0] - l.salary[0]));
    }
  }

  const startRow = pageSize * Number(pageIndex);
  const endRow = startRow + pageSize;
  page = page.slice(startRow, endRow);
  const hasMore = endRow < len;
  return { page, hasMore };
};
