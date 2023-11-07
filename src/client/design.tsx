import React from 'react';

const AppScreen = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-500 to-pink-500">
      <div className="text-center">
        <div className="bg-white bg-opacity-20 rounded-full p-1 inline-block">
          {/* Replace "your-image-path.png" with the actual image path */}
          <img src="your-image-path.png" alt="Computer Monitor" className="w-64 h-64 object-cover rounded-full" />
        </div>
        <h1 className="text-white text-4xl font-bold mt-4">Device Scanner へようこそ</h1>
        <p className="text-white text-opacity-70 mt-2">ネットワークの状態確認しましょう。</p>
        <button className="mt-4 bg-white text-purple-600 font-semibold py-2 px-4 rounded-full hover:bg-purple-100">
          スタート
        </button>
      </div>
    </div>
  );
};

export default AppScreen;
