"use client";
import React, { useState } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

export default function AuthComponent() {
  const [switchAuth, setSwitchAuth] = useState(false);
  return (
    <div className="flex justify-center items-center m-4">
      <div className=" bg-white m-2 w-3/4 flex justify-center flex-col p-5  rounded-xl shadow-xl">
        <h1 className=" md:hidden text-center mt-10 mb-10 text-3xl font-bold">
          登録はこちらから
        </h1>
        <h1 className="hidden md:block text-center mt-10 mb-10 text-3xl font-bold">
          利用者は会員登録が必要になります
        </h1>
        <button className=" font-bold w-full bg-blue-500 py-5 rounded-md text-white mb-8 hover:bg-blue-400 transition-all duration-300 hover:scale-95">
          Googleでログインする
        </button>
        <div className="block whitespace-nowrap overflow-hidden">
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
    </div>
  );
}
