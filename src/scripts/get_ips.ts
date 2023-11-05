/* eslint-disable no-unused-expressions */
import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import { performNmapScan } from './perform_nmap_scan';

interface IpMacPair {
  ip: string;
  mac: string;
  serviceInfo: string;
}

async function getIps(): Promise<IpMacPair[]> {
  const pairs: IpMacPair[] = [];
  const arpOutput: string = execSync('arp -a').toString();

  for (const line of arpOutput.split('\n')) {
    const parts: string[] = line.split(' ');
    if (parts.length > 3) {
      const ip: string = parts[1].replace(/[()]/g, '');
      const ipParts: string[] = ip.split('.');
      if (ipParts[3].length !== 3) {
        const mac: string = parts[3];
        const serviceInfo: string = await performNmapScan(ip);
        pairs.push({ ip, mac, serviceInfo });
      }
    }
  }

  return pairs;
}

if (require.main === module) {
  getIps().then(pairs => {
    pairs.forEach(pair => console.log(pair));

    // JSON 形式でファイルに保存
    writeFileSync('src/ips.json', JSON.stringify(pairs, null, 2));
  });
}

export { getIps };