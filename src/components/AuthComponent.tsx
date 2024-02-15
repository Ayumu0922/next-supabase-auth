import React, { useState } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

export default function AuthComponent() {
  const [switchAuth, setSwitchAuth] = useState(false);
  return (
    <div className=" text-white glassBackgroundColor m-2 w-3/4 flex justify-center flex-col p-5  max-w-containersx rounded-xl shadow-xl">
      <h1 className=" md:hidden text-center mt-10 mb-10 text-3xl font-bold">
        ログインが必要です
      </h1>
      <h1 className="hidden md:block text-center mt-10 mb-10 text-3xl font-bold">
        サービスの利用にはログインが必要です
      </h1>
      <button className=" font-bold w-full bg-blue-500 py-5 rounded-md text-white mb-8 hover:bg-blue-400 transition-all duration-300 hover:scale-95">
        Googleでログインする
      </button>
      <div className=" grid grid-cols-3 gap-2 items-center  mb-12">
        <div className=" w-full h-1 bg-gray-300"></div>
        <p className=" text-center text-lg font-bold md:hidden ">ログイン</p>
        <p className=" text-center text-base font-bold hidden md:block">
          メールアドレスでログイン
        </p>
        <span className=" w-full h-1 bg-gray-300"></span>
      </div>
      {/* overflow hiddenはコンテンツがはみ出す場合に隠す。今回はblockを指定してその中にそれぞれコンポーネントを入れているのでそれを隠せる */}
      <div className="block whitespace-nowrap  overflow-hidden">
        <SignUp
          className={`inline-block w-full transition-all duration-700 ${
            switchAuth ? "-translate-x-full" : " translate-x-0"
          }`}
          setSwitchAuth={setSwitchAuth}
        />
        <SignIn
          className={`inline-block w-full transition-all duration-700 align-top ${
            switchAuth ? "-translate-x-full" : " translate-x-0"
          }`}
          setSwitchAuth={setSwitchAuth}
        />
      </div>
    </div>
  );
}
