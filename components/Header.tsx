"use client";
import React, { useState } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { createClient } from "@/utils/supabase/client";
import { useEffect } from "react";
import Image from "next/image";

const Header: React.FC = () => {
  const [user, setUser] = useState("" as string);
  const supabase = createClient();

  const getUserData = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user?.user_metadata.full_name);
  };

  const logout = async () => {
    await supabase.auth.signOut()
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="bg-body-tertiary mb-3 header"
    >
      <Container>
        <Navbar.Brand href="https://gdsc.community.dev/thammasat-university-bangkok-thailand/">
        <Image
            src="/images/TU-GDSC Logo chapter lockup template.png"
            alt="logo"
            width={280}
            height={35}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="https://gdsc.community.dev/thammasat-university-bangkok-thailand/">
              About us
            </Nav.Link>
            <Nav.Link href="https://gdsc.community.dev/thammasat-university-bangkok-thailand/">
              report problem
            </Nav.Link>
            {/* <Nav.Link href="#pricing">con</Nav.Link> */}
            {/* <NavDropdown title="Contact us" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">problem about website</NavDropdown.Item> */}
              {/* <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item> */}
            {/* </NavDropdown> */}
          </Nav>
          <Navbar.Text>
            {"signed in as "}
            {user + " "}
            <a href="" onClick={logout}>
              logout
            </a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
