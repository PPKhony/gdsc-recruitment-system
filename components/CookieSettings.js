"use client"
import React, { useEffect, useRef, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Cookies from "js-cookie";
import { setConsentMode } from "@/utils/GoogleTagManager/gtm";
import { getLocalStorage , setLocalStorage } from "@/utils/GoogleTagManager/storageHelper";

function CookieSettings({ showModal, setShowModal }) {
  const [cookieConsent, setCookieConsent] = useState(false);
  const isInitialRender = useRef(true);

  useEffect(() => {
    const storedCookieConsent = getLocalStorage("cookie_consent", null);
    setCookieConsent(storedCookieConsent);
  }, [setCookieConsent]);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    const newValue = cookieConsent ? "granted" : "denied";
    setLocalStorage("cookie_consent", cookieConsent);
    setConsentMode(newValue, "denied");

  }, [cookieConsent]);


  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>ตั้งค่าความเป็นส่วนตัว</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <h5>คุกกี้ที่จำเป็น</h5>
          <p>
            คุกกี้ที่จำเป็นสำหรับการทำงานของเว็บไซต์
            เพื่อให้คุณสามารถใช้ได้อย่างเป็นปกติ และเข้าชมเว็บไซต์
            คุณไม่สามารถปิดการทำงานของคุกกี้นี้ในระบบเว็บไซต์ของเราได้
          </p>
          <Form.Check
            type="switch"
            id="necessary-cookies"
            label="เปิดใช้งานตลอดเวลา"
            checked={true}
            disabled
          />
        </div>
        <div className="mb-3">
          <h5>คุกกี้เพื่อการวิเคราะห์</h5>
          <p>
            คุกกี้เหล่านี้จะทำการเก็บข้อมูลการใช้งานเว็บไซต์ของคุณ
            เพื่อเป็นประโยชน์ในการวัดผล
            ปรับปรุงและพัฒนาประสบการณ์ที่ดีในการใช้งานเว็บไซต์
            หากท่านไม่ยอมรับจะไม่ทำให้คุกกี้นี้ทำงาน และจะไม่สามารถวัดผล
            ปรับปรุงและพัฒนาเว็บไซต์ได้
          </p>
          <Form.Check
            type="switch"
            id="analytics-cookies"
            label="คุกกี้เพื่อใช้สำหรับวิเคราะห์"
            defaultChecked={cookieConsent}
            onChange={() => setCookieConsent(!cookieConsent)}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => setShowModal(false)}>
          ยืนยัน
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CookieSettings;
