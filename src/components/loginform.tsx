import { X } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

export default function LoginForm() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  if (isLoggedIn) {
    return <div className="text-center text-2xl font-bold mt-10">Welcome to the Dashboard!</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <button onClick={() => setIsLoggedIn(false)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-6">Log in to your account</h2>
        <form>
          <input type="text" placeholder="Email or Phone No" className="w-full p-3 border rounded mb-4" />
          <input type="password" placeholder="Password" className="w-full p-3 border rounded mb-4" />
          <Button onClick={handleLogin} className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 cursor-pointer">
            Log In
          </Button>
        </form>
        <div className="bg-slate-300 h-[2px] mt-4"></div>
        <p className="mt-4 text-gray-600">
          Don't have an account? <a href="#" className="text-blue-500 hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
}
