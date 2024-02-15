"use client";
import AuthComponent from "@/components/AuthComponent";

import { useState } from "react";

export default function Home() {
  return (
    <div className="background h-screen flex justify-center items-center">
      <AuthComponent />
    </div>
  );
}
