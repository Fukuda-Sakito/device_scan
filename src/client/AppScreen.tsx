import React, { useState } from 'react';
import ScanResults from './ScanResults';

const AppScreen = () => {
  const [isScanning, setIsScanning] = useState(false);

  const startScan = () => {
    setIsScanning(true);
  };

  if (isScanning) {
    return <ScanResults />;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-500 to-sky-500">
      <div className="text-center">
        <div className="bg-white bg-opacity-20 rounded-full p-1 inline-block">
        </div>
        <h1 style={{ animation: 'fadeInUp 1s ease-in 1s forwards' }} className="text-white text-4xl font-bold mt-4">Device Scanner へようこそ</h1>
        <p style={{ animation: 'fadeInUp 1s ease-in 1.5s forwards' }} className="text-white text-opacity-70 mt-2">ネットワークの状態確認しましょう。</p>
        <button style={{ animation: 'fadeInUp 1s ease-in 2s forwards' }} onClick={startScan} className="mt-4 bg-white text-purple-600 font-semibold py-2 px-4 rounded-full hover:bg-purple-100">
          スタート
        </button>
      </div>
    </div>
  );
};

export default AppScreen;