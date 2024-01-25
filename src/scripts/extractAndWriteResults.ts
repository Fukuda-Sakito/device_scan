import * as fs from 'fs';
import * as path from 'path';
import * as glob from 'glob';

// 結果を保存するオブジェクト
let results: {[key: string]: {os_version: string, developer: string, service_name: string}} = {};

// src/scripts/results_result_* ファイルを読み込む
glob.sync('src/scripts/results_result_*').forEach((filename) => {
    const data = fs.readFileSync(filename, 'utf-8');
    // ファイルから情報を抽出（この部分は実際のファイルの内容に合わせて修正が必要）
    const [os_version, developer, service_name] = data.split('\n');

    // IPアドレスをキーとして情報を保存
    const ip = path.basename(filename).replace('results_result_', '');
    results[ip] = {
        os_version: os_version.trim(),
        developer: developer.trim(),
        service_name: service_name.trim(),
    };
});

// 結果を src/scripts/result.json に書き込む
fs.writeFileSync('src/scripts/results/result.json', JSON.stringify(results));