"use client"
import { useState } from "react";
import SignupForm from "../../pages/signupform";
import LoginForm from "../../pages/loginform";
import Navbar from "@/components/Navbar";

export default function GetStarted() {
  const [activeForm, setActiveForm] = useState<"signup" | "login" | null>(null);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
        <Navbar/>
      {!activeForm ? (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-6">Get Started</h1>
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded-lg m-2"
            onClick={() => setActiveForm("signup")}
          >
            Signup
          </button>
          <button
            className="px-6 py-2 bg-gray-500 text-white rounded-lg m-2"
            onClick={() => setActiveForm("login")}
          >
            Login
          </button>
        </div>
      ) : activeForm === "signup" ? (
        <SignupForm onBack={() => setActiveForm(null)} />
      ) : (
        <LoginForm onBack={() => setActiveForm(null)} />
      )}
    </div>
  );
}
