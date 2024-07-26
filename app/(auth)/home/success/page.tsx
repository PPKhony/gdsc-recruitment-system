import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Alert, Card, CardBody, Col, Container, Row } from "react-bootstrap";

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
          <Alert variant="success">Thank you for submitting the form.</Alert>
          
        </CardBody>
      </Card>
    </div>
  );
}

export default SuccessPage;
