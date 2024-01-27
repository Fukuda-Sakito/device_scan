import fs from 'fs';
import path from 'path';
import { IpMacPair } from './get_ips';

interface IpMacPairWithOsmatch extends IpMacPair {
  osmatch: any[];
}

// Define the correct path to the files
const resultsDataPath = path.join(__dirname, './results/results_nmap_O.json');
const resultDataPath = path.join(__dirname, './results/result.json');

// Load the data from the files
const resultsData: { hosts: IpMacPairWithOsmatch[] } = JSON.parse(fs.readFileSync(resultsDataPath, 'utf8'));
const resultData: IpMacPair[] = JSON.parse(fs.readFileSync(resultDataPath, 'utf8'));

console.log(`Loaded data from results_nmap_O.json: ${JSON.stringify(resultsData, null, 2)}`);
console.log(`Loaded data from result.json: ${JSON.stringify(resultData, null, 2)}`);

// For each element in result.json, find the corresponding element in results_nmap_O.json and update the os field
resultData.forEach((resultElement: IpMacPair) => {
  const correspondingElement = resultsData.hosts.find((resultsElement: IpMacPairWithOsmatch) => resultsElement.ipv4 === resultElement.ip && resultsElement.mac === resultElement.mac);
  if (correspondingElement) {
    if (correspondingElement.osmatch) {
      resultElement.OS = JSON.stringify(correspondingElement.osmatch); // Convert the osmatch object to a string
      console.log(`Updated element: ${JSON.stringify(resultElement, null, 2)}`); // Output the updated element
    } else {
      console.log(`No osmatch found for element: ${JSON.stringify(resultElement, null, 2)}`); // Output the reason why the element was not updated
    }
  } else {
    console.log(`No corresponding element found for element: ${JSON.stringify(resultElement, null, 2)}`); // Output the reason why the element was not updated
  }
});

// Save the updated result.json
fs.writeFileSync(resultDataPath, JSON.stringify(resultData, null, 2));