import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import type { Database } from "../../lib/supabase";
type Schema = z.infer<typeof schema>;

// 入力データの検証ルールを定義
const schema = z.object({
  name: z.string().min(2, { message: "2文字以上入力する必要があります。" }),
  email: z.string().email({ message: "メールアドレスの形式ではありません。" }),
  password: z.string().min(6, { message: "6文字以上入力する必要があります。" }),
});

import React from "react";
import { AuthSwitchProps } from "../../types/types";
import Loading from "@/app/loading";

export default function SignUp({ className, setSwitchAuth }: AuthSwitchProps) {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    // 初期値
    defaultValues: { name: "", email: "", password: "" },
    // 入力値の検証
    resolver: zodResolver(schema),
  });

  // 送信
  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true);

    try {
      // サインアップ
      const { error: errorSignup } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });

      // エラーチェック
      if (errorSignup) {
        setMessage("エラーが発生しました。" + errorSignup.message);
        return;
      }

      // プロフィールの名前を更新
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ name: data.name })
        .eq("email", data.email);

      // エラーチェック
      if (updateError) {
        setMessage("エラーが発生しました。" + updateError.message);
        return;
      }

      // 入力フォームクリア
      reset();
      setMessage("本登録用のURLを記載したメールを送信しました。");
    } catch (error) {
      setMessage("エラーが発生しました。" + error);
      return;
    } finally {
      setLoading(false);
      router.refresh();
    }
  };
  return (
    <div className={className}>
      <div className=" grid grid-cols-3 gap-2 items-center  mb-12">
        <div className=" w-full h-1 bg-gray-300"></div>
        <p className=" text-center text-lg font-bold md:hidden ">新規登録</p>
        <p className=" text-center text-base font-bold hidden md:block">
          新規会員登録はこちらから
        </p>
        <span className=" w-full h-1 bg-gray-300"></span>
      </div>
      <form
        action=""
        className="flex flex-col gap-5 mb-2 font-semibold"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* 名前 */}
        <label>名前</label>
        <input
          type="text"
          placeholder="ユーザ名"
          className="py-3 px-2  border-b   bg-transparent  outline-none focus:outline-none"
          id="name"
          {...register("name", { required: true })}
        />
        <div className=" my-2 text-center text-sm text-red-500">
          {errors.name?.message}
        </div>
        {/* メールアドレス */}
        <label>メールアドレス</label>
        <input
          type="email"
          placeholder="メールアドレス"
          className="  py-3 px-2  border-b   bg-transparent  outline-none focus:outline-none"
          id="signup-email"
          {...register("email", { required: true })}
        />
        <div className=" my-2 text-center text-sm text-red-500">
          {errors.email?.message}
        </div>
        {/* パスワード */}
        <label>パスワード</label>
        <input
          type="password"
          placeholder="パスワード"
          className="  py-3 px-2  border-b   bg-transparent  outline-none focus:outline-none"
          id="signup-password"
          {...register("password", { required: true })}
        />
        <div className=" my-2 text-center text-sm text-red-500">
          {errors.password?.message}
        </div>
        {loading ? (
          <Loading />
        ) : (
          <button
            className=" font-bold w-full bg-green-500 py-5 rounded-md text-white hover:scale-95 hover:bg-green-400 transition-all"
            type="submit"
          >
            新規登録
          </button>
        )}
      </form>
      {message && (
        <div className=" my-3 text-center text-sm text-red-500 font-bold  mb-3">
          {message}
        </div>
      )}
      <p className=" gap-2  text-sm text-center mb-10 font-semibold  md:text-xl items-center justify-center flex flex-col md:flex-none">
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
