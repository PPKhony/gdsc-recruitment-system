"use client";
// pages/interview.js
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import formConfig from "./formConfig.json";
import { Col, Row, Card, Alert, Spinner, Button, Modal } from "react-bootstrap";

const InterviewForm = () => {
  const [formData, setFormData] = useState({});
  const [status, setStatus] = useState("idle"); // 'idle', 'saving', 'saved', 'error'
  const [errors, setErrors] = useState({});
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const supabase = createClient();

  // Get the current section from the config
  const currentSection = formConfig.sections[currentSectionIndex];

  useEffect(() => {
    // Load saved form data from localStorage on component mount
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Function to validate individual form fields
  const validateField = (name, value, validation) => {
    let errorMsg = "";
    if (validation.required && !value) {
      errorMsg = "This field is required";
    } else if (
      validation.pattern &&
      !new RegExp(validation.pattern).test(value)
    ) {
      errorMsg = validation.errorMessage;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
    return errorMsg === "";
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldConfig = currentSection.fields.find(
      (field) => field.name === name
    );

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

      // Validate the field after updating the form data
      validateField(name, newFormData[name], fieldConfig.validation);
      // Save form data to localStorage to persist across sessions
      localStorage.setItem("formData", JSON.stringify(newFormData));
      return newFormData;
    });
  };

  // Validate all fields in the current section
  const validateSection = () => {
    let valid = true;
    currentSection.fields.forEach((field) => {
      if (!validateField(field.name, formData[field.name], field.validation)) {
        valid = false;
      }
    });
    return valid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("saving");

    // Get the current authenticated user from Supabase
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      // Redirect or display an error message if the user is not logged in
      alert("You must be signed in to submit your interview answers");
      setStatus("idle");
      return;
    }

    // Validate all sections before submitting
    let valid = true;
    formConfig.sections.forEach((section) => {
      section.fields.forEach((field) => {
        if (
          !validateField(field.name, formData[field.name], field.validation)
        ) {
          valid = false;
        }
      });
    });

    if (!valid) {
      setStatus("error");
      return;
    }

    // Prepare the payload for the database
    const payload = {
      ...formData,
      user_id: user.id,
      user_email: user.email,
    };

    // Insert data into Supabase table
    const { error } = await supabase
      .from("interview_prescreen")
      .insert([payload]);
    if (error) {
      console.error(error);
      setStatus("error");
    } else {
      setStatus("saved");
      // Clear local storage after successful submission
      localStorage.removeItem("formData");
    }
  };

  // Function to clear all form fields and local storage

  const [showClearConfirmation, setShowClearConfirmation] = useState(false);

  const clearFormData = () => {
    setShowClearConfirmation(true);
  };
  
  const handleConfirmClearData = () => {
    setFormData({});
    setErrors({});
    localStorage.removeItem("formData");
    window.location.reload();
    setShowClearConfirmation(false); // Close the modal
  };

  // Handle navigation between sections
  const handleNext = () => {
    if (validateSection()) {
      setCurrentSectionIndex((prev) => prev + 1);
    } else {
      setStatus("error");
    }
  };

  const handlePrevious = () => {
    setCurrentSectionIndex((prev) => prev - 1);
  };

  return (
    <div className="container fluid">
      <Modal
        show={showClearConfirmation}
        onHide={() => setShowClearConfirmation(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Clear Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to clear the form? All progress will be lost.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowClearConfirmation(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmClearData}>
            Clear Form
          </Button>
        </Modal.Footer>
      </Modal>
      <Row
        xs={1}
        md={1}
        lg={2}
        xl={2}
        className="d-flex justify-content-center"
      >
        <Col lg={4} xl={4}>
          <h1>{formConfig.title}</h1>
          <h5 style={{ fontWeight: "bold" }}>description</h5>
          <p>{formConfig.description}</p>
          <h5 style={{ fontWeight: "bold" }}>instructions</h5>
          <p>{formConfig.instructions}</p>
          <p>* Please fill in all the required fields.</p>
          <h5 style={{ fontWeight: "bold" }}>Please note:</h5>
          <li>
            <b>
              Your progress on this form has been automatically saved to your
              device.
            </b>
          </li>
          <li>
            <b>
              When you submit the form, your responses will be associated with
              the email address you used to log in.
            </b>
          </li>
          <hr />
          <Button variant="outline-danger" onClick={clearFormData}>
            Clear form fill
          </Button>
        </Col>
        <Col className="p-2" lg={8} xl={8}>
          <form onSubmit={handleSubmit}>
            {/* Render current form section */}
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>{currentSection.title}</Card.Title>
                {/* Render form fields within the current section */}
                {currentSection.fields.map((field) => (
                  <div key={field.name} className="mb-3">
                    <label className="form-label" htmlFor={field.name}>
                      {field.label}{" "}
                      {field.validation.required && (
                        <span style={{ color: "red" }}>*</span>
                      )}
                    </label>
                    {/* Conditionally render different input types */}
                    {field.type === "text" && (
                      <input
                        type="text"
                        id={field.name}
                        name={field.name}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                        className="form-control"
                      />
                    )}
                    {field.type === "email" && (
                      <input
                        type="email"
                        id={field.name}
                        name={field.name}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                        className="form-control"
                      />
                    )}
                    {field.type === "select" && (
                      <select
                        id={field.name}
                        name={field.name}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                        className="form-select"
                      >
                        <option value="">Select...</option>
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
                            id={`${field.name}-${option}`}
                            name={field.name}
                            value={option}
                            checked={formData[field.name] === option}
                            onChange={handleChange}
                            className="form-check-input"
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`${field.name}-${option}`}
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                    {field.type === "checkbox" &&
                      field.options.map((option) => (
                        <div key={option} className="form-check">
                          <input
                            type="checkbox"
                            id={`${field.name}-${option}`}
                            name={field.name}
                            value={option}
                            checked={(formData[field.name] || []).includes(
                              option
                            )}
                            onChange={handleChange}
                            className="form-check-input"
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`${field.name}-${option}`}
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                    {field.type === "textarea" && (
                      <textarea
                        id={field.name}
                        name={field.name}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                        className="form-control"
                      />
                    )}
                    {/* Display validation error message */}
                    {errors[field.name] && (
                      <div
                        className="text-danger mt-1"
                        style={{ marginTop: "4px" }}
                      >
                        {errors[field.name]}
                      </div>
                    )}
                  </div>
                ))}
              </Card.Body>
            </Card>

            {/* Navigation buttons */}
            <div className="d-flex justify-content-between">
              {currentSectionIndex > 0 && (
                <Button variant="secondary" onClick={handlePrevious}>
                  Previous
                </Button>
              )}
              {currentSectionIndex < formConfig.sections.length - 1 ? (
                <Button variant="primary" type="button" onClick={handleNext}>
                  Next
                </Button>
              ) : null}
              {currentSectionIndex == formConfig.sections.length - 1 ? (
                <Button variant="success" type="submit">
                  Submit
                </Button>
              ) : null}
            </div>

            {status === "saving" && (
              <div className="mt-3">
                <Spinner animation="border" />
                <span>Saving...</span>
              </div>
            )}
            {status === "error" && (
              <Alert className="mt-3" variant="danger">
                Uh oh, we could not continue your form. Please make sure all
                information is correct and try again. If the problem persists,
                please contact us.
              </Alert>
            )}
            {status === "saved" && (
              <Alert className="mt-3" variant="success">
                Form saved successfully!
              </Alert>
            )}
          </form>
        </Col>
      </Row>
    </div>
  );
};

export default InterviewForm;
