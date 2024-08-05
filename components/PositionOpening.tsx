"use client";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Row,
} from "react-bootstrap";
const applicantopening = [
  {
    title: "Technical Core Team 2024-2025",
    description: "Google Developer Student Clubs @Thammasat University",
    qualification: [
      "Application open untils 31/08/2567 23.59 GMT+07",
      "Currently study at Thammasat University. any years of study",
    ],
    buttonHref: "/home/technicalcoreteam",
    due: new Date("August 31, 2567 23:59:59"),
    src: "/images/banner (1).jpg",
  },
  {
    title: "Creative Core Team 2024-2025",
    description: "Google Developer Student Clubs @Thammasat University",
    qualification: [
      "Application open untils 31/08/2567 23.59 GMT+07",
      "Currently study at Thammasat University. any years of study",
    ],
    buttonHref: "/home/creativecoreteam",
    due: new Date("August 31, 2567 23:59:59"),
    src: "/images/banner (2).jpg",
  },
  {
    title: "Event Core Team 2024-2025",
    description: "Google Developer Student Clubs @Thammasat University",
    qualification: [
      "Application open untils 31/08/2567 23.59 GMT+07",
      "Currently study at Thammasat University. any years of study",
    ],
    buttonHref: "/home/eventcoreteam",
    due: new Date("August 31, 2567 23:59:59"),
    src: "/images/banner (3).jpg",
  },
];

function PositionOpening() {
  return (
    <Row xs={1} md={3}>
      {applicantopening.map((opening, index) => (
        <Col key={index} className="pb-3">
          <Card key={index}>
            <Card.Img
              variant="top"
              src={opening.src}
              style={{
                objectFit: "cover",
                objectPosition: "center",
                height: "10rem",
              }}
            />

            <CardHeader className="p-3">
              <h5 style={{ lineHeight: "1.5" }}>
                <b>{opening.title}</b>
              </h5>
              <div className="d-flex">
                <i className="bi bi-building"> {opening.description}</i>
              </div>
            </CardHeader>
            <CardBody className="px-2">
              <b>Qualification</b>
              <ul>
                {opening.qualification.map((qual, index) => (
                  <li key={index}>{qual}</li>
                ))}
              </ul>
            </CardBody>
            <CardFooter className="px-2">
              <Button href={opening.buttonHref}>Apply</Button>
            </CardFooter>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default PositionOpening;
