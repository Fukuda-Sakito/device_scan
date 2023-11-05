"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIps = void 0;
var child_process_1 = require("child_process"); // Node で外部コマンドを実行するためのモジュール。bash コマンドや nmap を利用できるようになる。
function getIps() {
    /*
      * この関数は、実行端末と、ローカルネットワーク上の IP アドレスを取得する。
      * この関数は、`arp -a` と `ifconfig` を実行し、
      * それぞれのコマンドの出力から IP アドレスを取得する。
      * この関数は、取得した IP アドレスを配列に格納し、
      * その配列を返す。
      * この関数は、`getIps` という名前でエクスポートされる。
    */
    var ips = []; // 取得した IP アドレスを格納する配列
    var arpOutput = (0, child_process_1.execSync)('arp -a').toString(); // `arp -a` から IP アドレスを取得
    // 改行コードで分割し、各行について処理を行う
    arpOutput.split('\n').forEach(function (line) {
        var parts = line.split(' ');
        if (parts.length > 1) {
            var ip = parts[1].replace(/[()]/g, '');
            ips.push(ip);
        }
    });
    // const ifconfigOutput: string = execSync('ifconfig').toString();  // ifconfig から IP アドレスを取得
    // ifconfigOutput.split('\n').forEach(line => {
    //   if (line.includes('inet ') && !line.includes('127.0.0.1')) {
    //     const parts: string[] = line.trim().split(' ');
    //     const ip: string = parts[1];
    //     ips.push(ip);
    //   }
    // });
    return ips;
}
exports.getIps = getIps;
// 直接実行した場合に、IP アドレスを出力するデバックコード
if (require.main === module) {
    getIps().forEach(function (ip) { return console.log(ip); });
}
