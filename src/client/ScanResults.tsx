import React, { useState, useEffect } from 'react';
import IpMacPairCard from './IpMacPairCard';

interface Result {
  ip: string;
  mac: string;
  // Add other properties if needed
}

const ScanResults = () => {
  const [ipCount, setIpCount] = useState(0);
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/nmap')
      .then(response => response.json())
      .then(results => {
        console.log(results);
        setIpCount(results.ipCount);
        setResults(results.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div className="flex justify-center h-screen bg-gradient-to-r from-indigo-500 to-sky-500 flex-wrap">
      <div className="text-center w-full mt-4">
        <h1 className='text-white text-4xl'>接続デバイス</h1> {/* ここを変更 */}
      </div>
      {results && results.map((result, index) => (
        <IpMacPairCard key={index} ip={result.ip} mac={result.mac} />
      ))}
    </div>
  );
};

export default ScanResults;