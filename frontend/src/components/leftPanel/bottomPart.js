import React from 'react';
import './globalLeftPanel.css';
import LampIcon from "../../assets/lamp-on.png"
export default function BottomPart() {
  return (
    <>
      <div className="bottom-part-container">
        <div className="bottom-top">
          <img alt="light_img" src={LampIcon} className="bottom-top-img" />
        </div>

        <div className="bottom-down">
          <div className="bottom-part-heading">Thoughts time</div>
          <div className="bottom-part-para">
            We don’t have any notice for you, till then you can share your thoughts with your peers.
          </div>
          <div className="write-message">Write Message</div>
        </div>
      </div>
    </>
  );
}
