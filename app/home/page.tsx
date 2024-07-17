"use client";
import { Col, Row } from "react-bootstrap";
import applicationSelect from "./ApplicationSelect.json";
import applicationInput from "./ApplicationInput.json";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useMemo, useState, ChangeEvent, FormEvent } from "react";
import { debounce } from "lodash";
import { v4 as uuidv4 } from 'uuid';

interface User {
  id: string;
  email: string;
  user_metadata: {
    full_name: string;
  };
}

interface ApplicantData {
  user_id?: string;
  universityemail?: string;
  [key: string]: any;
}

const ApplicationMember: React.FC = () => {
  const [prevData, setPrevData] = useState<ApplicantData>({});
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveError, setSaveError] = useState<boolean>(false);
  const [lastSaveTime, setLastSaveTime] = useState<string | null>(null);
  const [isLoadingPrevData, setIsLoadingPrevData] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const supabase: any = createClient();

  useEffect(() => {
    const getUser = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();
        if (error) throw error;
        await getPrevData(user);
      } catch (error: any) {
        console.error("Error getting user:", error.message);
      } finally {
        setIsLoadingPrevData(false);
      }
    };

    getUser();
  }, [supabase]);

  const getPrevData = async (userLogin: User | null) => {
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
    } catch (error: any) {
      console.error("Error getting previous data:", error.message);
    }
  };

  const debouncedSave = useMemo(
    () =>
      debounce(async (updatedData: ApplicantData) => {
        setSaveError(false);
        try {
          const { error } = await supabase
            .from("applicants")
            .upsert(updatedData, { onConflict: ["user_id"] });

          if (error) {
            setSaveError(true);
            console.error("Error saving progress:", error.message);
          } else {
            setLastSaveTime(new Date().toLocaleString());
          }
        } catch (error: any) {
          setSaveError(true);
          console.error("Error saving progress:", error.message);
        } finally {
          setIsSaving(false);
        }
      }, 1500),
    [supabase]
  );

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    const updatedData = { ...prevData, [name.toLowerCase()]: value };
    setPrevData(updatedData);
    setIsSaving(true);
    debouncedSave(updatedData);
  };

  const RenderStaticInput = (
    startIndex: number = 0,
    stopIndex: number = applicationInput.length
  ) => {
    return applicationInput.slice(startIndex, stopIndex).map((data, index) => (
      <Col key={uuidv4()} className="mb-3">
        <div>
          <label htmlFor={data.field} className="form-label">
            {data.label}
          </label>
          <input
            type={data.type}
            className={`form-control ${isLoadingPrevData ? "placeholder" : ""}`}
            id={data.field}
            name={data.field}
            aria-describedby={data.field}
            defaultValue={
              isLoadingPrevData ? "" : prevData[data.field.toLowerCase()] || ""
            }
            onChange={handleChange}
            required
            disabled={isLoadingPrevData}
          />
          <div className="form-text">{data.description}</div>
        </div>
      </Col>
    ));
  };

  const RenderStaticSelect = (
    startIndex: number = 0,
    stopIndex: number = applicationSelect.length
  ) => {
    return applicationSelect.slice(startIndex, stopIndex).map((data, index) => (
      <Col key={uuidv4()} className="mb-3">
        <div>
          <label htmlFor={data.field} className="form-label">
            {data.label}
          </label>
          <select
            className={`form-select ${isLoadingPrevData ? "placeholder" : ""}`}
            id={data.field}
            name={data.field}
            aria-describedby={data.field}
            defaultValue={
              isLoadingPrevData ? "" : prevData[data.field.toLowerCase()]
            }
            onChange={handleChange}
            required
            disabled={isLoadingPrevData}
          >
            <option value="">Select an option</option>
            {data.options.map((option: string, optionIndex: number) => (
              <option key={optionIndex} value={option}>
                {option}
              </option>
            ))}
          </select>
          <div className="form-text">{data.description}</div>
        </div>
      </Col>
    ));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
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
    } catch (error: any) {
      console.error("Error submitting form:", error.message);
    } finally {
      setIsSubmitting(false);
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
            {isSaving ? (
              <i className="bi bi-cloud-upload"> Saving...</i>
            ) : saveError ? (
              <i className="bi bi-cloud-slash"> Error saving</i>
            ) : (
              <i className="bi bi-cloud-check">
                {lastSaveTime
                  ? ` Draft saved at: ${lastSaveTime}`
                  : " Draft save latest"}
              </i>
            )}
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
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "1rem",
          }}
        >
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  aria-hidden="true"
                ></span>
                <span role="status"> Loading...</span>
              </>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplicationMember;
