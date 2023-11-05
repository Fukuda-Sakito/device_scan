import { exec } from 'child_process';
import { writeFileSync } from 'fs';

export function performNmapScan(ip: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const command = `nmap -A ${ip}`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return reject(error);
      }

      const filename = `nmap_scan_${ip}.txt`;
      writeFileSync(filename, stdout);

      const match = stdout.match(/Service Info: Device: (.*?);/);
      const serviceInfo = match ? match[1] : '一般';
      resolve(serviceInfo);
    });
  });
}