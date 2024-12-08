import React, { useEffect, useState } from "react";
import "./globalPages.css";
import logo from "../assets/colorfilter.png";
import leftIcon from "../assets/arrow-left.png";
import UpperPart from "../components/leftPanel/upperPart";
import MiddlePart from "../components/leftPanel/middlePart";
import BottomPart from "../components/leftPanel/bottomPart";
import Navbar from "../components/rightPanel/navbar/navbar";
import PanelBody from "../components/rightPanel/panelBody/panelBodyContainer";
import { useNavigate } from "react-router-dom";
export default function Dashboard() {
  const [collapseLeftPanel, setCollapseLeftPanel] = useState(false);

  const collapseHandle = () => {
    setCollapseLeftPanel(!collapseLeftPanel);
  };

  return (
    <div className="dashboard-container">
      <div
        className={`dashboard-left-panel ${
          collapseLeftPanel ? "collapsed" : ""
        }`}
      >
        <div className="left-panel-top">
          <div className="top-logo">
            <img src={logo} alt="Project Logo" className="logo-image" />
            {!collapseLeftPanel && <div className="items-name">Project M.</div>}
          </div>
          <button className="collapse-btn" onClick={collapseHandle}>
            {collapseLeftPanel ? ">>" : "<<"}
          </button>
        </div>
        <div className="left-panel-bottom">
          {/* Add menu or other items here */}
          <UpperPart collapse={collapseLeftPanel} />
          <MiddlePart collapse={collapseLeftPanel} />
          {!collapseLeftPanel && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "6vh",
              }}
            >
              <BottomPart />
            </div>
          )}
        </div>
      </div>

      <div
        className="dashboard-right-panel"
        style={{ width: collapseLeftPanel ? "94vw" : "" }}
      >
        <Navbar />
        <PanelBody />
      </div>
    </div>
  );
}
