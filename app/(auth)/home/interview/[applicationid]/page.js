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
              <p>Select only 1 time slot of 4 rooms</p>
              <p>
                <strong>Important:</strong> Once your interview is scheduled,{" "}
                <u style={{color: "red"}}>rescheduling or canceling is not allowed</u>. Sorry for the inconvenience.  
                If you have any exceptional circumstances that necessitate changes, please
                contact us via email at{" "}
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
                  <strong>Be on time</strong> for your interview.
                </li>
              </ul>

              <p>
                If you have any questions or need further assistance, please do
                not hesitate to reach out to us via the email address provided.
              </p>

              <p>Thank you for your attention to these details.</p>
              <Alert variant="info" className="my-3">
                <h6>ระยะเวลาสัมภาษณ์</h6>
                <div>07/09/2024 - 09/09/2024</div>
                <hr />
                <h6>เวลาสัมภาษณ์</h6>
                <div>09.00-12.00 | 13.00-16.00 | 17.00-19.30</div>
                <hr />
                <h6>Session Duration</h6>
                <div>15 นาที</div>
              </Alert>
              <h5>Your Info</h5>
              <ul>
                <li>
                  <b>Name:</b> {applicationData[0].full_name}
                </li>
                <li>
                  <b>Application ID:</b> {applicationData[0].applicationid}
                </li>
                <li>
                  <b>Email:</b> {applicationData[0].user_email}
                </li>
                <li>
                  <b>Secret Code:</b>{" "}
                  {showSecretCode ? (
                    applicationData[0].object_id
                  ) : (
                    <a
                      href="#"
                      onClick={handleToggleSecretCode}
                      style={{ color: "red" }}
                    >
                      Click to show
                    </a>
                  )}
                </li>
              </ul>
            </CardBody>
          </Card>
        </Col>
        <Col lg={8} style={{ minHeight: "75vh" }}>
          <Card className="py-4 mb-4">
            <CardBody>
              <h4 className="px-3">Available 4 rooms</h4>
              <strong className="px-3">Select a Room Below</strong>
              <h6 className="px-3">
                Once you have selected a room, the available time slots for that
                room will be displayed.
              </h6>
              <br />
              <nav className="px-3">
                <ul className="pagination pagination">
                  <li
                    className={`page-item ${
                      selectedRoom === "Room A" ? "active" : ""
                    }`}
                  >
                    <a
                      className="page-link"
                      onClick={() => {
                        handleRoomChange("Room A");
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      A
                    </a>
                  </li>
                  <li
                    className={`page-item ${
                      selectedRoom === "Room B" ? "active" : ""
                    }`}
                  >
                    <a
                      className="page-link"
                      onClick={() => handleRoomChange("Room B")}
                      style={{ cursor: "pointer" }}
                    >
                      B
                    </a>
                  </li>
                  <li
                    className={`page-item ${
                      selectedRoom === "Room C" ? "active" : ""
                    }`}
                  >
                    <a
                      className="page-link"
                      onClick={() => handleRoomChange("Room C")}
                      style={{ cursor: "pointer" }}
                    >
                      C
                    </a>
                  </li>
                  <li
                    className={`page-item ${
                      selectedRoom === "Room D" ? "active" : ""
                    }`}
                  >
                    <a
                      className="page-link"
                      onClick={() => handleRoomChange("Room D")}
                      style={{ cursor: "pointer" }}
                    >
                      D
                    </a>
                  </li>
                </ul>
              </nav>
            </CardBody>
          </Card>
          {selectedRoom === "Room A" ? (
            <div key={selectedRoom}>
              <GDSCCalendar
                data={applicationData}
                link={"praphon.kha/gdsc-interview-room-a"}
              />
            </div>
          ) : selectedRoom === "Room B" ? (
            <div key={selectedRoom}>
              <GDSCCalendar
                data={applicationData}
                link={"praphon.kha/gdsc-interview-room-b"}
              />
            </div>
          ) : selectedRoom === "Room C" ? (
            <div key={selectedRoom}>
              <GDSCCalendar
                data={applicationData}
                link={"praphon.kha/gdsc-interview-room-c"}
              />
              <br />
            </div>
          ) : selectedRoom === "Room D" ? (
            <div key={selectedRoom}>
              <GDSCCalendar
                data={applicationData}
                link={"praphon.kha/gdsc-interview-room-d"}
              />{" "}
              <br />
            </div>
          ) : null}
        </Col>
      </Row>
    </div>
  );
}

export default AuthorizePage;
