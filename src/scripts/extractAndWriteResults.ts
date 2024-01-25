import * as fs from 'fs';
import * as path from 'path';
import * as glob from 'glob';
import { parseStringPromise } from 'xml2js';

let results: {[key: string]: {os: string, vendor: string, service_name: string}} = {};

glob.sync('src/scripts/results/results_*').forEach(async (filename) => {
    const data = fs.readFileSync(filename, 'utf-8');
    const xml = await parseStringPromise(data);
    const hostints = xml.nmaprun.host;

    hostints.forEach((hostint: any) => {
        const ip = hostint.address[0].$.addr;
        const os = hostint.os[0].osmatch[0].$.name;
        const vendor = hostint.address[0].$.vendor;
        const service_name = hostint.ports[0].port[0].service[0].$.name;

        results[ip] = {
            os: os,
            vendor: vendor,
            service_name: service_name,
        };
    });
});

fs.writeFileSync('src/scripts/results/result.json', JSON.stringify(results));