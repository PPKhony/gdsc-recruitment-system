"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
} from "react-bootstrap";
import PositionOpening from "@/components/PositionOpening";
import Image from "next/image";


const HomePage = () => {
  const supabase = createClient();
  const [applicantstatus, setApplicantStatus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch the authenticated user's session
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const userId = session?.user?.id;

      if (userId) {
        // Fetch applicant status data
        const { data: applicantData, error: applicantError } = await supabase
          .from("interview_prescreen")
          .select("*")
          .eq("user_id", userId);

        if (applicantError) {
          console.error("Error fetching applicant data:", applicantError);
        } else {
          for (let index = 0; index < applicantData.length; index++) {
            applicantData[index]["position"] = "technical core team 2024";
          }
          setApplicantStatus(applicantData);
        }
        console.log(applicantData[0]);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  function formatDateToGMTPlus7(dateString) {
    // Parse the date string to a Date object
    const date = new Date(dateString);

    // Adjust for GMT+07:00 timezone
    const gmtOffsetInHours = 7;
    const localDate = new Date(
      date.getTime() + gmtOffsetInHours * 60 * 60 * 1000
    );

    // Extract components
    const day = String(localDate.getUTCDate()).padStart(2, "0");
    const month = String(localDate.getUTCMonth() + 1).padStart(2, "0");
    const year = localDate.getUTCFullYear();
    const hours = String(localDate.getUTCHours()).padStart(2, "0");
    const minutes = String(localDate.getUTCMinutes()).padStart(2, "0");

    // Format to DD/MM/YYYY HH:mm GMT+07
    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes} GMT+07`;

    return formattedDate;
  }

  if (loading)
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeigth: "80vh" }}
      >
        \
        <Image src="/images/GDSC-GIF-Loading.gif" width="300" height="300" />
      </Container>
    );

  return (
    <>
      <h1>Application Status</h1>
      {applicantstatus.length === 0 ? (
        <div>You have no previous applications</div>
      ) : null}
      {applicantstatus.map((applicant, i) => {
        // Determine the alert variant based on applicant status
        const alertVariant =
          applicant.status === "success" ||
          applicant.status === "complete" ||
          applicant.status === "submitted"
            ? "success"
            : applicant.status === "pending"
            ? "warning"
            : "secondary";

        return (
          <Card key={applicant.i} className="mt-3">
            <CardBody>
              <div className="d-flex mb-3 justify-content-between align-items-center flex-wrap ">
                <Col className=" colored-bar-container">
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
              <div>{"candidate name " + applicant.full_name}</div>
              <div>
                {"submit on " + formatDateToGMTPlus7(applicant.timestamp)}
              </div>
              {/* <hr />
              <Card.Link href={`/home/interview/`+applicant.object_id}>
                Schedule Interview Time
              </Card.Link> */}
            </CardBody>
          </Card>
        );
      })}
      <br />
      <div>
        <h1 className="my-3">Position Opening</h1>
        <PositionOpening />
      </div>
    </>
  );
};

export default HomePage;
