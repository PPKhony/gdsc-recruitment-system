import Header from "@/components/Header";
import React, { ReactNode } from "react";
import { Container } from "react-bootstrap";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Footer from "@/components/Footer";

type LayoutProps = {
  children: ReactNode;
};

const Layout = async ({ children }: LayoutProps) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div>
      {/* Add your header component here */}
      <Header />

      {/* Render the children */}
      <div className="form-bg-01">
        <Container className="pt-3 pb-5" style={{ minHeight: "100vh" }}>
          {children}
        </Container>
      </div>

      {/* Add your footer component here */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
