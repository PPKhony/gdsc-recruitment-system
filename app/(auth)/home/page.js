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
import ProgressTracker from "@/components/ProgressTracker";
const HomePage = () => {
  const supabase = createClient();
  const [applicantstatus, setApplicantStatus] = useState([]);
  const [itw_data, setItwData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);
  const [user, setUser] = useState(null);
  const [applicantresult, setApplicantResult] = useState(null);
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

        const { data: application_result, error: application_result_error } =
          await supabase
            .from("applications_result")
            .select("*")
            .eq("user_id", user.id);

        if (applicantError) {
          console.error("Error fetching applicant data:", applicantError);
        } else {
          setApplicantStatus(applicantData);
          setItwData(itv_data);
          if (applicantData.length > 0) {
            setSelectedApplicationId(applicantData[0].applicationid);
          }
          // sessionStorage.setItem(
          //   "applicationData",
          //   JSON.stringify(applicantData)
          // );

          await setApplicantResult(application_result);
          await sessionStorage.setItem(
            "applicationResult",
            JSON.stringify(application_result)
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
      <Card
        style={{
          borderColor: "white",
          borderTopLeftRadius: "0px",
          borderTopRightRadius: "0px",
        }}
        className="no-padding"
      >
        <CardBody>
          <div
            style={{
              position: "absolute",
              top: "10px",
            }}
          >
            <h1>Application Tracker System</h1>
            <h4>Hello {user?.user_metadata?.full_name} 👋</h4>
          </div>
        </CardBody>
        <div className="d-flex justify-content-end">
          <div
            xs={12}
            lg={8}
            style={{
              backgroundImage: "url(/images/bg-application.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "right",
              minHeight: "20rem",
              maxWidth: "1000px",
              width: "100%",
            }}
          ></div>
        </div>
      </Card>
      {applicantstatus.length === 0 ? (
        <div>You have no previous applications</div>
      ) : null}
      <Row xs={1} md={1} lg={2} xl={2}>
        <Col md={8} lg={4} xl={3} className="pt-4">
          <Card style={{ position: "sticky", top: "30px" }}>
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
        <Col md={12} lg={8} xl={9} className="pt-4">
          {applicantstatus.map((applicant, i) => {
            const alertVariant =
              applicant.status === "success" ||
              applicant.status === "complete" ||
              applicant.status === "submitted"
                ? "success"
                : applicant.status === "rejected"
                ? "danger"
                : "secondary";

            const filteredInterview = itw_data?.filter(
              (data) => data.application_id == applicant.applicationid
            );

            const filteredResult = applicantresult?.filter(
              (data) => data.application_id == applicant.applicationid
            );

            return (
              <Card
                key={i}
                id={`applicant-${applicant.applicationid}`}
                className="mb-4 px-3 px-xl-4 py-5"
                style={{ borderColor: "white" }}
              >
                <div className="d-flex mb-3 justify-content-between align-items-center flex-wrap">
                  <Col className="colored-bar-container">
                    <div style={{ color: "gray" }}>Application ID</div>
                    <h5>{applicant.applicationid}</h5>
                    <h6>{applicant.role}</h6>
                  </Col>
                  <div className="text-center">
                    <h6 className="d-none d-md-block">Application Status</h6>
                    <Alert
                      variant={alertVariant}
                      style={{ textAlign: "center" }}
                      className="d-inline-flex px-3 py-1 fw-semibold rounded-5"
                    >
                      {applicant.status}
                    </Alert>
                  </div>
                </div>
                <div>
                  <h5>Recruitment Process</h5>
                  <ProgressTracker />
                </div>
                <h5 className="mb-">Application Result</h5>
                <div className="my-3">
                  {filteredResult[0]?.status == "Passed" &&
                  filteredResult[0]?.isAccept == "FALSE" ? (
                    <Alert>
                      <h5>Congratulation</h5> 
                      <h6 className="mb-4">
                        You have been selected to be a core team in 2024
                      </h6>
                      <h6>Pending for confirm member status</h6>
                      <p>Before 20-09-2024 23:59 (GMT+07)</p>
                      <hr/>
                      <Button
                        href={`/acceptinvited/` + filteredResult[0].object_id}
                      >
                        Click here to confirm
                      </Button>
                    </Alert>
                  ) : null}
                  {filteredResult[0]?.status == "Passed" &&
                  filteredResult[0]?.isAccept == "TRUE" ? (
                    <Alert variant="success">
                      <h5>Congratulation! You are member of gdsc 2024!</h5>
                      <h6>Proceed next step join GDSC Discord</h6>
                      <hr/>
                      <Button href="https://discord.gg/47D6FTjn" variant="outline-dark">
                        Join Discord
                      </Button>
                    </Alert>
                  ) : null}
                  {filteredResult[0]?.status == "Rejected" ? (
                    <Alert variant="danger">
                      <h5>Rejected Application</h5>
                      <p>
                        Thank you for your interest in the {applicant.role}{" "}
                        position at GDSC Thammasat. We appreciate the time and
                        effort you put into your application and interview
                        process.
                      </p>
                      <p>
                        After careful consideration, we regret to inform you
                        that we will not be moving forward with your application
                        at this time. This decision was a difficult one.
                      </p>
                      <p>
                        We encourage you to apply for future openings that align
                        with your skills and experience. Thank you again for
                        your interest in our company and for the opportunity to
                        consider your application.
                      </p>
                    </Alert>
                  ) : null}

                  {filteredResult.length == 0 ? (
                    <Alert>
                      The problem occurs to application please contact us via
                      email before 20 Sep 2024
                    </Alert>
                  ) : null}
                </div>

                <div>
                  <b>Candidate Name: </b>
                  {applicant.full_name}
                  <div>
                    <b>Form Submitted On: </b>
                    {formatDateToGMTPlus7(applicant.timestamp)}
                    <hr/>
                    <ApplicationDetailsModal dataObject={applicant} />
                  </div>
                </div>
                
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
