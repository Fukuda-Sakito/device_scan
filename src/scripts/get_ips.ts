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
      if (!ipMacPairs.some(pair => pair.ip === ip)) {
        ipMacPairs.push({ ip, mac, serviceInfo });
      }
    }
  }
  console.log(ipMacPairs);  // for debug
  // JSON 形式でファイルに保存
  // Get the absolute path to the result.json file
  const resultPath = path.join(__dirname, './results/result.json');
  // Use the absolute path when reading/writing the file
  writeFileSync(resultPath, JSON.stringify(ipMacPairs, null, 2));

  return ipMacPairs;
}

if (require.main === module) {
  getIps();
}

export { getIps };