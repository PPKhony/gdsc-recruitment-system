"use client";
import { useState, useEffect, useCallback } from "react";
import debounce from "lodash/debounce";
import applicationSelect from "./ApplicationSelect.json";
import applicationInput from "./ApplicationInput.json";
import { Col } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

const AutoSaveForm = () => {
  const [formData, setFormData] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
  });

  useEffect(() => {
    // Load saved data from localStorage
    const savedData = localStorage.getItem("autoSaveFormData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Define the save function and debounce it
  const saveData = useCallback(
    debounce((data) => {
      localStorage.setItem("autoSaveFormData", JSON.stringify(data));
    }, 1000), // 1000ms = 1 second debounce delay
    []
  );

  useEffect(() => {
    // Save data to localStorage whenever formData changes
    saveData(formData);
  }, [formData, saveData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your server
    console.log("Form submitted:", formData);
    // Clear localStorage after successful submit
    localStorage.removeItem("autoSaveFormData");
  };
  const ren = applicationInput.map((data, index) => (
    <Col key={index} className="mb-3">
      <div>
        <label htmlFor={data.field} className="form-label">
          {data.label}
        </label>
        <input
          type={data.type}
          className="form-control"
          id={data.field}
          name={data.field}
          aria-describedby={data.field}
          value={formData[data.field.toLowerCase()]}
          onChange={handleChange}
          required
        />
        <div className="form-text">{data.description}</div>
      </div>
    </Col>
  ));

  const applicationInput.slice(startIndex, stopIndex).map((data, index) => (
      <Col key={uuidv4()} className="mb-3">
        <div>
          <label htmlFor={data.field} className="form-label">
            {data.label}
          </label>
          <input
            type={data.type}
            className="form-control"
            id={data.field}
            name={data.field}
            aria-describedby={data.field}
            value={formData[data.field.toLowerCase()]}
            onChange={handleChange}
            required
          />
          <div className="form-text">{data.description}</div>
        </div>
      </Col>
    ));
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* {ren} */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default AutoSaveForm;
