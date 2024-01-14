import React from 'react';
import { CSSTransition } from 'react-transition-group'; // 追加
import './IpMacPairCard.css'; // 追加

interface IpMacPairCardProps {
    ip: string;
    mac: string;
}

const IpMacPairCard: React.FC<IpMacPairCardProps> = ({ ip, mac }) => {
    return (
        <CSSTransition
            in={true}
            appear={true}
            timeout={300}
            classNames="fade"
        >
            <div className="m-2 w-1/6 p-4 bg-gradient-to-r from-indigo-700 to-sky-700 rounded-lg shadow-lg flex flex-col items-center justify-center space-y-2">
                <p className="text-white text-center">{ip}</p>
                <p className="text-white text-center">{mac}</p>
            </div>
        </CSSTransition>
    );
};

export default IpMacPairCard;