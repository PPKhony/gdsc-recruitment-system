"use client";

import Footer from "@/components/Footer";
import PositionOpening from "@/components/PositionOpening";
import { useRouter } from "next/navigation";
import { Button, Container, Row, Col, Image } from "react-bootstrap";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import HomepageHeader from "@/components/HomepageHeader";

export default function Home() {
  const router = useRouter();
  const handleLoginClick = () => {
    router.push("/login");
  };

  // Control animations on scroll
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <div>
      <div className="header-01">
        <Container style={{ color: "white" }}>
          <motion.div
            style={{ position: "absolute", bottom: "4rem" }}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div>
              <h1 style={{ fontSize: "3.5rem" }}>Growth with </h1>
              <h1 style={{ fontSize: "3rem" }}>GDSC@TU</h1>
            </div>
            <hr />
            <p style={{ maxWidth: "600px" }}>
              Showing more representation in tech with GDSC greatly increases
              our confidence, innovation, and performance. Especially in
              academic environments, having a sense of belonging and community
              for students can lead to success in tech together.
            </p>
            <br />
            <Button
              className="animated-button"
              onClick={handleLoginClick}
              style={{ fontWeight: "bold" }}
            >
              <span>Apply Club</span>
            </Button>
          </motion.div>
        </Container>
      </div>
      <div style={{ backgroundColor: "#f1f3f4", minHeight: "30vh" }}>
        <Container className="py-5">
          <Row xs={1} lg={2}>
            <Col ref={ref} className="d-flex justify-content-center">
              <Image
                src="images/img01.jpg"
                width="90%"
                heigth="70%"
                className="rounded-3 border-black"
              />
              {/* <br/> */}
              {/* <a href="https://www.freepik.com/free-photo/3d-rendering-people-avatars-zoom-call_30117667.htm#fromView=search&page=1&position=14&uuid=e8cdce17-780f-40e3-bdd3-5dea3ff40bba">
                Image by freepik
              </a> */}
            </Col>
            <Col ref={ref} className="d-flex align-items-center">
              <motion.div
                initial="hidden"
                animate={controls}
                variants={{
                  hidden: { opacity: 0, y: 100 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5 },
                  },
                }}
              >
                <h1 className="my-4">Why you should join GDSC</h1>
                <div style={{ marginLeft: "1rem", marginBottom: "1.5rem" }}>
                  <h3 className="colored-bar-container">Connect</h3>
                  Meet students interested in developer technologies at your
                  college or university. All are welcome, including those with
                  diverse backgrounds and different majors.
                </div>
                <div style={{ marginLeft: "1rem", marginBottom: "1.5rem" }}>
                  <h3 className="colored-bar-container">Learn</h3>
                  Learn about a range of technical topics and gain new skills
                  through hands-on workshops, events, talks, and
                  project-building activities online and in-person.
                </div>
                <div style={{ marginLeft: "1rem", marginBottom: "1.5rem" }}>
                  <h3 className="colored-bar-container">Grow</h3>
                  Apply new learnings to build great solutions for local
                  problems. Advance your skills, career, and network. Give back
                  to your community by helping others learn.
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="header-02 py-4">
        <Container>
          <div>
            <br />
            <h1 style={{ color: "white" }}>Position Opening</h1>
            <h5 style={{ color: "white" }}>Semester 1-2/2567 </h5>
            <br />
          </div>
          <PositionOpening />
        </Container>
      </div>

      <Footer />
    </div>
  );
}
