import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "../../lib/supabase";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });
  // session情報の取得
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className=" w-screen  h-full ">
      <div className=" text-sm text-center">
        {session ? <div>ログイン済み</div> : <div>未ログイン</div>}
      </div>
    </div>
  );
}
