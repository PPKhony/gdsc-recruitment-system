import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Card, Container } from "react-bootstrap";

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
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Card>
        <form>
          <button
            className="btn btn-primary btn-large centerButton"
            formAction={googleContinue}
          >
            Login with google
          </button>
        </form>
      </Card>
    </Container>
  );
}

export default LoginPage;
