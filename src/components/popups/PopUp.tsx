import React from "react";

const Popup = (props:any) => {
  return (
    <div className="popup-box">
      <div style={{position: 'sticky', top: 'calc(50% - 270px)'}} className="box">
        <span className="close-icon" onClick={props.handleClose}>X</span>
        {props.content}
      </div>
    </div>
  );
};

export default Popup;
