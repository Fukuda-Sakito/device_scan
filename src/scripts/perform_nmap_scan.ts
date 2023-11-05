import { execSync } from 'child_process';
import { getIps } from './get_ips';

export function performNmapScan(ip: string): void {
  try {
    execSync(`nmap -A ${ip} -oN nmap_scan_${ip}.txt`);
  } catch (error) {
    console.error(`Error during nmap scan for IP ${ip}:`, error);
  }
}

export async function runNmapScans(ips: string[]): Promise<void> {
  for (const ip of ips) {
    console.log(ip, "実行中");
    performNmapScan(ip);
  }
}

// 直接実行した場合に、IP アドレスの配列を取得し、スキャンを実行する
if (require.main === module) {
  const ips = getIps();
  console.log(ips, "受け取った配列")
  runNmapScans(ips);
}
