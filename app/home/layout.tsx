import Header from "@/components/Header";
import React, { ReactNode } from "react";
import { Container } from "react-bootstrap";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
type LayoutProps = {
  children: ReactNode;
};

const Layout = async ({ children }: LayoutProps) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/");
  }

  return (
    <div>
      {/* Add your header component here */}
      <Header />

      {/* Render the children */}

      <Container>
        {children}
      </Container>

      {/* Add your footer component here */}
      <footer></footer>
    </div>
  );
};

export default Layout;
