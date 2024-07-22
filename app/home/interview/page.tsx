import GDSCCalendar from "@/components/GDSCInterview";
import Process from "@/components/Process";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Alert, Col, Container, Row } from "react-bootstrap";

async function AuthorizePage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <h1 className="my-3">Interview Scheduling</h1>
      <Row xs={1} lg={2}>
        <Col lg={4} className="px-3">
          <Alert className="my-3">
            หากผู้สมัครไม่เลือกวันและเวลาที่สัมภาษณ์ภายในกรอบเวลาที่กำหนดถือว่าสละสิทธิ์
          </Alert>
          <Alert className="my-3">ระยะเวลาสัมภาษณ์ 14/7/2567 - 16/7/2567</Alert>
        </Col>
        <Col
          lg={8}
          className="d-flex align-items-center"
          style={{ minHeight: "75vh" }}
        >
          <GDSCCalendar data={user} />
        </Col>
      </Row>
    </div>
  );
}

export default AuthorizePage;
