"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import { Navbar, Nav, Container } from "react-bootstrap";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";

const Header: React.FC = () => {
  const [user, setUser] = useState<string | null>(null);
  const supabase = createClient();
  const router = useRouter(); // Initialize useRouter from next/navigation

  // Function to get user data from Supabase
  const getUserData = useCallback(async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user?.user_metadata?.full_name || ""); // Handle case where user or user_metadata might be undefined
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [supabase]);

  // Function to handle user logout
  const logout = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default anchor behavior
    try {
      localStorage.clear();
      await supabase.auth.signOut();
      setUser(null); // Clear user state on logout
      router.replace('/'); // Redirect to home page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Fetch user data on component mount
  useEffect(() => {
    getUserData();
  }, [getUserData]);

  return (
    <Navbar collapseOnSelect expand="lg"  className="bg-body-tertiary mb-3 header">
      <Container>
        <Navbar.Brand href="https://gdsc.community.dev/thammasat-university-bangkok-thailand/">
          <Image
            src="/images/TU-GDSC Logo chapter lockup template.png"
            alt="logo"
            width={260}
            height={33}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="https://gdsc.community.dev/thammasat-university-bangkok-thailand/">
              About us
            </Nav.Link> */}
            {/* <Nav.Link href="https://gdsc.community.dev/thammasat-university-bangkok-thailand/">
              Report problem
            </Nav.Link> */}
          </Nav>
          <Navbar.Text>
            {user ? (
              <>
                {"Signed in as " + user + " "}
                <a href="" onClick={logout}>
                  Logout
                </a>
              </>
            ) : (
              "Loading..."
            )}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
