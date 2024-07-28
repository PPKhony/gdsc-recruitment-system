"use client";

import { useEffect, useState, ReactNode } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import {
  Button,
  Col,
  Container,
  Nav,
  Navbar,
  Offcanvas,
} from "react-bootstrap";

interface HomepageHeaderProps {
  children?: ReactNode;
}

const HomepageHeader: React.FC<HomepageHeaderProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState<string>("");
  const [show, setShow] = useState(false);
  const [isCollapse, setIsCollapse] = useState(false); // State for collapse

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (pathname) {
      setCurrentPath(pathname);
    }
  }, [pathname]);

    // Detect breakpoint for collapse
    useEffect(() => {
      const handleResize = () => {
        setIsCollapse(window.innerWidth <= 992); // Set collapse based on breakpoint
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

  return (
    <div className="homepageheader">
      <Navbar expand="lg" variant="dark">
        <Container>
          <Navbar.Brand href="#home" className="d-flex align-items-center my-4">
            <Image
              src="/images/Google_for_Developers_logomark_white.png"
              width={50}
              height={23}
              alt="logo"
            />
            <Col style={{ marginLeft: "8px" }}>Thammasat University</Col>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="offcanvasNavbar-expand-lg"
            onClick={handleShow}
          >
            <i className="bi bi-list" style={{ fontSize: "2rem" }}></i>
          </Navbar.Toggle>
          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-lg"
            aria-labelledby="offcanvasNavbarLabel-expand-lg"
            placement="end"
            show={show}
            onHide={handleClose}
            className="bg-black text-white"
          >
            <Offcanvas.Header closeButton closeVariant="white">
              <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg">
                Menu
              </Offcanvas.Title>
            </Offcanvas.Header>
            {isCollapse === false ? (
              <Offcanvas.Body>
                <Nav
                  className="justify-content-end align-items-center flex-grow-1 pe-3"
                  defaultActiveKey={currentPath}
                >
                  <Nav.Link
                    className="mx-3 home-navbar text-white"
                    href="/"
                    active={currentPath === "/"}
                    style={{fontWeight: "bold"}}
                  >
                    Home
                  </Nav.Link>
                  <Nav.Link
                    className="mx-3 home-navbar text-white"
                    href="/lifeatgdsctu"
                    active={currentPath === "/lifeatgdsctu"}
                    style={{fontWeight: "bold"}}
                  >
                    Life at GDSC@TU
                  </Nav.Link>
                  <Nav.Link
                    className="mx-3 home-navbar text-white"
                    href="/contactus"
                    active={currentPath === "/contactus"}
                    style={{fontWeight: "bold"}}
                  >
                    Contact US
                  </Nav.Link>
                </Nav>
                <Button href="/login" variant="outline-light"  style={{fontWeight: "bold"}}>
                  Login
                </Button>
              </Offcanvas.Body>
            ) : (
              <Offcanvas.Body>
                <Nav
                  className="justify-content-start flex-grow-1"
                  defaultActiveKey={currentPath}
                >
                  <Nav.Link
                    className="mx-3 home-navbar text-white"
                    href="/"
                    active={currentPath === "/"}
                  >
                    Home
                  </Nav.Link>
                  <Nav.Link
                    className="mx-3 home-navbar text-white"
                    href="/lifeatgdsctu"
                    active={currentPath === "/lifeatgdsctu"}
                  >
                    Life at GDSC@TU
                  </Nav.Link>
                  <Nav.Link
                    className="mx-3 home-navbar text-white"
                    href="/contactus"
                    active={currentPath === "/contactus"}
                  >
                    Contact US
                  </Nav.Link>
                </Nav>
                <Button href="/login" variant="light" style={{position: "absolute", bottom: "2rem"}}>
                  Login
                </Button>
              </Offcanvas.Body>
            )}
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
};

export default HomepageHeader;
