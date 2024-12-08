import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./services.css";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../store/slices/AssignList";

export default function AssignTo({ disableLabel, data }) {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const assignList = useSelector((state) => state.AssignList.assignList);
  const [loading, setLoading] = useState(false);
  const userId = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const fetchUserAPI = async () => {
    if (!inputValue.trim()) {
      setSuggestions([]);
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL_PORT}/api/search?searchTerm=${inputValue}`
      );
      setSuggestions(() => {
        const newData = response.data.results.filter((item) => {
          return item._id !== userId._id;
        });
        return newData;
      });
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      alert("error in fetch users");
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchUserAPI = useCallback(debounce(fetchUserAPI, 500), [
    inputValue,
  ]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (inputValue.trim()) {
      debouncedFetchUserAPI();
    }
  }, [inputValue, debouncedFetchUserAPI]);

  const addAssigneesToList = (assignee) => {
    // setAssignList((prevList) => [...prevList, assignee]);

    dispatch(addItem([assignee]));
  };

  const deleteAssigneesFromList = (assignee) => {
    // setAssignList((prevList) => prevList.filter((item) => item !== assignee));
    dispatch(removeItem([assignee]));
  };

  const getInitials = (input) => {
    const words = input.trim().split(" ");
    return words.length > 1 ? words[0][0] + words[1][0] : words[0].slice(0, 2);
  };

  return (
    <>
      <div
        className="task_c_display_assigns"
        style={{ display: assignList.length > 0 ? "flex" : "none", gap: "1vh" }}
      >
        {assignList.map((item, index) => (
          <div className="show_added_assignees" key={index}>
            <span className="s1">{item.name}</span>
            <span className="s2" onClick={() => deleteAssigneesFromList(item)}>
              X
            </span>
          </div>
        ))}
      </div>

      <div className="task_c_assign">
        {!disableLabel && (
          <label style={{ width: "15vh", marginRight: "2vh" }}>Assign to</label>
        )}
        <input
          type="text"
          className="task_c_title_input"
          placeholder="Add an assignee"
          value={inputValue}
          onChange={handleInputChange}
          required
        />

        {loading ? (
          <div>Loading...</div>
        ) : (
          suggestions.length > 0 && (
            <div
              className="suggestions-list"
              style={{
                display: inputValue === "" ? "none" : "",
                left: disableLabel ? "0.5vh" : "",
              }}
            >
              {suggestions.map((suggestion, index) => (
                <div key={index} className="suggestion-item">
                  <div className="suggestion_item_logo">
                    {getInitials(suggestion.name)}
                  </div>
                  <div className="suggestion_item_email">
                    {suggestion.email}
                  </div>
                  <button
                    className="suggestion_item_button"
                    disabled={assignList.includes(suggestion)}
                    onClick={() => addAssigneesToList(suggestion)}
                  >
                    Assign
                  </button>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </>
  );
}
