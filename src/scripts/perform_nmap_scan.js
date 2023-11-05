"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runNmapScans = exports.performNmapScan = void 0;
var child_process_1 = require("child_process");
var get_ips_1 = require("./get_ips");
function performNmapScan(ip) {
    try {
        (0, child_process_1.execSync)("nmap -A ".concat(ip, " -oN nmap_scan_").concat(ip, ".txt"));
    }
    catch (error) {
        console.error("Error during nmap scan for IP ".concat(ip, ":"), error);
    }
}
exports.performNmapScan = performNmapScan;
function runNmapScans(ips) {
    ips.forEach(function (ip) {
        (0, get_ips_1.getIps)().forEach(function (ip) { return console.log(ip); });
        performNmapScan(ip);
    });
}
exports.runNmapScans = runNmapScans;
// 直接実行した場合に、IP アドレスの配列を取得し、スキャンを実行する
if (require.main === module) {
    var ips = (0, get_ips_1.getIps)();
    runNmapScans(ips);
}
