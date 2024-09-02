import React from "react";
import ReactMarkdown from "react-markdown";
import path from "path";
import remarkGfm from "remark-gfm";
import { promises as fs } from "fs";
import { Container } from "react-bootstrap";
import Footer from "@/components/Footer";
import style from './markdown-styles.module.css';

export default async function PrivacyPolicy() {
  const file = await fs.readFile(
    process.cwd() + "/app/PrivacyPolicy.txt",
    "utf8"
  );
  return (
    <div>
      <div className="header-03 privacy-policy">
        <Container style={{ color: "white"  }}>
          <div style={{ position: "absolute", bottom: "3rem" }}>
            <h1 style={{ fontSize: "3.5rem" }}>Privacy Policy</h1>
          </div>
        </Container>
      </div>
      <Container style={{maxWidth:"800px"}}>
        <ReactMarkdown remarkPlugins={[remarkGfm]} className={style.reactMarkDown}  >
          {file}
        </ReactMarkdown>
      </Container>
      <Footer/>
    </div>
  );
}
