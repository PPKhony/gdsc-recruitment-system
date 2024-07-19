"use client";
// pages/interview.js
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import formConfig from "./formConfig.json";
import { Col, Row } from "react-bootstrap";

const InterviewForm = () => {
  const [formData, setFormData] = useState({});
  const [status, setStatus] = useState("");
  const supabase = createClient();

  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      let newFormData = { ...prev };

      if (type === "checkbox") {
        newFormData[name] = newFormData[name] || [];
        if (checked) {
          newFormData[name].push(value);
        } else {
          newFormData[name] = newFormData[name].filter((v) => v !== value);
        }
      } else {
        newFormData[name] = value;
      }

      localStorage.setItem("formData", JSON.stringify(newFormData));
      return newFormData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("saving");

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      alert("You must be signed in to submit your interview answers");
      return;
    }

    const payload = {
      ...formData,
      user_id: user.id,
      user_email: user.email,
    };

    const { error } = await supabase
      .from("interview_prescreen")
      .insert([payload]);
    if (error) {
      console.error(error);
      setStatus("error");
    } else {
      setStatus("saved");
      localStorage.removeItem("formData");
    }
  };

  return (
    <div className="container">
      <Row xs={1} md={2} lg={2}>
        <Col xl={4}>
          <h1>{formConfig.title}</h1>
          <p>{formConfig.description}</p>
          <p>{formConfig.instructions}</p>
        </Col>
        <Col className="p-2">
          <form onSubmit={handleSubmit}>
            {formConfig.sections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h2>{section.title}</h2>
                {section.fields.map((field) => (
                  <div key={field.name} className="mb-3">
                    <label className="form-label">{field.label}</label>
                    {field.type === "text" && (
                      <input
                        type="text"
                        name={field.name}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                        className="form-control"
                      />
                    )}
                    {field.type === "email" && (
                      <input
                        type="email"
                        name={field.name}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                        className="form-control"
                      />
                    )}
                    {field.type === "select" && (
                      <select
                        name={field.name}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                        className="form-select"
                      >
                        {field.options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    )}
                    {field.type === "radio" &&
                      field.options.map((option) => (
                        <div key={option} className="form-check">
                          <input
                            type="radio"
                            name={field.name}
                            value={option}
                            checked={formData[field.name] === option}
                            onChange={handleChange}
                            className="form-check-input"
                          />
                          <label className="form-check-label">{option}</label>
                        </div>
                      ))}
                    {field.type === "checkbox" &&
                      field.options.map((option) => (
                        <div key={option} className="form-check">
                          <input
                            type="checkbox"
                            name={field.name}
                            value={option}
                            checked={(formData[field.name] || []).includes(
                              option
                            )}
                            onChange={handleChange}
                            className="form-check-input"
                          />
                          <label className="form-check-label">{option}</label>
                        </div>
                      ))}
                    {field.type === "textarea" && (
                      <textarea
                        name={field.name}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                        className="form-control"
                      />
                    )}
                  </div>
                ))}
              </div>
            ))}
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            {status && <p>{status}</p>}
          </form>
        </Col>
      </Row>
    </div>
  );
};

export default InterviewForm;
