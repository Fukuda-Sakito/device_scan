// get_ips.ts
import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import path from 'path';

export type IpMacPair = {
  ip: string;
  mac: string;
  serviceInfo: string;
};

async function getIps(): Promise<IpMacPair[]> {
  const ipMacPairs: IpMacPair[] = [];
  const arpOutput: string = execSync('arp -a').toString();

  for (const line of arpOutput.split('\n')) {
    const parts: string[] = line.split(' ');
    if (parts.length > 3) {
      const ip: string = parts[1].replace(/[()]/g, '');
      const mac: string = parts[3];
      const serviceInfo: string = parts[0];
      // 既に同じ IP の要素が存在するか確認
      if (!ipMacPairs.some(pair => pair.ip === ip)) {
        ipMacPairs.push({ ip, mac, serviceInfo });
      }
    }
  }

  return ipMacPairs;
}

if (require.main === module) {
  getIps().then(ipMacPairs => {
    // JSON 形式でファイルに保存
    writeFileSync('../scripts/result.json', JSON.stringify(ipMacPairs, null, 2));
    // writeFileSync(path.join(__dirname, '../scripts/result.json'), JSON.stringify(ipMacPairs, null, 2));
  });
}

export { getIps };