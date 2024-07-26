"use client"
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Row
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
  },
];

function PositionOpening() {
  return (
    <Row xs={1} md={2}>
      {applicantopening.map((opening, index) => (
        <Col key={index}>
          <Card key={index}>
            <CardHeader className="p-4">
              <h5 style={{ lineHeight: "1.5" }}>
                <b>{opening.title}</b>
              </h5>
              <div className="d-flex">
                <i className="bi bi-building"> {opening.description}</i>
              </div>
            </CardHeader>
            <CardBody className="px-4">
              <b>Qualification</b>
              <ul>
                {opening.qualification.map((qual, index) => (
                  <li key={index}>{qual}</li>
                ))}
              </ul>
            </CardBody>
            <CardFooter className="px-4">
              <Button href={opening.buttonHref}>Apply</Button>
            </CardFooter>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default PositionOpening;
