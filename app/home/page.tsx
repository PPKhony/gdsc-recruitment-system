import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { Col, Row } from "react-bootstrap";
import { createClient } from "@/utils/supabase/server";

function MemberRegister() {
  const submitApplication = async (formData: FormData) => {
    "use server";
    const rawFormData = {
      email: formData.get("email"),
      name: formData.get("name"),
    };

    const supabase = createClient();
    const { data, error } = await supabase
      .from("application")
      .insert(rawFormData)
      .select();
    console.log(data);
    console.log(error);

    if(!error) redirect("/home/success");
  };
  return (
    <>
      <h2 style={{ marginBottom: "2rem", marginTop: "2rem" }}>
        ส่วนที่ 1 ข้อมูลเกี่ยวกับผู้สมัคร
      </h2>
      <hr />
      <form>
        <Row>
          <Col>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text">
                We wll never share your email with anyone else.
              </div>
            </div>
          </Col>
          <Col>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Password
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Check me out
              </label>
            </div>
          </Col>
        </Row>
        <button
          type="submit"
          className="btn btn-primary"
          formAction={submitApplication}
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default MemberRegister;
