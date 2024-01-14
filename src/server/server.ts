import express from 'express';
import cors from 'cors'; // Add this line
import { getIps } from '../scripts/get_ips';
import { nmapScan, countIPs } from '../scripts/nmap_scan';

const app = express();

app.use(cors()); // Add this line

// const port = 3000;
const port = 3001;

app.get('/', async (req, res) => {
  const ipMacPairs = await getIps();
  res.json(ipMacPairs);
});

app.get('/api/nmap', async (req, res) => {
  const ipCount = await countIPs();
  res.json({ ipCount });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});