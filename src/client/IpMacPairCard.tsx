import React from 'react';

const IpMacPairCard = ({ serviceInfo, image }) => {
  return (
    <div className="rounded-lg shadow-lg p-4 m-2 flex flex-col items-center">
      <img src={image} alt="Service" className="w-16 h-16 mb-4" />
      <div className="text-center">
        <p className="font-bold">{serviceInfo.ip}</p>
        <p>{serviceInfo.mac}</p>
      </div>
    </div>
  );
};

export default IpMacPairCard;