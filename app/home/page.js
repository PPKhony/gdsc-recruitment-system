import { redirect } from "next/navigation";
import { Col, Row } from "react-bootstrap";
import { createClient } from "@/utils/supabase/server";
import ApplicationMember from "./ApplicationMember";

function Application() {
  const submitApplication = async (formData) => {
    "use server";
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    const rawFormData = {
      thainame: formData.get("ThaiName"),
      englishname: formData.get("EnglishName"),
      nickname: formData.get("Nickname"),
      department: formData.get("Department"),
      studentid: formData.get("StudentID"),
      personalemail: formData.get("PersonalEmail"),
      universityemail: user.email,
      phonenumber: formData.get("PhoneNumber"),
      github: formData.get("GitHub"),
      linkedin: formData.get("LinkedIn"),
      googledeveloper: formData.get("GoogleDeveloper"),
      year: formData.get("year"),
      faculty: formData.get("faculty"),
      gender: formData.get("gender"),
      issubmit: true,
      lasted_datetime: new Date().toISOString()
    };
    console.log(rawFormData);

    const { error } = await supabase
      .from("applicants")
      .upsert(rawFormData)
      
    if (error) console.log(error);
    if (!error) redirect("/home/success");
  };

  return (
    <div>
      <ApplicationMember submitApplication={submitApplication} />
    </div>
  );
}

export default Application;
