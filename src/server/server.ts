// server.ts
import express from 'express';
import { getIps } from '../scripts/get_ips'; // getIpsへのパスを適切に設定してください
import { writeFileSync } from 'fs';
import path from 'path';

const app = express();
const port = 3001;

app.get('/api/getIps', async (req, res) => {
  const ips = await getIps();
  // JSON形式に変換
  const json = JSON.stringify(ips, null, 2);
  // ファイルの内容を初期化
  writeFileSync(path.join(__dirname, '../scripts/result.json'), '');
  // ファイルに書き込む
  writeFileSync(path.join(__dirname, '../scripts/result.json'), json);
  res.json(ips);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});