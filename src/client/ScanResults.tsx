import React, { useState} from 'react';
import { IpMacPair, getIps } from '../scripts/get_ips';

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
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-500 to-pink-500">
      <h1>Scan Results</h1>
      <button onClick={startScan} disabled={isLoading}>
        {isLoading ? 'Scanning...' : 'Start'}
      </button>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <pre>{JSON.stringify(scanResults, null, 2)}</pre>
      )}
    </div>
  );
};

export default ScanResults;