import React from 'react'
import "./navbar.css"
import NotificationIcon from "../../../assets/notification.png"
import messageIcon from "../../../assets/message-question.png"
import calendrIcon from "../../../assets/calendar-2.png"
import ProfileIcond from "../../../assets/Mask Group.png"
import ArrowDown from "../../../assets/arrow-down.png"
export default function navbar() {
    const user = JSON.parse(localStorage.getItem('user'));
  return (
  <>
    <div className='navbar_container'>
        <div className='navbar_left'>
            <input className='search' placeholder='Search for anything...'/>
        </div>
        <div className='navbar_right'>
            <div className='n_r_first'>
                <img className='n_r_first_img' src={calendrIcon}/>
                <img className='n_r_first_img' src={messageIcon}/>
                <img className='n_r_first_img' src={NotificationIcon}/>
            </div>
            <div className='n_r_second'>
                <div className='n_r_second_name'>
                    <div className='upper_name'>{user.data.name}</div>
                    <div className='lower_name'>Rajashtan, India</div>
                </div>
                <img className='n_r_second_img' src={ProfileIcond}/>
                <img className='n_r_second_img' style={{width:"2vh", height:"2vh"}} src={ArrowDown}/>
            </div>
        </div>
    </div>
  </>
  )
}
