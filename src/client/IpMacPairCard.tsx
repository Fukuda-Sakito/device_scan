import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './IpMacPairCard.css';
import logo from './images/Android_Robot.png';

interface IpMacPairCardProps {
  vendor: string;
  os: string;
}

const IpMacPairCard: React.FC<IpMacPairCardProps> = ({ vendor, os }) => {
  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={300}
      classNames="fade"
    >
      <div className="m-2 w-1/6 p-4 bg-gradient-to-r from-indigo-700 to-sky-700 rounded-lg shadow-lg flex items-center justify-center space-x-2 cursor-pointer">
        <img src={logo} alt="logo" style={{ width: '20px', marginRight: '10px', alignSelf: 'center' }} />
        <div className="text-white">
          <p className="text-center">Vendor: {vendor}</p>
          <p className="text-center">OS: {os}</p>
        </div>
        <div className="text-white text-2xl">{'>'}</div>
      </div>
    </CSSTransition>
  );
};

export default IpMacPairCard;