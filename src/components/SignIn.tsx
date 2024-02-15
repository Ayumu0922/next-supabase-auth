import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Loading from "@/app/loading";
import * as z from "zod";
import type { Database } from "../../lib/supabase";
type Schema = z.infer<typeof schema>;
import React, { useState } from "react";
import { AuthSwitchProps } from "../../types/types";

// 入力データの検証ルールを定義
const schema = z.object({
  email: z.string().email({ message: "メールアドレスの形式ではありません。" }),
  password: z.string().min(6, { message: "6文字以上入力する必要があります。" }),
});

export default function SignIn({ className, setSwitchAuth }: AuthSwitchProps) {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // 初期値
    defaultValues: { email: "", password: "" },
    // 入力値の検証
    resolver: zodResolver(schema),
  });

  // 送信
  const onSubmit: SubmitHandler<Schema> = async (data) => {
    setLoading(true);
    try {
      // ログイン実行
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        setMessage("エラーが発生しました" + error.message);
        return;
      }

      // トップページに遷移
      router.push("/");
    } catch (error) {
      setMessage("エラーが発生ました" + error);
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
        <p className=" text-center text-lg font-bold md:hidden ">ログイン</p>
        <p className=" text-center text-base font-bold hidden md:block">
          メールアドレスでログイン
        </p>
        <span className=" w-full h-1 bg-gray-300"></span>
      </div>
      <form
        action=""
        className=" font-semibold flex flex-col gap-5 mb-9"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* メールアドレス */}
        <label>メールアドレス</label>
        <input
          type="email"
          placeholder="メールアドレス"
          className="  py-3 px-2  border-b   bg-transparent  outline-none focus:outline-none"
          id="signin-email"
          {...register("email", { required: true })}
        />
        <div className=" my-3 text-center text-sm text-red-500">
          {errors.email?.message}
        </div>
        {/* パスワード */}
        <label className=" font-bold">パスワード</label>
        <input
          type="password"
          placeholder="パスワード"
          className=" py-3 px-2   bg-transparent  focus:outline-none border-b"
          id="signin-password"
          {...register("password", { required: true })}
        />
        <div className=" my-3 text-center text-sm text-red-500">
          {errors.password?.message}
        </div>
        {/* ログインボタン */}
        {loading ? (
          <Loading />
        ) : (
          <button
            type="submit"
            className=" font-bold w-full bg-green-500 py-5 rounded-md text-white mb-8 hover:scale-95 hover:bg-green-400  transition-all"
          >
            ログイン
          </button>
        )}
      </form>
      {message && (
        <div className=" my-5 text-center text-sm text-red-500">{message}</div>
      )}
      {/* パスワード忘れた */}

      {/* 新規作成誘導 */}
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
