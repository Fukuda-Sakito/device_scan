import React from 'react';

interface IpMacPair {
  ip: string;
  mac: string;
  serviceInfo: string;
}

const ScanResults = () => {
  const scanResults: IpMacPair[] = require('../ips.json');

  return (
    <div>
      <h1>Scan Results</h1>
      <pre>{JSON.stringify(scanResults, null, 2)}</pre>
    </div>
  );
};

export default ScanResults;