import fs from 'fs';
import React, { useEffect, useState } from 'react';
import { getIps } from '../scripts/get_ips'; // getIps関数を適切な場所からインポートする

const ScanResults = () => {
  const [scanResults, setScanResults] = useState<string[]>([]);

  useEffect(() => {
    // IPアドレスを取得
    const ips = getIps();

    // 各IPアドレスに対応するファイルからスキャン結果を読み込む
    const results: string[] = [];
    ips.forEach(ip => {
      const fileName = `nmap_scan_${ip}.txt`;
      try {
        const data = fs.readFileSync(fileName, 'utf8');
        results.push(data);
      } catch (error) {
        console.error(`Error reading file ${fileName}:`, error);
      }
    });

    setScanResults(results);
  }, []);

  return (
    <div>
      <h1>Scan Results</h1>
      {scanResults.map((result, index) => (
        <pre key={index}>{result}</pre>
      ))}
    </div>
  );
};

export default ScanResults;
