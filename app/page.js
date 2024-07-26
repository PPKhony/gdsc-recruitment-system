"use client";

import Footer from "@/components/Footer";
import PositionOpening from "@/components/PositionOpening";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Button,
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  Card,
  CardBody,
} from "react-bootstrap";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

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
      <motion.div
        className="header-01"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Navbar expand="lg" variant="dark">
          <Container>
            <Navbar.Brand
              href="#home"
              className="d-flex align-items-center my-4"
            >
              <Image
                src="/images/Google_for_Developers_logomark_white.png"
                width={50}
                height={23}
                alt="logo"
              />
              <Col style={{ marginLeft: "8px" }}>Thammasat University</Col>
            </Navbar.Brand>
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
            >
              <i className="bi bi-list" style={{fontSize: "2rem"}}></i>
            </Navbar.Toggle>
            <Navbar.Collapse
              id="basic-navbar-nav"
              style={{ color: "white", opacity: "100%", fontWeight: "500" }}
            >
              <Nav
                className="ms-auto justify-content-end home-navbar"
                defaultActiveKey="/"
              >
                <Nav.Link className="mx-3 home-navbar" href="/">
                  Home
                </Nav.Link>
                <Nav.Link className="mx-3 home-navbar" href="/lifeatgdsctu">
                  Life at GDSC@TU
                </Nav.Link>
                <Nav.Link className="mx-3 home-navbar" href="/lifeatgdsctu">
                  Contact US
                </Nav.Link>
                <Nav.Link className="mx-3 home-navbar" href="/login">
                  Login
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Container style={{ color: "white" }}>
          <motion.div
            style={{ position: "absolute", bottom: "3.5rem" }}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h1 style={{ fontSize: "3.5rem" }}>Growth with </h1>
            <h1 style={{ fontSize: "2rem" }}>GDSC@TU</h1>
            <hr />
            <p style={{ maxWidth: "600px" }}>
              Apply new learnings to build great solutions for local problems.
              Advance your skills, career, and network. Give back to your
              community by helping others learn.
            </p>
            <Button
              className="animated-button"
              onClick={handleLoginClick}
              style={{ fontWeight: "bold" }}
            >
              <span>Apply Club</span>
            </Button>
          </motion.div>
        </Container>
      </motion.div>
      <motion.div
        style={{ backgroundColor: "#f1f3f4", minHeight: "30vh" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <Container className="pb-4">
          <h1 className="py-4">About GDSC</h1>
          <Row xs={1} lg={2}>
            <Col ref={ref}>
              <motion.iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/UGE13GR9_CU?si=EXB_f_bq4OuOU2Ud"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                initial="hidden"
                animate={controls}
                variants={{
                  hidden: { opacity: 0, y: 100 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              ></motion.iframe>
            </Col>
            <Col ref={ref}>
              <motion.div
                initial="hidden"
                animate={controls}
                variants={{
                  hidden: { opacity: 0, y: 100 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                <Card>
                  <CardBody>
                    <Card.Title>Say cheese to GDSC</Card.Title>
                  </CardBody>
                </Card>
              </motion.div>
            </Col>
          </Row>
          <h1 className="my-4">Position Opening</h1>
          <PositionOpening />
        </Container>
      </motion.div>
      <Footer />
    </div>
  );
}
