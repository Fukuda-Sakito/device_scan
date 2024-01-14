import React, { useState} from 'react';
import { IpMacPair, getIps } from '../scripts/get_ips';
import IpMacPairCard from './IpMacPairCard';

interface ScanResultsProps {
  scanResultsProps: IpMacPair[];
}

const ScanResults: React.FC<ScanResultsProps> = ({ scanResultsProps }) => {
  const [scanResults, setScanResults] = useState<IpMacPair[]>(scanResultsProps);
  const [isLoading, setIsLoading] = useState(false);

  const startScan = async () => {
    setIsLoading(true);
    const results = await getIps();
    setScanResults(results);
    setIsLoading(false);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-500 to-sky-500">
      <h1>Scan Results</h1>
      <button onClick={startScan} disabled={isLoading}>
        {isLoading ? 'Scanning...' : 'Start'}
      </button>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <pre>{JSON.stringify(scanResults, null, 2)}</pre>
      )}
      <div className="flex flex-wrap justify-center">
      {scanResults.map((result, index) => (
        <IpMacPairCard key={index} serviceInfo={result.serviceInfo} image={result.image} />
        // <IpMacPairCard key={index} serviceInfo={result.serviceInfo} image={result.image} />
      ))}
      </div>
    </div>
  );
};