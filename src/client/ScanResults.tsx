import React, { useState, useEffect } from 'react';

const ScanResults = () => {
  const [ipCount, setIpCount] = useState(0);

  useEffect(() => {
    fetch('http://localhost:3001/api/nmap')
      .then(response => response.json())
      .then(results => {
        setIpCount(results.ipCount);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-500 to-sky-500">
      <div className="text-center">
        <h1>Scan Results</h1>
        <p>IP count: {ipCount}</p>
      </div>
    </div>
  );
};

export default ScanResults;