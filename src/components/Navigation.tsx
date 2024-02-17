"use client";

import Link from "next/link";
import type { Session } from "@supabase/auth-helpers-nextjs";
import useStore from "../../store";
import { useEffect } from "react";
import { Database } from "../../lib/supabase";
import Image from "next/image";
type profileType = Database["public"]["Tables"]["profiles"]["Row"];

// ナビゲーション
const Navigation = ({
  session,
  profile,
}: {
  session: Session | null;
  profile: profileType | null;
}) => {
  // プロフィール情報を状態管理に格納する(session、setUser、profileのいずれかが変更されたときに副作用を実行)
  const { setUser } = useStore();
  useEffect(() => {
    setUser({
      id: session ? session.user.id : "",
      email: session ? session.user.email! : "",
      name: session && profile ? profile.name : "",
      introduce: session && profile ? profile.introduce : "",
      avatar_url: session && profile ? profile.avatar_url : "",
    });
  }, [session, setUser, profile]);

  return (
    <header className="px-5 font-bold shadow-navbarShadow bg-bodyColor bg-opacity-80 backdrop-blur-lg w-screen">
      <div className="py-5 container max-w-screen-sm mx-auto flex  justify-between items-center ">
        <Link
          href="/"
          className="font-bold text-2xl cursor-pointer  text-textGreen"
        >
          Next Supabase Auth
        </Link>

        <div className="text-sm font-bold">
          {/* セッションが存在する場合はプロフィール画面を表示ない場合はログイン・サインアップ画面を表示 */}
          {session ? (
            <div className="flex items-center space-x-5">
              <Link href="/settings/profile">
                <div className="relative w-10 h-10">
                  <Image
                    src={
                      profile && profile.avatar_url
                        ? profile.avatar_url
                        : "/images/default.png"
                    }
                    className=" rounded-full object-cover"
                    alt="avatar"
                    fill
                  />
                </div>
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-5">
              <Link href="/auth/login">
                <button
                  type="submit"
                  className=" font-bold w-full bg-green-500 p-4 rounded-md text-white hover:scale-95 hover:bg-green-400  transition-all"
                >
                  ログイン
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navigation;
