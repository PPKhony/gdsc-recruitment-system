import { Col, Row } from "react-bootstrap";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Row xs={1} lg={2} style={{height: "100dvh"}}>
        <Col className="d-flex">
        Test
        </Col>
        <Col className="d-flex">
        <h1>This Website is being maintainance</h1>
        <h3>Please visit again in 18.00</h3>
        </Col>
      </Row>
    </main>
  );
}

