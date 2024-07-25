// app/page.tsx
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
  NavDropdown,
  Card,
  CardBody,
} from "react-bootstrap";

export default function Home() {
  const router = useRouter();
  const handleLoginClick = () => {
    router.push("/login");
  };

  return (
    <div>
      <div className="header-01">
        <Navbar expand="lg" variant="dark">
          <Container>
            <Navbar.Brand href="#home" className="d-flex align-items-center">
              <Image
                src="/images/Google_for_Developers_logomark_white.png"
                width={50}
                height={23}
                alt="logo"
              />
              <Col style={{ marginLeft: "8px" }}>Thammasat University</Col>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
                {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown> */}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Container style={{ color: "white" }}>
          <div style={{ position: "absolute", bottom: "3rem" }}>
            <h1 style={{ fontSize: "3rem" }}>Growth with GDSC</h1>
            <hr />
            <p style={{ maxWidth: "600px" }}>
              Apply new learnings to build great solutions for local problems.
              Advance your skills, career, and network. Give back to your
              community by helping others learn.
            </p>
            <Button
              className="mt-3"
              style={{ fontWeight: "bold" }}
              onClick={handleLoginClick}
            >
              Apply club
            </Button>
          </div>
        </Container>
      </div>
      <div style={{ backgroundColor: "#f1f3f4", minHeight: "30vh" }}>
        <Container className="pb-4">
          <h1 className="py-4">About GDSC</h1>
          <Row xs={1} lg={2}>
            <Col>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/UGE13GR9_CU?si=EXB_f_bq4OuOU2Ud"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </Col>
            <Col>
              <Card>
                <CardBody>
                  <Card.Title>Say cheese to GDSC</Card.Title>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <h1 className="my-4">Position Opening</h1>
          <PositionOpening/>
        </Container>
      </div>
      <Footer />

      {/* <Row className="text-center">
        <Col>Life at GDSC</Col>
        <Col>
          <Button variant="primary" onClick={handleLoginClick}>
            Login
          </Button>
        </Col>
      </Row> */}
    </div>
  );
}
