import GDSCCalendar from "@/components/GDSCInterview";
import Process from "@/components/Process";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Alert, Col, Container, Row } from "react-bootstrap";

async function AuthorizePage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <Process/>
      <h1 className="my-3">Pre Screen Round</h1>
      Success Submit
    </div>
  );
}

export default AuthorizePage;
