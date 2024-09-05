"use client";

import Footer from "@/components/Footer";
import PositionOpening from "@/components/PositionOpening";
import { useRouter } from "next/navigation";
import { Button, Container, Row, Col, Image, Card } from "react-bootstrap";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import React from "react";
import CloseApplication from "@/components/CloseApplication";

export default function Home() {
  const router = useRouter();
  const handleLoginClick = () => {
    router.push("/login");
  };

  // Control animations on scroll
  const controls1 = useAnimation();
  const controls2 = useAnimation();
  const controls3 = useAnimation();
  const controls4 = useAnimation();
  const controls5 = useAnimation();
  const controls6 = useAnimation();

  const [ref1, inView1] = useInView({ triggerOnce: true });
  const [ref2, inView2] = useInView({ triggerOnce: true });
  const [ref3, inView3] = useInView({ triggerOnce: true });
  const [ref4, inView4] = useInView({ triggerOnce: true });
  const [ref5, inView5] = useInView({ triggerOnce: true });
  const [ref6, inView6] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView1) {
      controls1.start("visible");
    }
    if (inView2) {
      controls2.start("visible");
    }
    if (inView3) {
      controls3.start("visible");
    }
    if (inView6) {
      controls6.start("visible");
    }
    if (inView4) {
      controls4.start("visible");
    }
    if (inView5) {
      controls5.start("visible");
    }
  }, [
    controls1,
    controls2,
    controls3,
    controls4,
    controls5,
    controls6,
    inView1,
    inView2,
    inView3,
    inView4,
    inView5,
    inView6,
  ]);

  return (
    <div>
      <div className="header-01">
        <Container style={{ color: "white" }}>
          <motion.div
            style={{ position: "absolute", bottom: "1rem" }}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div>
              <h1 style={{ fontSize: "3.5rem" }}>Growth with </h1>
              <h2 style={{ fontSize: "1.5rem" }}>GDSC at Thammasat</h2>
            </div>
            <br />
          </motion.div>
        </Container>
      </div>
      <div
        style={{ backgroundColor: "#f1f3f4", minHeight: "30vh", zIndex: "-10" }}
      >
        <Container>
          <br />
          <Row xs={1} lg={2} className="py-5">
            <Col ref={ref1} className="d-flex py-3 align-items-center">
              <motion.div
                initial="hidden"
                animate={controls1}
                variants={{
                  hidden: { opacity: 0, y: 100 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5 },
                  },
                }}
              >
                <h1 style={{ fontSize: "3.6rem", color: "#fbbc04" }}>
                  Empowering Tech Students{" "}
                </h1>
                <h2 color="#404040" style={{ marginBottom: "1.5rem" }}>
                  AT GDSC@TU
                </h2>
                <p>
                  Google Development Student Club (Thammasat University Chapter)
                  คือ ชุมชนของนักศึกษามหาวิทยาลัยธรรมศาสตร์ผู้หลงใหลในเทคโนโลยี
                  ไม่ว่าคุณจะอยู่ปีไหน มีประสบการณ์มากน้อยแค่ไหน
                  ที่นี่เปิดรับทุกความมุ่งมั่น พร้อมผลักดันให้คุณ เรียนรู้
                  เชื่อมต่อ และ เติบโต ไปพร้อมกับโลกเทคโนโลยีที่ไม่หยุดนิ่ง
                </p>

                {/* <Button
                  className="animated-button mt-4"
                  onClick={handleLoginClick}
                  style={{ fontWeight: "bold" }}
                >
                  <span>Apply Club</span>
                </Button> */}
              </motion.div>
            </Col>
            <Col ref={ref1} className="d-flex align-items-center">
              <div
                style={{
                  height: "100%",
                  width: "100%",
                }}
              >
                <motion.div
                  initial="hidden"
                  animate={controls1}
                  variants={{
                    hidden: { opacity: 0, y: 100 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5 },
                    },
                  }}
                >
                  <Image
                    src="/images/ad_1.png"
                    style={{ objectFit: "fill", height: "100%", width: "100%" }}
                  />
                </motion.div>
              </div>
            </Col>
          </Row>
        </Container>
        <div style={{ backgroundColor: "#ffffff", width: "100%" }}>
          <Container className="py-5">
            <motion.div
              initial="hidden"
              animate={controls2}
              variants={{
                hidden: { opacity: 0, y: 100 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5 },
                },
              }}
            >
              <h1>Key activity</h1>
              <Row xs={1} sm={1} md={3} ref={ref2}>
                <Col className="my-3">
                  <Container
                    className="p-4"
                    style={{ backgroundColor: "#FFECB3", borderRadius: "25px" }}
                  >
                    <div className="d-flex ">
                      <h5>
                        {" "}
                        <i
                          className="bi bi-person-vcard"
                          style={{ marginRight: "7px" }}
                        />
                        Connect
                      </h5>
                    </div>
                    <p>
                      Meet students interested in developer technologies at your
                      college or university. All are welcome, including those
                      with diverse backgrounds and different majors.
                    </p>
                  </Container>
                </Col>
                <Col className="my-3">
                  <Container
                    className="p-4"
                    style={{ backgroundColor: "#FFECB3", borderRadius: "25px" }}
                  >
                    <div className="d-flex">
                      <h5>
                        {" "}
                        <i
                          className="bi bi-backpack2"
                          style={{ marginRight: "7px" }}
                        />
                        Learn
                      </h5>
                    </div>
                    <p>
                      Learn about a range of technical topics and gain new
                      skills through hands-on workshops, events, talks, and
                      project-building activities online and in-person.
                    </p>
                  </Container>
                </Col>
                <Col className="my-3">
                  <Container
                    className="p-4"
                    style={{ backgroundColor: "#FFECB3", borderRadius: "25px" }}
                  >
                    <div className="d-flex">
                      <h5>
                        {" "}
                        <i
                          className="bi bi-person-vcard"
                          style={{ marginRight: "7px" }}
                        />
                        Grow
                      </h5>
                    </div>
                    <p>
                      Apply new learnings to build great solutions for local
                      problems. Advance your skills, career, and network. Give
                      back to your community by helping others learn.
                    </p>
                  </Container>
                </Col>
              </Row>
            </motion.div>
          </Container>
        </div>
        <div className="bg-1">
          <Container>
            <Row
              xs={1}
              lg={2}
              ref={ref3}
              style={{ paddingTop: "1rem", paddingBottom: "6rem" }}
            >
              <Col
                className="d-md-flex align-items-center justify-content-center"
                xl={8}
              >
                <motion.div
                  initial="hidden"
                  animate={controls3}
                  variants={{
                    hidden: { opacity: 0, y: 100 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5 },
                    },
                  }}
                >
                  <motion.div
                    animate={{
                      y: [0, -10, 0], // Moves up by 10px, then back to the original position
                    }}
                    transition={{
                      duration: 2, // Duration of one complete cycle (up and down)
                      repeat: Infinity, // Repeat the animation indefinitely
                      repeatType: "loop", // Type of repetition
                      ease: "easeInOut", // Easing function for a smooth effect
                    }}
                  >
                    <Image
                      src="/images/Elem_1.png"
                      style={{
                        objectFit: "scale-down",
                        height: "8rem",
                        width: "100%",
                      }}
                    />
                  </motion.div>
                  <div className="img-corevalue0-dropshadow">
                    <Image
                      src="/images/corevalue-0.png"
                      style={{
                        objectFit: "scale-down",
                        height: "25rem",
                        width: "100%",
                      }}
                      className="img-corevalue-content"
                    />
                  </div>
                </motion.div>
              </Col>
              <Col ref={ref3} className="d-flex align-items-center py-3" xl={4}>
                <motion.div
                  initial="hidden"
                  animate={controls3}
                  variants={{
                    hidden: { opacity: 0, y: 100 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5 },
                    },
                  }}
                >
                  <div style={{ textAlign: "right" }}>
                    <h1 style={{ fontSize: "3.8rem", color: "#4285f4" }}>
                      #Inclusivity{" "}
                    </h1>
                    <h2 color="#404040">Learn from each other. </h2>
                    <hr />
                    <p>
                      ที่ GDSC TU เราเชื่อมั่นในพลังของมุมมองที่หลากหลาย
                      เราพยายามอย่างยิ่งที่จะสร้างสภาพแวดล้อมที่อบอุ่นซึ่งทุกคนรู้สึกสะดวกสบายในการเรียนรู้และมีส่วนร่วม
                      โดยไม่คำนึงถึงภูมิหลังหรือประสบการณ์
                      ความครอบคลุมเป็นหัวใจสำคัญในทุกสิ่งที่เราทำ
                      และเรามุ่งมั่นที่จะส่งเสริมพื้นที่ที่ได้ยินและให้คุณค่ากับทุกเสียง
                    </p>
                    <motion.div
                      className="d-none d-md-inline-block"
                      animate={{
                        y: [0, -10, 0], // Moves up by 10px, then back to the original position
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        y: {
                          stiffness: 50, // Adjusts the stiffness of the spring
                          damping: 10, // Adjusts the damping of the spring
                          duration: 2, // Duration of one complete cycle (up and down)
                          repeat: Infinity, // Repeat the animation indefinitely
                          repeatType: "loop", // Type of repetition
                        },
                        rotate: {
                          duration: 2, // Duration of one complete cycle (right and left)
                          repeat: Infinity, // Repeat the animation indefinitely
                          repeatType: "loop", // Type of repetition
                          ease: "easeInOut", // Easing function for a smooth effect
                        },
                      }}
                    >
                      <Image
                        src="/images/Elem_3.png"
                        style={{
                          width: "100%",
                          objectFit: "scale-down",
                          height: "15rem",
                        }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </Col>
            </Row>
            <Row
              xs={1}
              lg={2}
              style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
              ref={ref4}
            >
              <Col className="d-flex py-3" xl={4}>
                <motion.div
                  initial="hidden"
                  animate={controls4}
                  variants={{
                    hidden: { opacity: 0, y: 100 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5 },
                    },
                  }}
                >
                  <h1 style={{ fontSize: "3.8rem", color: "#fbbc04" }}>
                    #Growth mindset{" "}
                  </h1>
                  <h2 color="#404040">Learn from each other. </h2>
                  <hr />
                  <p>
                    ที่ GDSC TU เราสนับสนุนการเรียนรู้อย่างต่อเนื่องและ ค้นหา
                    และทดลองทดลองสิ่งต่างๆ
                    ยอมรับความท้าทายเป็นโอกาสในการพัฒนาทักษะใหม่
                    ๆในด้านเทคโนโลยี
                  </p>
                </motion.div>
              </Col>
              <Col
                className="d-md-flex align-items-center justify-content-center"
                xl={8}
              >
                <motion.div
                  initial="hidden"
                  animate={controls4}
                  variants={{
                    hidden: { opacity: 0, y: 100 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5 },
                    },
                  }}
                >
                  <div className="img-corevalue1-dropshadow">
                    <Image
                      src="/images/corevalue-1.png"
                      style={{
                        objectFit: "scale-down",
                        height: "35rem",
                        width: "100%",
                      }}
                      alt="Core Value"
                      className="img-corevalue-content"
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <motion.div
                      animate={{
                        y: [0, -10, 0], // Moves up by 10px, then back to the original position
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        y: {
                          stiffness: 50, // Adjusts the stiffness of the spring
                          damping: 10, // Adjusts the damping of the spring
                          duration: 2, // Duration of one complete cycle (up and down)
                          repeat: Infinity, // Repeat the animation indefinitely
                          repeatType: "loop", // Type of repetition
                        },
                        rotate: {
                          duration: 2, // Duration of one complete cycle (right and left)
                          repeat: Infinity, // Repeat the animation indefinitely
                          repeatType: "loop", // Type of repetition
                          ease: "easeInOut", // Easing function for a smooth effect
                        },
                      }}
                      style={{
                        display: "inline-block",
                      }}
                    >
                      <Image
                        src="/images/Elem_2.png"
                        style={{
                          objectFit: "scale-down",
                          height: "6rem",
                          top: "0px",
                          left: "0px",
                        }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="bg-2">
          <Container>
            <Row
              xs={1}
              lg={2}
              style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
              ref={ref5}
            >
              <Col
                className="d-md-flex align-items-center justify-content-center"
                xl={8}
              >
                <motion.div
                  initial="hidden"
                  animate={controls5}
                  variants={{
                    hidden: { opacity: 0, y: 100 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5 },
                    },
                  }}
                >
                  <motion.div
                    animate={{
                      y: [0, -10, 0], // Moves up by 10px, then back to the original position
                    }}
                    transition={{
                      duration: 2, // Duration of one complete cycle (up and down)
                      repeat: Infinity, // Repeat the animation indefinitely
                      repeatType: "loop", // Type of repetition
                      ease: "easeInOut", // Easing function for a smooth effect
                    }}
                  >
                    <Image
                      src="/images/Elem_1.png"
                      style={{
                        objectFit: "scale-down",
                        height: "8rem",
                        width: "100%",
                      }}
                    />
                  </motion.div>
                  <div className="img-corevalue0-dropshadow">
                    <Image
                      src="/images/corevalue-2.png"
                      style={{
                        objectFit: "scale-down",
                        height: "25rem",
                        width: "100%",
                      }}
                      className="img-corevalue-content"
                    />
                  </div>
                </motion.div>
              </Col>
              <Col className="d-flex align-items-center py-3" xl={4}>
                <motion.div
                  initial="hidden"
                  animate={controls5}
                  variants={{
                    hidden: { opacity: 0, y: 100 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5 },
                    },
                  }}
                >
                  <div style={{ textAlign: "right" }}>
                    <h1 style={{ fontSize: "3rem", color: "#0f9d58" }}>
                      #Collaboration{" "}
                    </h1>
                    <h2 color="#404040">Learn from each other. </h2>
                    <hr />
                    <p>
                      ที่ GDSC TU
                      เราส่งเสริมความรู้สึกของชุมชนที่แข็งแกร่งโดยการส่งเสริมการทำงานเป็นทีม
                      การแบ่งปันความรู้ และการให้คำปรึกษา
                      เพราะเราเชื่อว่าเราสามารถบรรลุเป้าหมายได้มากขึ้นเมื่อร่วมมือกัน
                    </p>
                  </div>
                </motion.div>
              </Col>
            </Row>
            <Row
              xs={1}
              lg={2}
              style={{ paddingTop: "1rem", paddingBottom: "6rem" }}
              ref={ref6}
            >
              <Col className="d-flex py-3" xl={4}>
                <motion.div
                  initial="hidden"
                  animate={controls6}
                  variants={{
                    hidden: { opacity: 0, y: 100 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5 },
                    },
                  }}
                >
                  <h1 style={{ fontSize: "3.8rem", color: "#e84435" }}>
                    #Impact{" "}
                  </h1>
                  <h2 color="#404040">Learn from each other. </h2>
                  <hr />
                  <p>
                    ที่ GDSC TU
                    เรามุ่งมั่นที่จะสร้างความแปลกใหม่โดยการประยุกต์ใช้ทักษะทางเทคนิคของเราเพื่อแก้ปัญหาในชีวิตประจำวัน
                    และเสริมพลังให้ผู้อื่นผ่านการแบ่งปันความรู้
                    ตอบแทนชุมชนของเรา
                  </p>
                </motion.div>
              </Col>
              <Col
                ref={ref6}
                className="d-md-flex align-items-center justify-content-center"
                xl={8}
              >
                <motion.div
                  initial="hidden"
                  animate={controls6}
                  variants={{
                    hidden: { opacity: 0, y: 100 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5 },
                    },
                  }}
                >
                  <div className="img-corevalue1-dropshadow">
                    <Image
                      src="/images/corevalue-3.png"
                      style={{
                        objectFit: "scale-down",
                        height: "30rem",
                        width: "100%",
                      }}
                      alt="Core Value"
                      className="img-corevalue-content"
                    />
                  </div>
                </motion.div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <div className="header-02 py-4">
        <Container>
          <div>
            <br />
            <h1 style={{ color: "white" }}>Position Opening</h1>
            <h5 style={{ color: "white" }}>Academic Year 2567 </h5>
            <br />
          </div>
         <CloseApplication/>
          {/* <PositionOpening /> */}
        </Container>
      </div>
      <Footer />
    </div>
  );
}
