"use client";
import { useEffect, useState, useRef } from "react";
import { Button, Card, Col, Container, Image, Navbar } from "react-bootstrap";
import { motion } from "framer-motion"; // Import motion from framer-motion
import { createClient } from "@/utils/supabase/client";

function AuthorizePage({ params }) {
  const [applicationData, setApplicationData] = useState([]);
  const [sectionPage, setSectionPage] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false); // Video loading state
  const [isMinimumTimeElapsed, setIsMinimumTimeElapsed] = useState(false); // Minimum time state
  const [sectionAccept, setSectionAccept] = useState(1);
  const [g_user, setG_user] = useState(null);
  const [seconds, setSeconds] = useState(3);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setG_user(user);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const applicationDatas = sessionStorage.getItem("applicationResult");

    if (applicationDatas) {
      const parsedData = JSON.parse(applicationDatas);
      const filteredData = parsedData?.filter(
        (data) => data.object_id == params.applicationid
      );
      Array.isArray(filteredData) ? setApplicationData(filteredData) : null;
    }

    // Set minimum loading time to 3 seconds
    const timer = setTimeout(() => {
      setIsMinimumTimeElapsed(true);
    }, seconds * 1000);

    return () => clearTimeout(timer); // Clear timer if the component unmounts
  }, [params.applicationid]);

  const updateAcceptmember = async () => {
    setSectionPage(2);
    setSectionAccept(3);
    const { data, error } = await supabase
      .from("applications_result")
      .update({ isAccept: "TRUE" })
      .eq("object_id", applicationData[0].object_id);

    if (error) {
      console.error("Error updating data:", error.message);
    }
  };

  const NoDataFallback = () => (
    <Container
      style={{ height: "95dvh" }}
      className="d-flex flex-column justify-content-center align-items-center text-white"
    >
      <h1 className="mb-4">No applicationData available :( </h1>
      <Button href="/home">Go back to home page</Button>
    </Container>
  );

  useEffect(() => {
    if (seconds > 0) {
      const timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      // Clear the interval when the component unmounts or when the countdown ends
      return () => clearInterval(timer);
    }
  }, [seconds]);

  // Loading screen is shown if either the video is not loaded or the minimum time has not elapsed
  if (!isLoaded) {
    return (
      <Container style={{ minHeight: "100dvh", color: "white" }}>
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ minHeight: "100dvh" }}
        >
          <Image
            src="/images/GDSC-GIF-Loading.gif"
            width="300"
            height="300"
            alt="Loading..."
          />
          <h6 className="mb-3">**This application have background music</h6>
          {!isMinimumTimeElapsed ? (
            <div>
              <h3>Loading...</h3>
              <h6>Waiting in: {seconds}</h6>
            </div>
          ) : null}
          {isMinimumTimeElapsed ? (
            <Button
              onClick={() => {
                setIsLoaded(!isLoaded);
              }}
            >
              {" "}
              Continue...
            </Button>
          ) : null}
        </div>
      </Container>
    );
  } else if (
    applicationData?.filter((data) => data.object_id == params.applicationid)
      .length === 0
  ) {
    return <NoDataFallback />;
  }

  // Function to handle video end event
  const handleVideoEnd = (number) => {
    setSectionPage(number); // Change sectionPage to 1 when the video ends
  };

  return (
    <motion.div
      initial={{ opacity: 0 }} // Initial state before page load
      animate={{ opacity: 1 }} // Transition to full opacity
      transition={{ duration: 1.5 }} // Duration for page load animation
    >
      <Container>
        <div
          style={{
            backgroundColor: "transparent",
            position: "absolute",
            top: "0",
          }}
          href="/"
          className="d-flex align-items-center my-4"
        >
          <Image
            src="/images/Google_for_Developers_logomark_color.png"
            width={50}
            height={23}
            alt="logo"
            style={{ zIndex: "1000" }}
          />
          <Col style={{ marginLeft: "8px", color: "white", zIndex: "1000" }}>
            <div>Thammasat University</div>
          </Col>
        </div>
      </Container>
      <audio
        src="/images/sound1.mp3"
        autoPlay
        style={{ width: "0px", height: "0px" }}
      />
      {sectionPage === 0 || sectionPage === 1 ? (
        <div
          style={{ position: "relative", height: "100dvh", overflow: "hidden" }}
        >
          <video
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={() => handleVideoEnd(1)} // Set event listener for video end
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              minWidth: "100%",
              minHeight: "100%",
              width: "auto",
              height: "auto",
              zIndex: "1",
              transform: "translate(-50%, -50%)",
            }}
          >
            <source src="https://wxaqfbrnwhtooidzbvhi.supabase.co/storage/v1/object/public/video/01.mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Fade-in text on page load */}
          {sectionPage === 1 ? (
            <Container
              style={{
                position: "relative",
                zIndex: "1",
                color: "white",
                textAlign: "center",
                marginTop: "50px",
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                style={{
                  position: "relative",
                  zIndex: "1",
                  color: "white",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "90dvh",
                }}
              >
                <Container
                  className="background-congratulation mt-xl-5 mt-md-3 mt-2 py-4 px-4"
                  style={{ textAlign: "left" }}
                >
                  {sectionAccept === 1 ? (
                    <div>
                      <h4>You have Been Selected to Join GDSC</h4>
                      <p style={{ maxWidth: "500px", lineHeight: "1.8" }}>
                        Your passion and skills have truly impressed us, and we
                        are excited to have you as part of the team. Get ready
                        for an exciting journey of growth, collaboration, and
                        impact!
                      </p>
                      <p>
                        {" "}
                        We are looking forward to seeing you thrive in GDSC!
                        Once again,
                      </p>
                      <b>congratulations and welcome aboard!</b>
                      <hr />
                      <Button onClick={() => setSectionAccept(2)}>Next</Button>
                    </div>
                  ) : null}
                  {sectionAccept == 2 ? (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 1,
                      }} // Add easing
                    >
                      <h4>Become GDSC Team!</h4>
                      <h6>{g_user.user_metadata.name}</h6>
                      <h6
                        className="mt-4"
                        style={{ lineHeight: "1.5", maxWidth: "500px" }}
                      >
                        Click the button below to officially join the GDSC Core
                        Team 2024 and start your exciting journey with us!
                      </h6>
                      <hr />
                      <Button onClick={updateAcceptmember} variant="light">
                        Accept
                      </Button>
                    </motion.div>
                  ) : null}
                </Container>
              </motion.div>
            </Container>
          ) : null}
        </div>
      ) : null}

      {sectionPage === 2 ? (
        <div
          style={{ position: "relative", height: "100dvh", overflow: "hidden" }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              minWidth: "100%",
              minHeight: "100%",
              width: "auto",
              height: "auto",
              transform: "translate(-50%, -50%)",
            }}
          >
            <source
              src="https://wxaqfbrnwhtooidzbvhi.supabase.co/storage/v1/object/public/video/02-2.mp4"
              // src="https://cdn.discordapp.com/attachments/941645769012822049/1284906444780470303/02-2.mp4?ex=66e855e0&is=66e70460&hm=83a09822e1456006be03ad5f03b87db2cb3e468a40f6db029819b55c9f877f5b&"
              // src="https://firebasestorage.googleapis.com/v0/b/gdsc-test-58801.appspot.com/o/02-2.mp4?alt=media&token=19afd371-d455-4289-ad01-d9c9ce518727"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          {sectionAccept === 3 ? (
            <Container>
              <div
                style={{
                  position: "relative",
                  zIndex: "1",
                  color: "white",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "90dvh",
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, delay: 7 }}
                  style={{
                    position: "relative",
                    zIndex: "1",
                    color: "white",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "90dvh",
                  }}
                >
                  <Container
                    className="background-congratulation py-4 px-4"
                    style={{ textAlign: "left" }}
                  >
                    <div>
                      <h4 className="mb-3">Thank you for joining GDSC!</h4>
                      <p style={{ maxWidth: "500px", lineHeight: "1.8" }}>
                        You have successfully joined the GDSC Core Team 2024! We
                        are thrilled to have you on board and can{"'"}t wait to
                        see your contributions to the community.
                      </p>
                      <b>congratulations and welcome aboard!</b>
                      <hr />
                      <div>Go to Homepage and going in next step</div>
                      <br />
                      <Button href="/home">Homepage</Button>
                    </div>
                  </Container>
                </motion.div>
              </div>
            </Container>
          ) : null}
        </div>
      ) : null}
    </motion.div>
  );
}

export default AuthorizePage;
