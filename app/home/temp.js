"use client";
import { Col, Row } from "react-bootstrap";
import applicationSelect from "./ApplicationSelect.json";
import applicationInput from "./ApplicationInput.json";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState, useCallback } from "react";
import { debounce } from "lodash";
import { v4 as uuidv4 } from "uuid";

function ApplicationMember() {
  const supabase = createClient();
  const [formData, setFormData] = useState({
    thainame: ""
  });
  const [userLogin , setUser] = useState({})

  useEffect(() => {
    const getUser = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();
        if (error) throw error;
      } catch (error) {
        console.error("Error getting user:", error.message);
      }
    };
    getUser();
  }, [supabase]);

  useEffect(() => {
    // Save data to localStorage whenever formData changes
    const handleSave = () => {
      localStorage.setItem('autoSaveFormData', JSON.stringify(formData));
    };

    const debounceSave = setTimeout(handleSave, 1000);

    return () => clearTimeout(debounceSave);
  }, [formData]);
  

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

  const RenderStaticInput = (
    startIndex = 0,
    stopIndex = applicationInput.length
  ) => {
    return applicationInput.slice(startIndex, stopIndex).map((data, index) => (
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

  const RenderStaticSelect = (
    startIndex = 0,
    stopIndex = applicationSelect.length
  ) => {
    return applicationSelect.slice(startIndex, stopIndex).map((data, index) => (
      <Col key={uuidv4()} className="mb-3">
        <div>
          <label htmlFor={data.field} className="form-label">
            {data.label}
          </label>
          <select
            className="form-select"
            id={data.field}
            name={data.field}
            aria-describedby={data.field}
            value={formData[data.field.toLowerCase()]}
            onChange={handleChange}
            required
          >
            <option value="">Select an option</option>
            {data.options.map((option, optionIndex) => (
              <option key={uuidv4()} value={option}>
                {option}
              </option>
            ))}
          </select>
          <div className="form-text">{data.description}</div>
        </div>
      </Col>
    ));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/submit-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();

      localStorage.removeItem("autoSaveFormData");
      console.log("Submission successful:", result);
      if (result.redirectUrl) {
        window.location.href = result.redirectUrl;
      }
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            marginBottom: "1.3rem",
            marginTop: "1.3rem",
          }}
        >
          <h2>ส่วนที่ 1 ข้อมูลเกี่ยวกับผู้สมัคร</h2>
          <div></div>
        </div>
        <Row md={1} xl={2}>
          <Col xl={2} className="mb-2">
            <h4>ข้อมูลทั่วไป</h4>
          </Col>
          <Col xl={10}>
            <Row xs={1} md={2} lg={3} xl={3}>
              {RenderStaticInput(0, 3)}
              {RenderStaticSelect(0, applicationSelect.length)}
              {RenderStaticInput(3, 7)}
            </Row>
          </Col>
        </Row>
        <hr />
        <Row md={1} xl={2}>
          <Col xl={2} className="mb-2">
            <h4>ช่องทาง social media</h4>
          </Col>
          <Col xl={10}>{RenderStaticInput(7, 10)}</Col>
        </Row>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ApplicationMember;
