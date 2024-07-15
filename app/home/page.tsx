import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { Col, Row } from "react-bootstrap";
import { createClient } from "@/utils/supabase/server";
import applicationInput from "./ApplicationInput.json";
import applicaitonSelect from "./ApplicationSelect.json";
function MemberRegister() {
  const submitApplication = async (formData: FormData) => {
    "use server";
    const rawFormData = {
      thainame: formData.get("ThaiName"),
      englishname: formData.get("EnglishName"),
      nickname: formData.get("Nickname"),
      department: formData.get("Department"),
      studentid: formData.get("StudentID"),
      personalemail: formData.get("PersonalEmail"),
      universityemail: formData.get("UniversityEmail"),
      phonenumber: formData.get("PhoneNumber"),
      github: formData.get("GitHub"),
      linkedin: formData.get("LinkedIn"),
      googledeveloper: formData.get("GoogleDeveloper"),
      year: formData.get("year"),
      faculty: formData.get("faculty"),
      gender: formData.get("gender"),
    };
    console.log(rawFormData);
    
    const supabase = createClient();
    const {error } = await supabase
      .from("applicants")
      .insert(rawFormData)
      .select();
    console.log(error);

    if (!error) redirect("/home/success");
  };
  function RenderStaticInput(
    startIndex = 0,
    stopIndex = applicationInput.length
  ) {
    const renderFields = applicationInput
      .slice(startIndex, stopIndex)
      .map((data, index) => {
        return (
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
                
              />
              <div className="form-text">{data.description}</div>
            </div>
          </Col>
        );
      });
    return renderFields;
  }

  function RenderStaticSelect(
    startIndex = 0,
    stopIndex = applicaitonSelect.length
  ) {
    const renderFields = applicaitonSelect
      .slice(startIndex, stopIndex)
      .map((data, index) => {
        return (
          <Col key={index} className="mb-3">
            <div>
              <label htmlFor={data.field} className="form-label">
                {data.label}
              </label>
              <select
                className="form-select"
                id={data.field}
                name={data.field}
                aria-describedby={data.field}
                required
              >
                {data.options.map((option, optionIndex) => (
                  <option key={optionIndex} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <div className="form-text">{data.description}</div>
            </div>
          </Col>
        );
      });
    return renderFields;
  }

  return (
    <div>
      <form>
        <h2 style={{ marginBottom: "1.3rem", marginTop: "1.3rem" }}>
          ส่วนที่ 1 ข้อมูลเกี่ยวกับผู้สมัคร
        </h2>
        <Row md={1} xl={2}>
          <Col xl={2} className="mb-2">
            <h4>ข้อมูลทั่วไป</h4>
          </Col>
          <Col xl={10}>
            <Row xs={1} xss={1} md={2} lg={3} xl={3}>
              {RenderStaticInput(0, 3)}
              {RenderStaticSelect()}
              {RenderStaticInput(3, 8)}
            </Row>
          </Col>
        </Row>
        <hr />
        <Row md={1} xl={2}>
          <Col xl={2} className="mb-2">
            <h4>ช่องทาง social media</h4>
          </Col>
          <Col xl={10}>{RenderStaticInput(8, 11)}</Col>
        </Row>
        <button
          type="submit"
          className="btn btn-primary"
          formAction={submitApplication}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default MemberRegister;
