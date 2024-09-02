"use client"
// components/Footer.js
import CookieSettings from "@/components/CookieSettings";
import React, { useState } from "react";

const Footer = () => {
  const [showModal , setShowModal] = useState(false)
  return (
    <footer className="bg-dark text-white text-center text-lg-start">
      <CookieSettings showModal={showModal} setShowModal={setShowModal}/>
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase">About GDSC TU</h5>
            <p>
              Google Developer Student Clubs Thammasat University is a
              community-driven club for students interested in Google
              technologies.
            </p>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Quick Links</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <a
                  href="https://gdsc.community.dev/thammasat-university-bangkok-thailand/"
                  className="text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GDSC TU
                </a>
              </li>
              <li>
                <a
                  href="https://tu.ac.th/"
                  className="text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Thammasat University
                </a>
              </li>
              <li>
                <a
                  className="text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={()=> {setShowModal(true)}}
                >
                  Privacy Preference
                </a>
              </li>
              <li>
                <a
                  href="/privacy-policy"
                  className="text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-0">Contact Recruiting Team?</h5>

            <ul className="list-unstyled">
              <li>
                <h6>Internal Domain Only (@dome)</h6>
                <a className="text-white">
                gdsc.thammasat@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        Google Geveloper Student Clubs Thammasat University
         {/* Develop by{"     "}
        <a
          href="https://www.instagram.com/khon.pp/"
          className="text-white"
          target="_blank"
          rel="noopener noreferrer"
        >
          Praphon Khaosaard
        </a> */}
      </div>
    </footer>
  );
};

export default Footer;
