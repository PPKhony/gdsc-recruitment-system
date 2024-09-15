import React, { ReactNode } from "react";
import { Container } from "react-bootstrap";
import Header from "@/components/RecrutementHeader";
import Footer from "@/components/Footer";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/utils/styles.css";
import "@/utils/custom.scss";
import { getCurrentTime } from "@/utils/getCurrentTime";

export const metadata: Metadata = {
  title: "GDSC@TU Member Register System",
  description: "GDSC@TU Member Register System",
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = async ({ children }) => {
  "use server"
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const currentDate = await getCurrentTime();

  // Define the target date and time
  const nowDate = new Date(currentDate)
  const targetDate = new Date("2024-09-16T18:00:00+07:00") //Thai time
  
  if (nowDate < targetDate && user.email !== "praphon.kha@dome.tu.ac.th") {
    // Redirect to /waiting if the current time is before the target date
    return redirect("/waiting");
  }

  return (
    <>
      <Header />
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
