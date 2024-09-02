import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useState } from "react";

interface GDSCCalendarProps {
  data: Data[];
  link: string;
}

interface Data {
  full_name: string;
  user_email: string;
  object_id: string;
  applicationid: string;
  // Add other properties as needed
}

function GDSCCalendar(props: GDSCCalendarProps) {
  const { data, link } = props;
  const [calendarData, setCalendarData] = useState<Data | null>(null);

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

  useEffect(() => {
    if (data && data.length > 0) {
      console.log(data[0]);
      setCalendarData(data[0]);
      console.log(link);
    }
  }, [data, link]);

  return (
    <Cal
      calLink={link}
      style={{ width: "100%", overflow: "visible", msOverflowStyle: "none" }}
      config={{
        layout: "month_view",
        name: calendarData?.full_name as string,
        email: calendarData?.user_email as string,
        applicationid: calendarData?.applicationid as string,
        verifycode: calendarData?.object_id as string,
      }}
    />
  );
}

export default GDSCCalendar;
