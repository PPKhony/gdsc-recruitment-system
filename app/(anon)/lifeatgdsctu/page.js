"use client";

import Footer from "@/components/Footer";
import PositionOpening from "@/components/PositionOpening";
import { useRouter } from "next/navigation";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
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
      <div className="header-01-lifeatgdsc">
        <Container style={{ color: "white" }}>
          <motion.div
            style={{ position: "absolute", bottom: "4rem" }}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h1 style={{ fontSize: "3.5rem" }}>Life AT </h1>
            <h1 style={{ fontSize: "3rem" }}>GDSC@TU</h1>
            <hr />
            <p style={{ maxWidth: "600px" }}>
              Apply new learnings to build great solutions for local problems.
              Advance your skills, career, and network. Give back to your
              community by helping others learn.
            </p>
            <br />
          </motion.div>
        </Container>
      </div>
      <div style={{ backgroundColor: "#f1f3f4", minHeight: "30vh" }}>
        <Container className="py-5">
          <h1 className="mb-3">Our lasted Blogs</h1>
          <h4> wait for future :) </h4>
          {/* <Row xs={1} md={3} lg={3}>
            <Col ref={ref}>
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
                <Card>
                  <Card.Body>
                    <Card.Title>
                      Blog A
                    </Card.Title>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
            <Col ref={ref}>
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
                <Card>
                  <Card.Body>
                    <Card.Title>
                      Blog B
                    </Card.Title>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          </Row> */}
        </Container>
      </div>
      <div className="header-02 py-4">
        <Container>
          <div>
            <br />
            <h1 style={{ color: "white" }}>Joining with us</h1>
            <div style={{ color: "white" }}>Fall 2024</div>
            <br />
          </div>
          <PositionOpening />
        </Container>
      </div>

      <Footer />
    </div>
  );
}
