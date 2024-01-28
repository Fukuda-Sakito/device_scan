import React from "react";
import { CSSTransition } from "react-transition-group";
import "./IpMacPairCard.css";

interface IpMacPairCardProps {
  vendor: string;
  OS: string;
}

const IpMacPairCard: React.FC<IpMacPairCardProps> = ({ vendor, OS }) => {
  let logo;
  if (OS.includes("Android")) {
    logo = require("./images/Android_Robot.png");
  } else if (OS.includes("Apple") || OS.includes("mac") || OS.includes("iOS")) {
    logo = require("./images/apple.jpg");
  } else if (OS.includes("Microsoft") || OS.includes("Windows")) {
    logo = require("./images/windows.png");
  } else if (OS.includes("router")) {
    logo = require("./images/router.jpg");
  } else if (OS.includes("Linux")) {
    logo = require("./images/linux-96.png");
  } else {
    logo = require("./images/default.png"); // どの条件にも当てはまらない場合のデフォルトのロゴ
  }

  return (
    <CSSTransition in={true} appear={true} timeout={300} classNames="fade">
      <div className="m-2 w-1/6 p-4 bg-gradient-to-r from-indigo-700 to-sky-700 rounded-lg shadow-lg flex items-center justify-center space-x-2 cursor-pointer">
        <img
          src={logo}
          alt={OS + " logo"}
          style={{ width: "80px", marginRight: "10px", alignSelf: "center" , backgroundColor: "white"}}
        />
        <div className="text-white">
          <p className="text-center">Vendor: {vendor}</p>
          <p className="text-center">OS: {OS}</p>
        </div>
        <div className="text-white text-2xl">{">"}</div>
      </div>
    </CSSTransition>
  );
};

export default IpMacPairCard;
