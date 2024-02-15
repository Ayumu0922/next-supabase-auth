import React from "react";
import { AuthSwitchProps } from "../../types/types";

export default function SignIn({ className, setSwitchAuth }: AuthSwitchProps) {
  return (
    <div className={className}>
      <form action="" className=" font-semibold flex flex-col gap-5 mb-9">
        <label>メールアドレス</label>
        <input
          type="text"
          placeholder="メールアドレス"
          className="  py-3 px-2  border-b   bg-transparent  outline-none focus:outline-none"
        />
        <label className=" font-bold">パスワード</label>
        <input
          type="password"
          placeholder="パスワード"
          className=" py-3 px-2   bg-transparent  focus:outline-none border-b"
        />

        <button className=" font-bold w-full bg-green-500 py-5 rounded-md text-white mb-8 hover:scale-95 hover:bg-green-400  transition-all">
          ログイン
        </button>
      </form>
      <p className=" text-center mb-10  font-semibold  text-base md:text-xl">
        アカウントの作成はこちら
        <span
          className=" font-semibold  text-textGreen cursor-pointer ml-3 text-underline"
          onClick={() => setSwitchAuth((value) => !value)}
        >
          新規登録
        </span>
      </p>
    </div>
  );
}
