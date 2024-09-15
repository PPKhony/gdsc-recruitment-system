"use client";
import { useEffect, useState } from "react";
import { Button, Container, Image } from "react-bootstrap";
import { motion } from "framer-motion"; 
import { openDB } from 'idb';

function AuthorizePage({ params }) {
  const [applicationData, setApplicationData] = useState([]);
  const [sectionPage, setSectionPage] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false); // Video loading state
  const [isMinimumTimeElapsed, setIsMinimumTimeElapsed] = useState(false); // Minimum time state
  const [sectionAccept, setSectionAccept] = useState(1);
  const [videosLoaded, setVideosLoaded] = useState(false); // Videos cached and ready state
  const [videoUrl1, setVideoUrl1] = useState(null); // State to hold video 1 URL
  const [videoUrl2, setVideoUrl2] = useState(null); // State to hold video 2 URL

  const videoUrls = ["/images/01.mp4", "/images/02.mp4"];

  // Initialize IndexedDB
  const initDB = async () => {
    return openDB("video-cache", 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("videos")) {
          db.createObjectStore("videos", { keyPath: "url" });
        }
      },
    });
  };

  // Utility function to fetch and cache the video as Blob data in IndexedDB
  const cacheVideo = async (url) => {
    const db = await initDB();
    const response = await fetch(url);
    const blob = await response.blob();
    await db.put("videos", { url, blob });
  };

  // Load videos from IndexedDB or fetch and cache them if not available
  const loadAndCacheVideos = async () => {
    const db = await initDB();

    for (const url of videoUrls) {
      const cachedVideo = await db.get("videos", url);
      if (!cachedVideo) {
        await cacheVideo(url);
      }
    }

    // After caching, load the video URLs
    const video1Blob = await db.get("videos", videoUrls[0]);
    const video2Blob = await db.get("videos", videoUrls[1]);

    if (video1Blob) setVideoUrl1(URL.createObjectURL(video1Blob.blob));
    if (video2Blob) setVideoUrl2(URL.createObjectURL(video2Blob.blob));

    setVideosLoaded(true); // Mark videos as loaded
  };

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
    }, 3000);

    loadAndCacheVideos(); // Start caching videos

    return () => clearTimeout(timer); // Clear timer if the component unmounts
  }, [params.applicationid]);

  const NoDataFallback = () => (
    <Container
      style={{ height: "95dvh" }}
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <h1>No applicationData available :( </h1>
      <Button href="/home">Go back to home page</Button>
    </Container>
  );

  // Loading screen is shown if the minimum time hasn't elapsed or videos aren't loaded yet
  if (!isMinimumTimeElapsed || !videosLoaded) {
    return (
      <Container style={{ minHeight: "100dvh" }}>
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
          <h3>Loading...</h3>
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
            onEnded={() => handleVideoEnd(1)} // Set event listener for video end
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              minWidth: "100%",
              minHeight: "100%",
              width: "auto",
              height: "auto",
              zIndex: "-1",
              transform: "translate(-50%, -50%)",
            }}
          >
            {videoUrl1 ? (
              <source src={videoUrl1} type="video/mp4" />
            ) : (
              <p>Your browser does not support the video tag.</p>
            )}
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
                  marginTop: "50px",
                }}
              >
                <h1 className="mb-3">Congratulations</h1>
                <Container
                  className="background-congratulation mt-xl-5 mt-md-3 mt-2 pb-4 px-4"
                  style={{ textAlign: "left" }}
                >
                  {sectionAccept === 1 ? (
                    <div>
                      <br />
                      <p style={{ maxWidth: "500px", lineHeight: "1.8" }}>
                        We are thrilled to inform you that you have been
                        selected to join the Google Developer Student Club
                        (GDSC) at Thammasat University! Your passion, skills,
                        and dedication have truly stood out, and we believe you
                        will be a valuable part of our club. This is the
                        beginning of an exciting journey filled with
                        opportunities to grow, collaborate, and make an impact.
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
                    <div>
                      <h4>Become GDSC Team!</h4>
                      <h6 className="mb-4" style={{ lineHeight: "1.5" }}>
                        Click the button below to officially join the GDSC Core
                        Team 2024 and start your exciting journey with us!
                      </h6>
                      <Button onClick={updateAcceptmember}>
                        Join the GDSC Core Team 2024
                      </Button>
                    </div>
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
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              minWidth: "100%",
              minHeight: "100%",
              width: "auto",
              height: "auto",
              zIndex: "-1",
              transform: "translate(-50%, -50%)",
            }}
          >
            {videoUrl2 ? (
              <source src={videoUrl2} type="video/mp4" />
            ) : (
              <p>Your browser does not support the video tag.</p>
            )}
          </video>
        </div>
      ) : null}
    </motion.div>
  );
}

export default AuthorizePage;
