

import React, { useState } from 'react';
import './globalLeftPanel.css';
import AddIcon from "../../assets/headerFilters/add-square.png"

export default function MiddlePart({ collapse }) {
  const [items, setItems] = useState([
    { color: 'rgba(122, 197, 85, 1)', name: 'Mobile App' },
    { color: 'rgba(255, 165, 0, 1)', name: 'Website Redesign' },
    { color: 'rgba(228, 204, 253, 1)', name: 'Design System' },
    { color: 'rgba(118, 165, 234, 1)', name: 'Wireframes' },
  ]);

  return (
    <div className="middle-part-container">
      <div className="middle-heading" style={{justifyContent:collapse?"center":""}}>
      {!collapse&& "My Projects"}
         <button className="middle-add-btn">
          <img alt="add_btn" style={{width:"2.5vh"}} src={AddIcon}/>
         </button>
      </div>
      {items.map((item, index) => (
        <div className={`middle-item ${collapse ? 'collapsed' : ''}`} key={index}>
          <div
            className="middle-item-circular-dot"
            style={{ backgroundColor: item.color }}
          ></div>
          {!collapse && <div className="middle-item-name">{item.name}</div>}
        </div>
      ))}
    </div>
  );
}

