"use client";
import { Breadcrumb, Nav } from "react-bootstrap";

function Process() {
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item active>1.Pre-Screen Round</Breadcrumb.Item>
        <Breadcrumb.Item href="/home/interview">
          2.Interview Session
        </Breadcrumb.Item>
        <Breadcrumb.Item >
          3.Final Decision
        </Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
}

export default Process;
