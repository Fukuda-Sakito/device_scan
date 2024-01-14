import { exec } from 'child_process';
import { writeFileSync } from 'fs';
import path from 'path';

export function performNmapScan(ip: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const command = `sudo nmap -O -T5 -iL ./results/ips.txt`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return reject(error);
      }

      // JSON 形式でファイルに保存
      // Get the absolute path to the result.json file
      const resultPath = path.join(__dirname, `./results/nmap_scan_${ip}.txt`);
      // Use the absolute path when reading/writing the file
      writeFileSync(resultPath, stdout);

      const match = stdout.match(/Service Info: Device: (.*?);/);
      const serviceInfo = match ? match[1] : '一般';
      resolve(serviceInfo);
    });
  });
}