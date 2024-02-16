"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "../../lib/supabase";
import Navigation from "./Navigation";

// 認証状態の監視
const SupabaseListener = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });

  // セッションの取得
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // プロフィールの取得
  let profile = null;
  if (session) {
    const { data: currentProfile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();

    profile = currentProfile;

    // メールアドレスヲ変更した場合プロフィールの更新を行う
    if (currentProfile && currentProfile.email !== session.user.email) {
      // メールアドレスの更新
      const { data: updateProfile } = await supabase
        .from("profiles")
        .update({ email: session.user.email })
        .match({ id: session.user.id })
        .select("*")
        .single();
      profile = updateProfile;
    }
  }

  return <Navigation session={session} profile={profile} />;
};

export default SupabaseListener;
