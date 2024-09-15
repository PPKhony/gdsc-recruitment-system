import { Col, Row } from "react-bootstrap";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Row xs={1} lg={2} className="d-flex align-items-center" style={{ height: "100svh" }}>
        <Col>
          <img src="/images/maintain-1.gif" width={"100%"} style={{objectFit: "cover"}}  alt="Maintenance" />
        </Col>
        <Col>
          <h1>GDSC Recruiting Website is being maintaince</h1>
          <p>Sorry for the inconvenience.</p>
        </Col>
      </Row>
    </main>
  );
}
