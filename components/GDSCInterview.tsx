"use client";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
function GDSCCalendar(props: any) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({});
      cal("ui", {
        theme: "light",
        styles: { branding: { brandColor: "#000000" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);
  return (
    <Cal
      calLink="https://cal.com/d/dbkzpd5dWmrRV6pvghnoUm/gdsc.tu.interview"
      style={{ width: "100%", overflow: "visible", msOverflowStyle: "none" }}
      config={{
        layout: "month_view",
        email: `${props.data.email}`,
        name: `${props.data.user_metadata.full_name}`,
        CandidateID: `${props.data.id}`,
      }}
    />
  );
}

export default GDSCCalendar;
