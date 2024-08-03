import "bootstrap/dist/css/bootstrap.min.css";
// import BootstrapClient from "@/utils/bootstrapclient";
import "@/utils/styles.css";
import "@/utils/custom.scss";
import HomepageHeader from "@/components/HomepageHeader";
import CookieConsent from "../../components/CookieConsent"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'GDSC@TU | About',
  description: 'GDSC@TU | About',
};

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HomepageHeader />
      {children}
      <CookieConsent/>
    </>
  );
}