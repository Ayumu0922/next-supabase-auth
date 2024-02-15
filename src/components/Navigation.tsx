"use client";

import Link from "next/link";
import type { Session } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";

// ナビゲーション
const Navigation = ({ session }: { session: Session | null }) => {
  return (
    <header className=" font-bold text-white  border-b-2">
      <div className="py-5 container max-w-screen-sm mx-auto flex items-center justify-between">
        <Link href="/" className="font-bold text-xl cursor-pointer">
          Next Supabase Auth
        </Link>

        <div className="text-sm font-bold">
          {/* セッションが存在する場合はプロフィール画面を表示ない場合はログイン・サインアップ画面を表示 */}
          {session ? (
            <div className="flex items-center space-x-5">
              <Link href="/settings/profile">
                <div className="relative w-10 h-10">profile</div>
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-5">
              <Link href="/auth/login">
                <button className="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    ログイン
                  </span>
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
