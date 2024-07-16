"use client";
import { Col, Row } from "react-bootstrap";
import applicationSelect from "./ApplicationSelect.json";
import applicationInput from "./ApplicationInput.json";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import Select from "react-select";

function ApplicationMember() {
  const [prevData, setPrevData] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaveTime, setLastSaveTime] = useState(null);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();
        if (error) throw error;
        await getPrevData(user);
      } catch (error) {
        console.error("Error getting user:", error.message);
      }
    };

    getUser();
  }, [supabase]);

  const getPrevData = async (userLogin) => {
    try {
      const { data, error } = await supabase
        .from("applicants")
        .select()
        .eq("user_id", userLogin?.id);
      if (error) throw error;

      setPrevData({
        ...data[0],
        user_id: userLogin?.id,
        universityemail: userLogin?.email,
      });
    } catch (error) {
      console.error("Error getting previous data:", error.message);
    }
  };

  const debouncedEventHandler = useMemo(
    () =>
      debounce((event) => {
        const { name, value } = event.target;
        setPrevData((prevData) => {
          const updatedData = { ...prevData, [name.toLowerCase()]: value };
          saveProgressInside(updatedData);
          return updatedData;
        });
      }, 5000),
    [prevData]
  );

  const saveProgressInside = async (data) => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("applicants")
        .upsert(data, { onConflict: ["user_id"] });

      if (error) {
        console.error("Error saving progress:", error.message);
      } else {
        setLastSaveTime(new Date().toLocaleString());
      }
    } catch (error) {
      console.error("Error saving progress:", error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const RenderStaticInput = (
    startIndex = 0,
    stopIndex = applicationInput.length
  ) => {
    return applicationInput.slice(startIndex, stopIndex).map((data, index) => (
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
            defaultValue={prevData[data.field.toLowerCase()] || ""}
            onChange={debouncedEventHandler}
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
      <Col key={index} className="mb-3">
        <div>
          <label htmlFor={data.field} className="form-label">
            {data.label}
          </label>
          <Select
            className="form-select"
            id={data.field}
            name={data.field}
            aria-describedby={data.field}
            defaultValue={prevData[data.field.toLowerCase()]}
            onChange={debouncedEventHandler}
            required
          >
            <option value="">
              Select an option
            </option>
            {data.options.map((option, optionIndex) => (
              <option key={optionIndex} value={option}>
                {option}
              </option>
            ))}
          </Select>
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
        body: JSON.stringify(prevData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();

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
          <div>
            {isSaving
              ? "Saving..."
              : `Last saved at: ${lastSaveTime || "Not yet saved"}`}
          </div>
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
