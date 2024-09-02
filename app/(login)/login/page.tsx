import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Card, CardBody, CardHeader, Container } from "react-bootstrap";
import Image from "next/image";

function LoginPage() {
  const googleContinue = async () => {
    "use server";

    const supabase = createClient();
    const origin = headers().get("origin");
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });
    if (data.url) {
      redirect(data.url); // use the redirect API for your server framework
    }
    // redirect("/");
  };

  return (
    <div className="form-bg-login">
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="card">
          <div className="card-body m-4">
            <Image
              src="/images/Google_for_Developers_logomark_color.png"
              height="33"
              width="70"
              alt="logo"
              className="mb-4"
            />
            <h5 className="card-title">Internal Login Portal</h5>
            <h6>Google Developer Student Clubs</h6>
            <p>with @dome.tu.ac.th email only</p>
            <hr />
            <form>
              <div className="d-flexbox justify-content-center">
                <button
                  className="btn btn-primary btn-large centerButton"
                  formAction={googleContinue}
                >
                  <i className="bi bi-google"> </i>Continue with @dome email
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default LoginPage;
