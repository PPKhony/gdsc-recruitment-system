import GDSCCalendar from "@/components/GDSCInterview";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

async function AuthorizePage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // console.log({ user });
  if (!user) {
    return redirect("/login");
  }
  return <>
  <GDSCCalendar data={user}/>
  </>;
}

export default AuthorizePage;
