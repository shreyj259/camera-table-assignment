import React from 'react';
import './table.css';

interface CameraListItemProps {
  id:string|number;
  name: string;
  hasWarning:boolean;
  location: string;
  taskCount: number;
  recorderName: string;
  activeStatus:string;
  current_status:'Online'|"Offline";
  onSelect?: () => void;
  onActionClick?: () => void;
  updateActiveStatus:any;
}

export const CameraListItem: React.FC<CameraListItemProps> = ({
  id,
  name,
  hasWarning=false,
  location,
  taskCount,
  recorderName,
  activeStatus,
  current_status,
  onSelect,
  onActionClick,
  updateActiveStatus
}) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onSelect?.();
    }
  };

  const handleStatusChange=async()=>{
    const newStatus=activeStatus==="Active"?"Inactive":"Active";
    await updateActiveStatus(id,newStatus);
  }

  return (
    <article className="camera-list-item">
      <div className="camera-list-item__selection">
        <div 
          className="camera-list-item__checkbox" 
          role="checkbox" 
          tabIndex={0} 
          aria-checked="false"
          onClick={onSelect}
          onKeyDown={handleKeyDown}
        />
        <div className="camera-list-item__info">
          <div className="camera-list-item__header">
            <span 
              className={`camera-list-item__status-indicator ${current_status==="Online" ? 'camera_active' : 'camera_inactive'}`}
              aria-label={current_status==="Online" ? 'Camera active' : 'Camera inactive'}
            />
            <h3 className="camera-list-item__name">{name}</h3>
            { hasWarning && <img 
              src="./assets/warning-icon.svg" 
              alt="Camera settings" 
              className="camera-list-item__settings-icon" 
            />}
          </div>
        </div>
      </div>

      <div className="camera-list-item__health">
        <div className="camera-list-item__cloud-status">
          <img src="./assets/cloud-icon.svg" alt="Cloud status" className="camera-list-item__cloud-icon" />
        </div>
        <div className="camera-list-item__edge-status">
          <img src="./assets/storage-icon.svg" alt="Edge status" className="camera-list-item__edge-icon" />
        </div>
        
      </div>

      <div className='camera-list-item__location'>
      <p >{location}</p>
      </div>

      <div className='camera-list-item__recorder-name'>
      <p >{recorderName?recorderName:"N/A"}</p>
      </div>

      <div className='camera-list-item__task-count'>
      <p >{taskCount?taskCount+" Tasks":"N/A"}</p>
      </div>

      <div className="camera-list-item__status-badge-container">
      <span onClick={handleStatusChange} className={`camera-list-item__status-badge ${activeStatus==="Active"?"camera-list-item_active_status":"camera-list-item_inactive_status"}`} aria-label="Camera Status">
          {activeStatus}
      </span>
      </div>

      <div className="camera-list-item__details">
        <button 
          className="camera-list-item__action-button"
          onClick={onActionClick}
          aria-label="More actions"
        >
          <img src="./assets/delete-icon.svg" alt="" className="camera-list-item__action-icon" />
        </button>
      </div>

      


    </article>
  );
};