"use client";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useState } from "react";
function GDSCCalendar(props: any) {
  interface Data {
    full_name: string;
    user_email: string;
    object_id: string;
    applicationid: string;
    // Add other properties as needed
  }
  
  const [data, setData] = useState<Data | null>(null);
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

  useEffect(()=> {
    console.log(props["data"][0]);
    setData(props["data"][0]);
  })


  return (   
      <Cal
        calLink="praphon.kha/gdsc.tu.interview"
        style={{ width: "100%" , overflow: "visible" , msOverflowStyle: "none"}}
        config={{
          layout: "month_view",
          name: data?.full_name as string,
          email: data?.user_email as string,
          applicationid: data?.applicationid as string,
          verifycode: data?.object_id as string,
        }}
      />
    
  );
}

export default GDSCCalendar;
