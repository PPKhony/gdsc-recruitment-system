import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Alert, Button, Card, CardBody, Col, Container, Row } from "react-bootstrap";

async function SuccessPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      {/* <Process/> */}
      <Card>
        <CardBody>
          <h1>Your form has been successfully sent!</h1>
          <Alert variant="success" className="my-4">
            <h3>Thank you for submitting the form.</h3>
            <div>your applications progress will sending via email : {user?.email}</div>
            <hr/>
            <p>โปรดติดตาม email@dome โดยสม่ำเสมอ หรือ website นี้เพื่อให้ไม่พลาดข่าวสารในการคัดเลือกรอบถัดไปนะฮับ 😊</p>
            <p>น้องเหมียวขอเป็นกำลังใจให้ผู้สมัครทุกคนนะคะ 🧀😸</p>
          </Alert>
          <Button href="/home">กลับไปที่หน้าจอหลักและเช็คคำตอบ</Button>
        </CardBody>
      </Card>
    </div>
  );
}

export default SuccessPage;
