// server.ts
import express from 'express';
import { getIps } from '../scripts/get_ips';
const app = express();
// const port = 3000;
const port = 3001;

app.get('/', async (req, res) => {
  const ipMacPairs = await getIps();
  res.json(ipMacPairs);
});

app.get('/api/getIps', async (req, res) => {
  const ips = await getIps();
  res.json(ips);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});