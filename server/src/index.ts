import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { scrap } from './services/puppeteer';
dotenv.config();
const port = process.env.PORT ? Number(process.env.PORT) : 8080;
console.log(process.env.PORT);
const domain = process.env.DOMAIN || 'localhost';
const address = `http://${domain}:${port}`;
const app = express();

app.use(bodyParser.json());

const allowedOrigins = ['http://localhost:3000', 'https://news.ycombinator.com'];
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
  const data = await scrap();
  res.send(data);
});

app.listen(port, domain, () => {
  console.info('>>> 🌎 Open %s/ in your browser.', address);
});
