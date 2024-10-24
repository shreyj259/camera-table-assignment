import { CameraHealth } from "./CameraHealth";

interface props {
  cloud?: string;
  device?: string;
}

const HelathStatusComponent = ({ cloud, device }: props) => {
  return (
    <div className="camera-list-item__health">
      {cloud && cloud !== "" && (
        <div className="camera-list-item__cloud-status">
          <img
            src="./assets/cloud-icon.svg"
            alt="Cloud status"
            className="camera-list-item__cloud-icon"
          />
          <CameraHealth imageUrl={cloud==="A"?"./assets/health-online.svg":"./assets/health-warning.svg"} label={cloud} />
        </div>
      )}

      {device && device !== "" && (
        <div className="camera-list-item__edge-status">
          <img
            src="./assets/storage-icon.svg"
            alt="Edge status"
            className="camera-list-item__edge-icon"
          />
          <CameraHealth imageUrl={cloud==="A"?"./assets/health-online.svg":"./assets/health-warning.svg"} label={device} />
        </div>
      )}
    </div>
  );
};

export default HelathStatusComponent;
