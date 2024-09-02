import { Alert, Button } from "react-bootstrap";

function SuccessPage() {
  return (<div>
    <Alert variant="success">
      <h2>ระบบได้บันทึกวันและเวลาสัมภาษณ์เรียบร้อยแล้ว 🎆</h2>
      <hr/>
      <p>ไม่ต้องซีเรียสนะคะ เราเชื่อว่าทุกคนสามารถทำได้ขอแค่เต็มที่ก็พอ แล้วเจอกันวันสัมภาษณ์ค่ะ 🥳😸 </p>
      <Button href="/home">กลับไปที่หน้าหลักและตรวจสอบการจองเวลาสัมภาษณ์</Button>
    </Alert>
  </div>);
}

export default SuccessPage;