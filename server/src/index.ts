import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { scrap } from './services/puppeteer';
import { getData } from './services/algoliaHN';
import mongoose from 'mongoose';
import { runSchedule } from './services/scheduler';
import { Jobs } from './models/Jobs';
dotenv.config();
const port = process.env.PORT ? Number(process.env.PORT) : 8080;
console.log(process.env.PORT);
const domain = process.env.DOMAIN || 'localhost';
const address = `http://${domain}:${port}`;
const app = express();

app.use(bodyParser.json());

const allowedOrigins = [
  'http://localhost:3000',
  'https://news.ycombinator.com',
  'https://hn.algolia.com/',
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.get('/', (req, res) => {
  res.send('available api: /api/todo');
});
app.get('/api/scrap', async (req, res) => {
  // const data = await getData();
  Jobs.find({}, (err, jobs) => {
    if (err) return res.status(500).json(err);
    if (!jobs)
      return res.status(400).json({
        key: 'no.result',
        message: 'No jobs found',
      });
    return res.json(jobs);
  })
    .sort({ $natural: -1 })
    .limit(1);

  // res.send(`<pre><code>${JSON.stringify(data, null, 4)}</code></pre>`);
});
mongoose.connect(
  'mongodb://localhost:27017/hn-jobs',
  {
    useNewUrlParser: true,
  },
  () => {
    console.log('connected to database');
  }
);
runSchedule(() => {
  getData()
    .then((jobs) => {
      const JobsEntity = new Jobs({ json: jobs });
      return JobsEntity.save();
    })
    .catch(console.error);
    //todo delete previous
});
app.listen(port, domain, () => {
  console.info('>>> 🌎 Open %s/ in your browser.', address);
});
