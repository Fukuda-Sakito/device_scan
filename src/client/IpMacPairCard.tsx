interface IpMacPairCardProps {
    ip: string;
    mac: string;
}

const IpMacPairCard: React.FC<IpMacPairCardProps> = ({ ip, mac }) => {
    return (
        <div className="m-2 w-1/6 p-4 bg-gradient-to-r from-indigo-700 to-sky-700 rounded-lg shadow-lg flex flex-col items-center justify-center space-y-2">
            <p className="text-white text-center">{ip}</p>
            <p className="text-white text-center">{mac}</p>
        </div>
    );
};

export default IpMacPairCard;