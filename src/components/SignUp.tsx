import React from "react";
import { AuthSwitchProps } from "../../types/types";

export default function SignUp({ className, setSwitchAuth }: AuthSwitchProps) {
  return (
    <div className={className}>
      <form action="" className="flex flex-col gap-5 mb-9 font-semibold">
        <label>メールアドレス</label>
        <input
          type="text"
          placeholder="メールアドレスを入力してください"
          className="  py-3 px-2  border-b   bg-transparent  outline-none focus:outline-none"
        />
        <label>パスワード</label>
        <input
          type="password"
          placeholder="パスワード"
          className="  py-3 px-2  border-b   bg-transparent  outline-none focus:outline-none"
        />
        <label>パスワード確認</label>
        <input
          type="password"
          placeholder="パスワード"
          className="  py-3 px-2  border-b   bg-transparent  outline-none focus:outline-none"
        />
        <button className=" font-bold w-full bg-green-500 py-5 rounded-md text-white mb-8 hover:scale-95 hover:bg-green-400 transition-all">
          登録する
        </button>
      </form>
      <p className="  text-sm text-center mb-10 font-semibold  md:text-xl">
        アカウントをお持ちの方はこちら
        <span
          className=" font-semibold  text-textGreen cursor-pointer ml-3 text-underline"
          onClick={() => setSwitchAuth((value) => !value)}
        >
          ログイン
        </span>
      </p>
    </div>
  );
}
