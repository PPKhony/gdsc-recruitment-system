"use client";

import Link from "next/link";
import { getLocalStorage, setLocalStorage } from "@/utils/storageHelper";
import { useState, useEffect, useRef } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import Cookies from "js-cookie";
import CookieSettings from "./CookieSettings";
const CookieConsent = () => {
  const [cookieConsent, setCookieConsent] = useState(false);
  const [disable, setDisable] = useState(true);
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const isInitialRender = useRef(true);

   useEffect(() => {
    const fetchCookieConsent = async () => {
      const storedCookieConsent = await getLocalStorage("cookie_consent", null);
      setCookieConsent(storedCookieConsent);
    };
    fetchCookieConsent();
    setTimeout(()=>{
      if (!getLocalStorage("cookie_consent")) setDisable(false);
    }, 500)
  }, []);

  

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    } else {
      const updateConsent = async () => {
        const newValue = cookieConsent ? "granted" : "denied";
        await setLocalStorage("cookie_consent", cookieConsent);

        window.gtag("consent", "update", {
          analytics_storage: newValue,
          ad_user_data: newValue,
        });

        if (newValue === "denied") {
          deleteGACookies();
        }
      };

      updateConsent();
    }
  }, [cookieConsent]);

  const deleteGACookies = () => {
    const gaCookies = [
      "_ga",
      "_gat",
      "_gid",
      // Add any other GA cookies you want to delete
    ];

    gaCookies.forEach((cookieName) => {
      Cookies.remove(cookieName);
    });
  };

  return (
    <div>
      <div>
        <CookieSettings showModal={showModal} setShowModal={setShowModal} />
      </div>
      <div hidden={disable} style={styles.overlay}>
        <p>
          We use cookies to improve your experience on our site. By using our
          site, you consent to cookies. <a href="/privacy-policy">Learn more</a>
          .
        </p>
        <Row>
          <Col>
            <Button
              variant="outline-secondary"
              onClick={() => {
                setDisable(true);
                setShowModal(true);
              }}
            >
              Settings
            </Button>
          </Col>
          <Col>
            <Button
              onClick={() => {
                setCookieConsent(true);
                setDisable(true);
              }}
            >
              Accept
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: "20px",
    boxShadow: "0 -2px 5px rgba(0,0,0,0.1)",
    zIndex: 1000,
    alignItems: "center",
  },
};

export default CookieConsent;
