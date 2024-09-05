"use client";
import GDSCCalendar from "@/components/ExGDSCInterviewCal";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
} from "react-bootstrap";

function AuthorizePage({ params }) {
  const [applicationData, setApplicationData] = useState([]);
  const [showSecretCode, setShowSecretCode] = useState(false);
  const [selectedRoom, handleRoomChange] = useState("Room A");
  const NoDataFallback = () => (
    <div>
      <h1>No interview data available :( </h1>
      <Button href="/home">Go back to home page</Button>
    </div>
  );

  useEffect(() => {
    const applicationDatas = sessionStorage.getItem("applicationData");

    if (applicationDatas) {
      // Parse the data if it exists and set the state
      const parsedData = JSON.parse(applicationDatas);
      const filteredData = parsedData?.filter(
        (data) => data.object_id == params.applicationid
      );
      Array.isArray(filteredData) ? setApplicationData(filteredData) : null;
    }
  }, [params.applicationid]);

  const handleToggleSecretCode = () => {
    setShowSecretCode(!showSecretCode);
  };

  if (
    applicationData?.filter((data) => data.object_id == params.applicationid)
      .length === 0
  ) {
    return <NoDataFallback />;
  }

  return (
    <div>
      <div className="px-3">
        <h1 className="py-3 ">Interview Scheduling</h1>
        <h5>
          <b>Application ID : </b>
          {applicationData[0].applicationid}
        </h5>
        <hr />
      </div>
      <Row xs={1} lg={2}>
        <Col lg={4} className="px-3 mb-3">
          <Card>
            <CardBody>
              <h4>Instructions</h4>
              <p>Dear {applicationData[0].full_name},</p>
              <p>Select only 1 time slot in 1 room from all 5 rooms</p>
              <p>
                <strong>Important:</strong> Once your interview is scheduled,{" "}
                <u style={{ color: "red" }}>
                  rescheduling or canceling is not allowed
                </u>
                . Sorry for the inconvenience. If you have any exceptional
                circumstances that necessitate changes, please contact us via
                email at{" "}
                <a href="mailto:gdsc.thammasat@gmail.com">
                  gdsc.thammasat@gmail.com
                </a>
                .
              </p>

              <p>
                <strong>Recommendations:</strong>
              </p>
              <ul>
                <li>
                  <strong>
                    <em>Open your camera</em>
                  </strong>{" "}
                  during the interview.
                </li>
                <li>
                  Ensure you are in a <strong>quiet location</strong> that is
                  suitable for an interview.
                </li>
              </ul>

              <p>
                <strong>Pre-Interview Instructions:</strong>
              </p>
              <ul>
                <li>
                  <strong>Test your equipment</strong> ahead of time to avoid
                  any technical issues.
                </li>
                <li>
                  <strong>
                    If you schedule an appointment multiple times,{" "}
                  </strong>{" "}
                  the system will select the earliest one you scheduled.
                </li>
                <li>
                  <strong>Be on time</strong> for your interview.
                </li>
              </ul>
              <p>
                <strong>Additional Note:</strong>
                <ul>
                  <li>
                    Please be advised that your upcoming interview with us will
                    be recorded. This recording is intended solely for internal
                    purposes, including but not limited to improving our
                    interview process and maintaining standards.
                  </li>
                </ul>
              </p>
              <p>
                If you have any questions or need further assistance, please do
                not hesitate to reach out to us via the email address provided.
              </p>

              <p>Thank you for your attention to these details.</p>
              <Alert variant="info" className="my-3">
                <h5>Interview Period</h5>
                <Container
                  className="px-3 py-1 mb-2 me-3"
                  style={{
                    backgroundColor: "white",
                    borderRadius: "5px",
                  }}
                >
                  <div>
                    <small className="text-muted">Booking Period</small>
                  </div>
                  <div>
                    September 5th, 2024 (6:00 PM GMT+7) - September 8th, 2024
                    (11:59 PM GMT+7)
                  </div>
                </Container>
                <Container
                  className="px-3 py-1 mb-2 me-3"
                  style={{
                    backgroundColor: "white",
                    borderRadius: "5px",
                  }}
                >
                  <div>
                    <small className="text-muted">Interview Period Dates</small>
                  </div>
                  <div>September 9th, 2024 - September 11th, 2024</div>
                </Container>
              </Alert>
            </CardBody>
          </Card>
        </Col>
        <Col lg={8} style={{ minHeight: "75vh" }}>
          <Card className="py-4 mb-4">
            <CardBody>
              <h4>Available 5 rooms</h4>
              <strong>Select a Room Below</strong>
              <h6>
                Once you have selected a room, the available time slots for that
                room will be displayed.
              </h6>
              <br />
              <na>
                <h5 className="py-3">Please Use This info for Appointment</h5>
                <Alert variant="danger">
                  <Container
                    className="px-3 py-1 mb-2 me-3"
                    style={{
                      backgroundColor: "white",
                      borderRadius: "5px",
                    }}
                  >
                    <div>
                      <small className="text-muted">
                        Full name and Last name (You can seperate firstname and
                        lastname with yourself)
                      </small>
                    </div>
                    <div> {applicationData[0].full_name}</div>
                  </Container>
                  <Container
                    className="px-3 py-1 mb-2 me-3"
                    style={{
                      backgroundColor: "white",
                      borderRadius: "5px",
                    }}
                  >
                    <div>
                      <small className="text-muted">
                        Email (@dome is required for interview)
                      </small>
                    </div>
                    <div>{applicationData[0].user_email}</div>
                  </Container>
                </Alert>
              </na>
            </CardBody>
          </Card>
          <Container style={{ overflow: "hidden" , backgroundColor: "white" , borderRadius: "10px" , padding: "5px" }}>
            <iframe
              src="https://calendar.google.com/calendar/appointments/AcZssZ1rjLimWYn4gIu3ORkYG1haM0nmLmcwpIDAgek=?gv=true"
              style={{ border: "5px" }}
              width="100%"
              height="900"
              frameborder="0"
            ></iframe>
          </Container>
        </Col>
        <Col lg={12} className="px-3"></Col>
      </Row>
    </div>
  );
}

export default AuthorizePage;
