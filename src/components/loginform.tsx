import { useState } from "react";
import { useRouter } from "next/router";
import { X } from "lucide-react";
import { Button } from "./ui/button";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Invalid credentials");

      // Redirect based on role
      if (data.role === "user") {
        router.push("/user-dashboard");
      } else if (data.role === "babu") {
        router.push("/babu-dashboard");
      } else if (data.role === "admin") {
        router.push("/admin-dashboard");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-800">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-6">Log in to your account</h2>
        <form onSubmit={handleLogin}>
          <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-3 border rounded mb-4" required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full p-3 border rounded mb-4" required />
          {error && <p className="text-red-500">{error}</p>}
          <Button type="submit" className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600">
            Log In
          </Button>
        </form>
      </div>
    </div>
  );
}
