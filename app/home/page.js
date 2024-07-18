"use client";
import React, { useState, useEffect, useCallback } from "react";
import _, { create } from "lodash";
import inputFields from "./ApplicationInput.json";
import selectFields from "./ApplicationSelect.json";
import { createClient } from "@/utils/supabase/client";

const AutosaveForm = () => {
  const supabase = createClient();
  let initialFormData;
  if (!localStorage.getItem("formData")) {
    initialFormData = inputFields.reduce((acc, curr) => {
      acc[curr.field] = "";
      return acc;
    }, {});
  } else {
    initialFormData = JSON.parse(localStorage.getItem("formData"));
  }

  selectFields.forEach((select) => {
    initialFormData[select.field] = "";
  });

  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState("Form is not saved yet.");

  const getUser = async () => {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) throw error;
      return user;
    } catch (error) {
      console.error("Error getting user:", error.message);
      return null;
    }
  };

  const fetchInitialData = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("applicants")
        .select("*")
        .eq("user_id", userId)
        .single();
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error fetching initial data:", error.message);
      return null;
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      const user = await getUser();
      if (user) {
        const savedFormData = localStorage.getItem("formData");
        if (savedFormData) {
          setFormData(JSON.parse(savedFormData));
        } else {
          const initialData = await fetchInitialData(user.id);
          if (initialData) {
            setFormData(initialData);
          }
        }
      }
    };
    loadInitialData();
  }, []);

  // Save form data to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Debounced API call
  const debouncedSave = useCallback(
    _.debounce(async (data) => {
      try {
        const user = await getUser();
        if (user) {
          const { error } = await supabase
            .from("applicants")
            .upsert({
              ...data,
              user_id: user.id,
              universityemail: user.email,
              issubmit: false,
            });
          if (error) throw error;
          setStatus("Draft save success.");
          console.log("save online success", formData);
        }
      } catch (error) {
        console.error("Error saving data:", error.message);
        setStatus("Error saving draft.");
      }
    }, 4000),
    []
  );

  useEffect(() => {
    debouncedSave(formData);
  }, [formData, debouncedSave]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await getUser();
      if (user) {
        const { error } = await supabase
          .from("applicants")
          .upsert({
            ...formData,
            user_id: user.id,
            universityemail: user.email,
            issubmit: true,
          });
        if (error) throw error;
        setStatus("Form submitted successfully.");
        // Clear localStorage upon successful form submission if needed
        // localStorage.removeItem('formData');
      }
    } catch (error) {
      console.error("Error submitting form:", error.message);
      setStatus("Error submitting form.");
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow">
        <h3 className="text-center mb-4">{status}</h3>
        {inputFields.map((input) => (
          <div key={input.field} className="mb-3">
            <label className="form-label">{input.label}</label>
            <input
              type={input.type}
              name={input.field}
              className="form-control"
              value={formData[input.field]}
              onChange={handleChange}
              required // Add required attribute if needed
            />
            <small className="form-text text-muted">{input.description}</small>
          </div>
        ))}
        {selectFields.map((select) => (
          <div key={select.field} className="mb-3">
            <label className="form-label">{select.label}</label>
            <select
              name={select.field}
              className="form-select"
              value={formData[select.field]}
              onChange={handleChange}
              required // Add required attribute if needed
            >
              <option value="">-- Select --</option>
              {select.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <small className="form-text text-muted">{select.description}</small>
          </div>
        ))}
        <button type="submit" className="btn btn-primary w-100 mt-3">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AutosaveForm;
