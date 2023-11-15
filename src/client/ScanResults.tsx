// ScanResults.tsx

import React from 'react';
import DeviceCard from './DeviceCard';
import { IpMacPair } from '../scripts/get_ips'; // Import IpMacPair type

interface ScanResultsProps {
  scanResultsProps: IpMacPair[];
}

const ScanResults: React.FC<ScanResultsProps> = ({ scanResultsProps }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-gradient-to-r from-purple-500 to-pink-500">
      {scanResultsProps.map((pair, index) => (
        <DeviceCard key={index} pair={pair} /> // Change 'device' to 'pair'
      ))}
    </div>
  );
};

export default ScanResults;