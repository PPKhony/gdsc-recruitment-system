"use client";
import React, { useState } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { createClient} from "@/utils/supabase/client";
import { useEffect } from "react";

const Header: React.FC = () => {
  // const [user, setUser] = useState({} as any);
  // const supabase = createClient();

  // const getUserData = async () => {
  //   const {
  //     data: { user },
  //   } = await supabase.auth.getUser()
  //   await setUser(user)
  // }
  
  // useEffect(()=> {
  //   getUserData()
  // })
  
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary mb-3">
      <Container>
        <Navbar.Brand href="https://gdsc.community.dev/thammasat-university-bangkok-thailand/">GDSC Thammasat 2024</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="https://gdsc.community.dev/thammasat-university-bangkok-thailand/">About us</Nav.Link>
            {/* <Nav.Link href="#pricing">Contact us</Nav.Link> */}
            {/* <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Nav>
              {/* {user.user_metadata.name? "Login as " + user.user_metadata.name : ""} */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
