import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { algoliaJobs, getJobs, scrapJobs } from './controlers/jobs';

dotenv.config();
const port = process.env.PORT ? Number(process.env.PORT) : 8080;
console.log(process.env.PORT);
const domain = process.env.DOMAIN || 'localhost';
const address = `http://${domain}:${port}`;
const app = express();

app.use(bodyParser.json());

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
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
  res.send('available api: /api/jobs, /api/scrap, /api/algolia');
});
app.get('/api/jobs', getJobs);
app.get('/api/scrap', scrapJobs);
app.get('/api/algolia', algoliaJobs);

mongoose.connect(
  'mongodb://localhost:27017/hn-jobs',
  {
    useNewUrlParser: true,
  },
  () => {
    console.log('connected to database');
  }
);

app.listen(port, domain, () => {
  console.info('>>> 🌎 Open %s/ in your browser.', address);
});
