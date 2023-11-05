"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.performNmapScan = void 0;
var child_process_1 = require("child_process");
var fs_1 = require("fs");
function performNmapScan(ip) {
    return new Promise(function (resolve, reject) {
        var command = "nmap -A ".concat(ip);
        (0, child_process_1.exec)(command, function (error, stdout, stderr) {
            if (error) {
                console.error("exec error: ".concat(error));
                return reject(error);
            }
            var filename = "nmap_scan_".concat(ip, ".txt");
            (0, fs_1.writeFileSync)(filename, stdout);
            var match = stdout.match(/Service Info: Device: (.*?);/);
            var serviceInfo = match ? match[1] : '一般';
            resolve(serviceInfo);
        });
    });
}
exports.performNmapScan = performNmapScan;
