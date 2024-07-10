"use client";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
function GDSCCalendar(props: any) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({});
      cal("ui", {
        styles: { branding: { brandColor: "#000000" } },
        hideEventTypeDetails: false,
        layout: "week_view",
      });
    })();
  }, []);
  return (
    <>
      <Cal
        calLink="praphon.kha/gdsc.tu.interview"
        style={{ width: "100%", height: "100%", overflow: "scroll" }}
        config={{
          layout: "week_view",
          email: `${props.data.email}`,
          name: `${props.data.user_metadata.full_name}`,
          CandidateID: `${props.data.id}`
        }}
      />
      ;
    </>
  );
}

export default GDSCCalendar;
