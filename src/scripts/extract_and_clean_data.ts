// 必要なモジュールをインポートします
import fs from 'fs'; // ファイルシステム操作のためのモジュール
import path from 'path'; // パス操作のためのモジュール
import parse from 'xml-parser'; // XML解析のためのモジュール

// 'temp_with_spaces.txt' ファイルを読み込み、その内容を 'data' に格納します
let data = fs.readFileSync('temp_with_spaces.txt', 'utf8');
// データを行ごとに分割します
let lines = data.split('\n');

// JSONオブジェクトのインターフェースを定義します
interface JsonObj {
  address?: any; // アドレス情報を格納するプロパティ
  osmatch?: any[]; // OSマッチ情報を格納するプロパティ
}

// 空のJSONオブジェクトを初期化します
let json: JsonObj = {};
// カウンターを初期化します
let count = 0;

// 結果を格納するディレクトリを定義します
let resultsDir = path.join(__dirname, 'results');

// 結果のディレクトリが存在しない場合、それを作成します
if (!fs.existsSync(resultsDir)) {
  fs.mkdirSync(resultsDir);
}

// データの各行を処理します
lines.forEach((line: string) => {
  // 行が空の場合、現在のJSONオブジェクトをファイルに書き込み、JSONオブジェクトをリセットします
  if (line.trim() === '') {
      fs.writeFileSync(path.join(resultsDir, `result_nmap_O_${count}.json`), JSON.stringify(json));
      console.log(`Writing to file result_nmap_O_${count}.json`); // 追加
      json = {};
      count++;
  // 行が'<address'で始まる場合、それをアドレスとして解析し、JSONオブジェクトに追加します
  } else if (line.startsWith('<address')) {
      let obj = parse(line).root.attributes;
      json.address = obj;
      console.log(`Adding address: ${JSON.stringify(obj)}`); // 追加
  // 行が'<osmatch'で始まる場合、それをosmatchとして解析し、JSONオブジェクトに追加します
  } else if (line.startsWith('<osmatch')) {
      let obj = parse(line).root.attributes;
      if (!json.osmatch) {
          json.osmatch = [];
      }
      json.osmatch.push(obj);
      console.log(`Adding osmatch: ${JSON.stringify(obj)}`); // 追加
  }
});

// クリーンなデータを保存するための配列を初期化します
let cleanedData: any[] = [];

// 各JSONファイルを処理します
for (let i = 0; i < count; i++) {
  // ファイルを読み込み、その内容をJSONオブジェクトとして解析します
  let filePath = path.join(resultsDir, `result_nmap_O_${i}.json`);
  let fileData = fs.readFileSync(filePath, 'utf8');
  let jsonObj: JsonObj = JSON.parse(fileData);

  // osmatchが'Android'を含む場合、そのマッチだけを保持します
  // それ以外の場合は、最初のマッチだけを保持します
  let androidMatch = jsonObj.osmatch?.find((match: any) => match.name.includes('Android'));
  if (androidMatch) {
    jsonObj.osmatch = [androidMatch];
  } else {
    jsonObj.osmatch = jsonObj.osmatch ? [jsonObj.osmatch[0]] : [];
  }

  // クリーンなJSONオブジェクトをファイルに書き戻します
  fs.writeFileSync(filePath, JSON.stringify(jsonObj));
  // クリーンなJSONオブジェクトを配列に追加します
  cleanedData.push(jsonObj);
}

console.log(`Cleaned data: ${JSON.stringify(cleanedData)}`); // 追加

// 結果ファイルのパスを定義します
let resultFilePath = path.join(__dirname, 'results', 'result.json');
console.log(`Result file path: ${resultFilePath}`); // 追加

// 結果ファイルが存在しない場合、エラーでプログラムを終了します
if (!fs.existsSync(resultFilePath)) {
  console.error(`File ${resultFilePath} does not exist.`);
  process.exit(1);
}

// 結果ファイルを読み込み、その内容をJSON配列として解析しようとします
let resultData;
try {
  resultData = JSON.parse(fs.readFileSync(resultFilePath, 'utf8'));
  console.log(`Parsed result data: ${JSON.stringify(resultData)}`); // 追加
} catch (error) {
  console.error(`Error parsing ${resultFilePath}: ${error}`);
  process.exit(1);
}

// 結果データが配列でない場合、エラーでプログラムを終了します
if (!resultData || !Array.isArray(resultData)) {
  console.error(`Invalid data in ${resultFilePath}`);
  process.exit(1);
}

// 結果データの各アイテムを処理します
resultData.forEach((resultItem: any, index: number) => { // index追加
  console.log(`Processing result item ${index}: ${JSON.stringify(resultItem)}`); // 追加

  // アイテムにmacアドレスがない場合、それをスキップします
  if (!resultItem.mac) {
    console.error(`Invalid mac address in result item`);
    return;
  }

  // クリーンなデータで一致するアイテムを見つけます
  let matchingItem = cleanedData.find(item => item.address && item.address.addr === resultItem.mac);
  
  // 一致するアイテムが見つかった場合、ベンダーとOSを結果アイテムに追加します
  if (matchingItem && matchingItem.address && matchingItem.osmatch && matchingItem.osmatch[0]) {
    resultItem.vendor = matchingItem.address.vendor;
    resultItem.os = matchingItem.osmatch[0].name;
    console.log(`Match found for item ${index}: ${JSON.stringify(matchingItem)}`); // 追加
  }
});

// 結果データを結果ファイルに書き戻します
fs.writeFileSync(resultFilePath, JSON.stringify(resultData));
console.log(`Wrote result data back to file: ${resultFilePath}`); // 追加