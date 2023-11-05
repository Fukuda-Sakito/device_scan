import { execSync } from 'child_process';

function getIps(): string[] {
  const ips: string[] = [];

  // arp -a から IP アドレスを取得
  const arpOutput: string = execSync('arp -a').toString();
  arpOutput.split('\n').forEach(line => {
    const parts: string[] = line.split(' ');
    if (parts.length > 1) {
      const ip: string = parts[1].replace(/[()]/g, '');
      ips.push(ip);
    }
  });

  // ifconfig から IP アドレスを取得
  const ifconfigOutput: string = execSync('ifconfig').toString();
  ifconfigOutput.split('\n').forEach(line => {
    if (line.includes('inet ') && !line.includes('127.0.0.1')) {
      const parts: string[] = line.trim().split(' ');
      const ip: string = parts[1];
      ips.push(ip);
    }
  });

  return ips;
}

if (require.main === module) {
  getIps().forEach(ip => console.log(ip));
}

export { getIps };
