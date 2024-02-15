import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import AuthComponent from "@/components/AuthComponent";
import type { Database } from "../../../../lib/supabase";

const SignupPage = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/");
  }

  return <AuthComponent />;
};

export default SignupPage;
