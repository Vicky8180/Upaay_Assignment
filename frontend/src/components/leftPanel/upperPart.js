import React, { useState } from 'react';
import './globalLeftPanel.css';
import category from "../../assets/category.png"
import message from "../../assets/message.png"
import profile from "../../assets/profile-2user.png"
import setting from "../../assets/setting-2.png"
import tasks from "../../assets/task-square.png"

export default function UpperPart({collapse}) {
  const [items, setItems] = useState([
    { img: category, name: 'Home' },
    { img: message, name: 'Messages' },
    { img: tasks, name: 'Tasks' },
    { img: profile, name: 'Members' },
    { img: setting, name: 'Settings' },
  ]);

  return (
    <div className="upper-part-container">
      {items.map((item, index) => (
        <div className="upper-item" style={{justifyContent:collapse?"center":""}} key={index}>
          <div className="upper-item-img">
            {item.img ? <img src={item.img} alt={item.name} style={{width:"3vh", height:"3vh"}} /> : <span>{item.name[0]}</span>}
          </div>
          {collapse===false?   <div className="upper-item-name">{item.name}</div>:""}
       
        </div>
      ))}
    </div>
  );
}
