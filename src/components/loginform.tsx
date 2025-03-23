import { X } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

export default function LoginForm() {
  const [role, setRole] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      // Fetch user data from API
      const response = await fetch("/api/getAll", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          role: "user", // Change dynamically based on user selection if needed
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();

      // Check if the entered credentials match any user
      const user = data.users.find((user: any) => user.email === email && user.password === password);

      if (user) {
        setRole(user.role); // Set the role based on the user
      } else {
        alert("Invalid credentials!");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  if (role) {
    return (
      <div className="text-center text-2xl font-bold mt-10">
        Welcome to the {role} Dashboard!
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <button onClick={() => setRole(null)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-6">Log in to your account</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Email or Phone No"
            className="w-full p-3 border rounded mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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
