// components/Footer.js
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center text-lg-start">
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
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-0">Contact Recruiting Team?</h5>

            <ul className="list-unstyled">
              <li>
                <h6>Internal Domain Only (@dome)</h6>
                <a className="text-white">
                gdsctu.hr-team@dome.tu.ac.th
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
        © {new Date().getFullYear()} Copyright: Google Development Student Clubs
        (Thammasat University) | Develop by{"    "}
        <a
          href="https://www.instagram.com/khon.pp/"
          className="text-white"
          target="_blank"
          rel="noopener noreferrer"
        >
          Praphon Khaosaard
        </a>
      </div>
    </footer>
  );
};

export default Footer;
