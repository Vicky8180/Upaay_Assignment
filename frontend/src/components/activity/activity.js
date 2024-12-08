import React from "react";
import "./activity..css";
import userDummy from "../../assets/headerFilters/Ellipse 14.png";
import userDummy2 from "../../assets/headerFilters/Ellipse 15.png";


const Activity = ({ close, activities, selectedTaskId }) => {
  function getTime(date) {
    const options = { hour: "2-digit", minute: "2-digit", hour12: true };
    const time = new Date(date).toLocaleTimeString([], options);
    return time;
  }

  function getDate(date) {
    const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
    const formattedDate = new Date(date).toLocaleDateString("en-GB", options);
    return formattedDate;
  }

  function timeAgo(inputDate) {
    const now = new Date();
    const past = new Date(inputDate);
    const diffInSeconds = Math.floor((now - past) / 1000);

    const diffInHours = Math.floor(diffInSeconds / 3600);
    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
      return `${diffInDays} days ago`;
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return `${diffInMonths} months ago`;
    }

    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears} years ago`;
  }
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="activity-container">
      <div className="activity_heading">
        {" "}
        Activity Log
        <span onClick={close}>X</span>
      </div>
      <div className="category-buttons">
        <button className="category-button active">View all</button>
        <button className="category-button">Task</button>
      </div>
      {/* <h2>Today</h2>   */}
      <div className="item_box">
        {activities.map((activity) => (
          <div key={activity.id} className="activity-item">
            <img
              src={user.userId === activity.creator ? userDummy : userDummy2}
              alt={`${activity.name}`}
              className="circular-image"
            />
            <div className="activity-details">
              <h3>
                {user.userId === activity.creator ? "" : "Re: "}
                {activity.action}
              </h3>
              <p>
                <strong>
                  {`By: `}
                  {user.userId === activity.creator ? "You" : activity.name}
                </strong>{" "}
                {timeAgo(activity.timestamp)}
              </p>
              <p>{activity.details}</p>
              <div className="date_and_time">
                <div className="time">{getTime(activity.timestamp)}</div>
                <div className="date">{getDate(activity.timestamp)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activity;
