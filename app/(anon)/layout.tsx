import "bootstrap/dist/css/bootstrap.min.css";
// import BootstrapClient from "@/utils/bootstrapclient";
import "@/utils/styles.css";
import "@/utils/custom.scss";
import HomepageHeader from "@/components/HomepageHeader";
import CookieConsent from "../../components/CookieConsent"

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HomepageHeader />
      {children}
      <CookieConsent/>
    </>
  );
}