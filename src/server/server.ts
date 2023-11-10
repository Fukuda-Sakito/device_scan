// server.ts
import express from 'express';
import { getIps } from '../scripts/get_ips'; // getIpsへのパスを適切に設定してください

const app = express();
const port = 3001;

app.get('/api/getIps', async (req, res) => {
  const ips = await getIps();
  res.json(ips);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});