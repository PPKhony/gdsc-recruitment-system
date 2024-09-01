"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import {
  Alert,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Nav,
  Row,
} from "react-bootstrap";
import PositionOpening from "@/components/PositionOpening";
import Image from "next/image";
import ApplicationDetailsModal from "@/components/ResponseDataModal";

const HomePage = () => {
  const supabase = createClient();
  const [applicantstatus, setApplicantStatus] = useState([]);
  const [itw_data, setItwData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const g_user = user;

      if (g_user) {
        setUser(g_user);
        const userId = g_user?.id;
        const { data: applicantData, error: applicantError } = await supabase
          .from("interview_prescreen")
          .select("*")
          .eq("user_id", userId);

        const { data: itv_data, error: itv_error } = await supabase
          .from("interview_schedule")
          .select("*")
          .eq("user_email", user.email);

        if (applicantError) {
          console.error("Error fetching applicant data:", applicantError);
        } else if (itv_error) {
          console.error("Error fetching applicant data:", itv_data);
        } else {
          setApplicantStatus(applicantData);
          setItwData(itv_data);
          if (applicantData.length > 0) {
            setSelectedApplicationId(applicantData[0].applicationid);
          }
          console.log(itv_data);
          sessionStorage.setItem(
            "applicationData",
            JSON.stringify(applicantData)
          );
        }
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  function formatDateToGMTPlus7(dateString) {
    const date = new Date(dateString);
    const gmtOffsetInHours = 7;
    const localDate = new Date(
      date.getTime() + gmtOffsetInHours * 60 * 60 * 1000
    );
    const day = String(localDate.getUTCDate()).padStart(2, "0");
    const month = String(localDate.getUTCMonth() + 1).padStart(2, "0");
    const year = localDate.getUTCFullYear();
    const hours = String(localDate.getUTCHours()).padStart(2, "0");
    const minutes = String(localDate.getUTCMinutes()).padStart(2, "0");
    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes} (GMT+07)`;

    return formattedDate;
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const localDate = new Date(date.getTime() + 0 * 60 * 60 * 1000);
    const day = String(localDate.getUTCDate()).padStart(2, "0");
    const month = String(localDate.getUTCMonth() + 1).padStart(2, "0");
    const year = localDate.getUTCFullYear();
    const hours = String(localDate.getUTCHours()).padStart(2, "0");
    const minutes = String(localDate.getUTCMinutes()).padStart(2, "0");
    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes} (GMT+07)`;

    return formattedDate;
  }

  if (loading)
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeigth: "80vh" }}
      >
        <Image src="/images/GDSC-GIF-Loading.gif" width="300" height="300" />
      </Container>
    );

  return (
    <>
      <h1>Application Status</h1>
      <h4>Hello {user?.user_metadata?.full_name} 👋</h4>
      {applicantstatus.length === 0 ? (
        <div>You have no previous applications</div>
      ) : null}
      <Row xs={1} md={1} lg={2}>
        <Col lg={3} className="pt-4">
          <Card style={{ position: "sticky", top: "0px" }}>
            <CardBody>
              <h5>
                <b>Your Application</b>
              </h5>
              <p style={{ color: "grey" }}>
                Your submittion recorded with : {user?.email}
              </p>
              <hr />
              <Nav
                className="flex-column nav-underline"
                activeKey={`#applicant-${selectedApplicationId}`}
                onSelect={(selectedKey) =>
                  setSelectedApplicationId(
                    selectedKey.replace("#applicant-", "")
                  )
                }
              >
                {applicantstatus.map((applicant, i) => (
                  <Nav.Link
                    key={i}
                    href={`#applicant-${applicant.applicationid}`}
                  >
                    Application ID: {applicant.applicationid}
                    <div style={{ color: "grey" }}>{applicant.role}</div>
                  </Nav.Link>
                ))}
              </Nav>
            </CardBody>
          </Card>
        </Col>
        <Col lg={9} className="pt-4">
          {applicantstatus.map((applicant, i) => {
            const alertVariant =
              applicant.status === "success" ||
              applicant.status === "complete" ||
              applicant.status === "submitted"
                ? "success"
                : applicant.status === "pending"
                ? "warning"
                : "secondary";

            const filteredInterview = itw_data?.filter(
              (data) => data.application_id == applicant.applicationid
            );

            return (
              <Card
                key={i}
                id={`applicant-${applicant.applicationid}`}
                className="mb-4"
              >
                <CardBody>
                  <div className="d-flex mb-3 justify-content-between align-items-center flex-wrap">
                    <Col className="colored-bar-container">
                      <div style={{ color: "gray" }}>Application ID</div>
                      <h5>{applicant.applicationid}</h5>
                      <h6>{applicant.role}</h6>
                    </Col>
                    <Alert
                      variant={alertVariant}
                      style={{ textAlign: "center" }}
                      className="d-inline-flex px-3 py-1 fw-semibold rounded-5"
                    >
                      {applicant.status}
                    </Alert>
                  </div>

                  {filteredInterview.length > 0 ? (
                    <Alert variant="success" className="my-3">
                      <h5>Successfully scheduling 🥳</h5>
                      <b>Your Interview time</b>
                      <ul>
                        <li>
                          <b>Interview Date-Time : </b>
                          {formatDate(filteredInterview[0].start_time)} -{" "}
                          {formatDate(filteredInterview[0].end_time)}
                        </li>

                        <li>
                          <b>Meeting Link : </b>{" "}
                          <a
                            href={filteredInterview[0].meeting_link}
                            style={{ color: "black" }}
                          >
                            {filteredInterview[0].meeting_link}
                          </a>
                        </li>
                      </ul>
                    </Alert>
                  ) : (
                    <Alert variant="info" className="my-3">
                      <h5>You are not scheduling for this application 😢</h5>
                      <div>
                        Please ensure that all interviews are scheduled before
                        September 6, 2024, 23:59:59 GMT+07.
                      </div>
                      <br />
                      <strong>
                        If you encounter any issues or need assistance, please{" "}
                        <a href="mailto:gdsc.thammasat@gmail.com">contact us</a>
                        .
                      </strong>
                      <p> (email : gdsc.thammasat@gmail.com)</p>
                    </Alert>
                  )}
                  <div>
                    <b>Candidate Name: </b>
                    {applicant.full_name}
                    <div>
                      <b>Form Submitted On: </b>
                      {formatDateToGMTPlus7(applicant.timestamp)}
                    </div>
                  </div>
                </CardBody>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <div className="d-block mb-3">
                      <ApplicationDetailsModal dataObject={applicant} />
                      {filteredInterview.length == 0 ? (
                        <Card.Link
                          href={`/home/interview/` + applicant.object_id}
                        >
                          Schedule Interview Time
                        </Card.Link>
                      ) : null}
                    </div>
                  </li>
                </ul>
              </Card>
            );
          })}
        </Col>
      </Row>
      <br />
      {/* <div>
        <h1 className="my-3">Position Opening</h1>
        <PositionOpening />
      </div> */}
    </>
  );
};

export default HomePage;
