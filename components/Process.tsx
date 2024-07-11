"use client";
import { Breadcrumb, Nav } from "react-bootstrap";

function Process() {
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item active>1.Pre-Screen Round</Breadcrumb.Item>
        <Breadcrumb.Item >
          2.Interview Session
        </Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
}

export default Process;
