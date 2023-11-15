// DeviceCard.tsx

import React from 'react';
import { IpMacPair } from '../scripts/get_ips'; // Import IpMacPair type

interface DeviceCardProps {
  pair: IpMacPair;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ pair }) => {
  return (
    <div className="bg-white bg-opacity-50 p-4 rounded-lg shadow-md"> {/* Add bg-opacity-50 to make the card semi-transparent */}
      <h2 className="text-xl font-bold">{pair.ip}</h2>
      <p>{pair.mac}</p>
    </div>
  );
};

export default DeviceCard;