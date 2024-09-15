import React, { ReactNode } from "react";
import { Container } from "react-bootstrap";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/utils/styles.css";
import "@/utils/custom.scss";
import { getCurrentTime } from "@/utils/getCurrentTime";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Head from "next/head";

export const metadata: Metadata = {
  title: "GDSC@TU Accept Invited",
  description: "GDSC@TU Accept Invited",
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = async ({ children }) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/login");
  }

  return (
    <>
      <main style={{ minHeight: "100dvh" }}>{children}</main>
    </>
  );
};

export default RootLayout;
