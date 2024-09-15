"use client";
import React, { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation"; // Import useRouter from next/navigation
import {
  Navbar,
  Nav,
  Container,
  Button,
  Col,
  Offcanvas,
  Card,
} from "react-bootstrap";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";

const Header: React.FC = () => {
  const [user, setUser] = useState<string | null>(null);
  const [user_profile, setUser_profile] = useState<string | null>(null);
  const supabase = createClient();
  const router = useRouter();
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState<string>("");
  const [show, setShow] = useState(false);
  const [isCollapse, setIsCollapse] = useState(false); // State for collapse

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Function to get user data from Supabase
  const getUserData = useCallback(async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      // console.log(user);
      setUser_profile(user?.user_metadata?.avatar_url || "");
      setUser(user?.user_metadata?.email || ""); // Handle case where user or user_metadata might be undefined
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [supabase]);

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
  // Function to handle user logout
  const logout = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default anchor behavior
    try {
      localStorage.clear();
      await supabase.auth.signOut();
      setUser(null); // Clear user state on logout
      router.replace("/"); // Redirect to home page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Fetch user data on component mount
  useEffect(() => {
    getUserData();
  }, [getUserData]);

  const avatarStyle: React.CSSProperties = {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    overflow: "hidden",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0", // Optional background color
  };

  return (
    <div>
      <Navbar expand="lg" variant="light">
        <Container>
          <Navbar.Brand href="/" className="d-flex align-items-center my-4">
            <Image
              src="/images/Google_for_Developers_logomark_color.png"
              width={50}
              height={23}
              alt="logo"
            />
            <Col style={{ marginLeft: "8px" }}>
              <div>Thammasat University</div>
            </Col>
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
            className="bg-white text-black"
          >
            <Offcanvas.Header closeButton closeVariant="dark">
              <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg">
                Menu
              </Offcanvas.Title>
            </Offcanvas.Header>
            {isCollapse === false ? (
              <Offcanvas.Body>
                <Nav
                  className="justify-content-start align-items-end flex-grow-1 pe-3"
                  defaultActiveKey={currentPath}
                >
                  <Nav.Link
                    className="mx-3 home-navbar text-black"
                    href="/home"
                    active={currentPath === "/home"}
                    style={{ fontWeight: "bold" }}
                  >
                    Application Progress
                  </Nav.Link>
                </Nav>
                <Card className="me-4 px-4">
                    <b className="mr-3">{user}</b>
                </Card>
                <Button
                  href=""
                  onClick={logout}
                  variant="primary"
                  style={{ fontWeight: "bold" }}
                  className="d-block"
                >
                  logout
                </Button>
              </Offcanvas.Body>
            ) : (
              <Offcanvas.Body>
                <Nav
                  className="justify-content-start flex-grow-1"
                  defaultActiveKey={currentPath}
                >
                  <Nav.Link
                    className="mx-3 home-navbar text-black"
                    href="/"
                    active={currentPath === "/home"}
                  >
                    Home
                  </Nav.Link>
                </Nav>
                <Button
                  href=""
                  onClick={logout}
                  variant="primary"
                  style={{ position: "absolute", bottom: "2rem" }}
                >
                  logout
                </Button>
              </Offcanvas.Body>
            )}
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
    // <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary header">
    //   <Container>
    //     <Navbar.Brand href="/">
    //       <Image
    //         src="/images/TU-GDSC Logo chapter lockup template.png"
    //         alt="logo"
    //         width={260}
    //         height={33}
    //       />
    //     </Navbar.Brand>
    //     <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    //     <Navbar.Collapse id="responsive-navbar-nav">
    //       <Nav className="me-auto">
    //         <Nav.Link href="/home">Home</Nav.Link>
    //         <Nav.Link href="https://gdsctu-internal.vercel.app/home/guideline">
    //           Guideline
    //         </Nav.Link>
    //       </Nav>
    //       <Navbar.Text>
    //         {user ? (
    //           <>
    //             {"Signed in as " + user + " "}
    //             <a href="" onClick={logout}>
    //               Logout
    //             </a>
    //           </>
    //         ) : (
    //           "Loading..."
    //         )}
    //       </Navbar.Text>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
  );
};

export default Header;
