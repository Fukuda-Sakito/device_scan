import { execSync } from 'child_process';
import { getIps } from './get_ips';

function performNmapScan(ip: string): void {
  execSync(`nmap -A ${ip} -oN nmap_scan_${ip}.txt`);
}

function runNmapScans(): void {
  const ips: string[] = getIps();
  ips.forEach(ip => {
    performNmapScan(ip);
  });
}

if (require.main === module) {
  runNmapScans();
}
