import fs from 'fs';
import path from 'path';
import { IpMacPair } from './get_ips';

// IpMacPairにosmatchフィールドを追加した新しいインターフェースを定義します
interface IpMacPairWithOsmatch extends IpMacPair {
  osmatch: any[];
}

// ファイルへのパスを定義します
const resultsDataPath = path.join(__dirname, './results/results_nmap_O.json');
const resultDataPath = path.join(__dirname, './results/result.json');

// ファイルからデータを読み込みます
const resultsData: { hosts: IpMacPairWithOsmatch[] } = JSON.parse(fs.readFileSync(resultsDataPath, 'utf8'));
const resultData: IpMacPair[] = JSON.parse(fs.readFileSync(resultDataPath, 'utf8'));

// データをコンソールに出力します
console.log(`Loaded data from results_nmap_O.json: ${JSON.stringify(resultsData, null, 2)}`);
console.log(`Loaded data from result.json: ${JSON.stringify(resultData, null, 2)}`);

// result.jsonの各要素に対して、results_nmap_O.jsonの対応する要素を見つけてOSフィールドを更新します
resultData.forEach((resultElement: IpMacPair) => {
  const correspondingElement = resultsData.hosts.find((resultsElement: IpMacPairWithOsmatch) => resultsElement.mac === resultElement.mac);
  if (correspondingElement) {
    if (correspondingElement.osmatch) {
      resultElement.OS = JSON.stringify(correspondingElement.osmatch); // osmatchオブジェクトを文字列に変換してOSフィールドに設定します
      console.log(`Updated element: ${JSON.stringify(resultElement, null, 2)}`); // 更新された要素を出力します
    } else {
      console.log(`No osmatch found for element: ${JSON.stringify(resultElement, null, 2)}`); // 要素が更新されなかった理由を出力します
    }
  } else {
    console.log(`No corresponding element found for element: ${JSON.stringify(resultElement, null, 2)}`); // 要素が更新されなかった理由を出力します
  }
});

// 更新されたresult.jsonを保存します
fs.writeFileSync(resultDataPath, JSON.stringify(resultData, null, 2));
