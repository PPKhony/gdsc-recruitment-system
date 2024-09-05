import React, { ReactNode } from "react";
import { Container } from "react-bootstrap";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/utils/styles.css";
import "@/utils/custom.scss";
import { getCurrentTime } from "@/utils/getCurrentTime";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "GDSC@TU Waiting Page",
  description: "GDSC@TU Waiting Page",
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = async ({ children }) => {
  const currentDate = await getCurrentTime();

  // Define the target date and time
  const nowDate = new Date(currentDate)
  const targetDate = new Date("2024-09-05T18:00:00+07:00") //Thai time
  console.log(nowDate < targetDate);
  
  if (nowDate > targetDate) {
    return redirect("/home")
  } 

  return (
    <>
      <main>
        <div className="form-bg-01">
          <Container className=" pb-5" style={{ minHeight: "100vh" }}>
            {children}
          </Container>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
