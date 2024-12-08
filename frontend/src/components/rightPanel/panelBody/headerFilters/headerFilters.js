import React, { useState } from "react";
import "./headerFilters.css";
import edit from "../../../../assets/headerFilters/arrow-square-up.png";
import link from "../../../../assets/headerFilters/Group 626.png";
import addInvite from "../../../../assets/headerFilters/add-square.png";
import user1 from "../../../../assets/headerFilters/Ellipse 12.png";
import user2 from "../../../../assets/headerFilters/Ellipse 13.png";
import user3 from "../../../../assets/headerFilters/Ellipse 14.png";
import user4 from "../../../../assets/headerFilters/Ellipse 15.png";
import dummy1 from "../../../../assets/headerFilters/Group 614.png";
import dummy2 from "../../../../assets/headerFilters/Group 611.png";
import filter from "../../../../assets/headerFilters/filter.png";
import calender from "../../../../assets/headerFilters/calendar.png";
import arrowDown from "../../../../assets/arrow-down.png";
import { useDispatch } from "react-redux";
import { filterByPriority } from "../../../../store/slices/TasksState";

export default function HeaderFilters() {
  const [priority, setPriority] = useState("All");
  const [timePeriod, setTimePeriod] = useState("All");
  const dispatch = useDispatch();
  const handlePriorityChange = (newPriority) => {
    setPriority(newPriority);
    dispatch(filterByPriority(newPriority));
 
  };

  const handleTimePeriodChange = (newTimePeriod) => {
    setTimePeriod(newTimePeriod);
  };

  return (
    <>
      <div className="header_filter_container">
        <div className="header_container">
          <div className="header_c_left">
            <div className="header_title">Mobile App</div>
            <img src={edit} alt="edit" className="icon" />
            <img src={link} alt="link" className="icon" />
          </div>
          <div className="header_c_right">
            <div className="invite">
              <img src={addInvite} alt="invite" className="icon" /> Invite
            </div>
            <div className="list_of_users_icon">
              <img src={user1} alt="user1" className="user_icon" />
              <img src={user2} alt="user2" className="user_icon" />
              <img src={user3} alt="user3" className="user_icon" />
              <img src={user4} alt="user4" className="user_icon" />
              <img src={user1} alt="user5" className="user_icon" />
            </div>
          </div>
        </div>
        <div className="filters_containers">
          <div className="filters_c_left">
            <div className="dropdown">
              <button className="filter_button">
                <img src={filter} alt="share" className="icon" />
                Priority
                <img src={arrowDown} alt="share" className="icon" />
              </button>
              <div className="dropdown_content">
                <div onClick={() => handlePriorityChange("High")}>High</div>
                <div onClick={() => handlePriorityChange("Completed")}>
                  Completed
                </div>
                <div onClick={() => handlePriorityChange("Low")}>Low</div>
                <div onClick={() => handlePriorityChange("All")}>All</div>
              </div>
            </div>
            <div className="dropdown">
              <button className="filter_button">
                <img src={calender} alt="share" className="icon" />
                Day
                <img src={arrowDown} alt="share" className="icon" />
              </button>
              <div className="dropdown_content">
                <div onClick={() => handleTimePeriodChange("Day")}>Day</div>
                <div onClick={() => handleTimePeriodChange("Week")}>Week</div>
                <div onClick={() => handleTimePeriodChange("Month")}>Month</div>
                <div onClick={() => handleTimePeriodChange("All")}>All</div>
              </div>
            </div>
          </div>
          <div className="filters_c_right">
            <button className="share_button">
              <img src={calender} alt="share" className="icon" />
              Share
            </button>
            <img src={dummy1} alt="share" className="icon" />
            <img src={dummy2} alt="more" className="icon" />
          </div>
        </div>
      </div>
    </>
  );
}
