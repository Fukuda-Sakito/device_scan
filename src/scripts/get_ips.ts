// get_ips.ts
import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import path from 'path';

export type IpMacPair = {
  ip: string;
  mac: string;
  serviceInfo: string;
};

async function getIps(): Promise<string[]> {
  const ips: string[] = [];
  const arpOutput: string = execSync('arp -a').toString();

  for (const line of arpOutput.split('\n')) {
    const parts: string[] = line.split(' ');
    if (parts.length > 1) {
      const ip: string = parts[1].replace(/[()]/g, '');
      // 既に同じ IP の要素が存在するか確認
      if (!ips.includes(ip)) {
        ips.push(ip);
      }
    }
  }

  return ips;
}

if (require.main === module) {
  getIps().then(ips => {
    // JSON 形式でファイルに保存
    writeFileSync(path.join(__dirname, '../scripts/result.json'), JSON.stringify(ips, null, 2));
  });
}

export { getIps };