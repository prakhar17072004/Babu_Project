// LoginForm.tsx
import { X } from "lucide-react";
import { Button } from "../components/ui/button";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import '../app/globals.css';
import { LoginContext } from "../components/LoginContext";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react"; // Import the loader icon

interface LoginFormProps {
  onBack: () => void;
}

export default function LoginForm({ onBack }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const router = useRouter();
  const { setIsLoggedIn } = useContext(LoginContext);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    try {
      const response = await fetch("/api/getAll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        setIsLoggedIn(true);
        toast.success("Login successful!");
        console.log("Login successful. setIsLoggedIn(true) called.");

        if (role === "user") {
          router.push("/User");
        } else if (role === "babu") {
          router.push("/Babu");
        } else if (role === "admin") {
          router.push("/Admin");
        } else {
          router.push("/");
        }
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Login failed");
        toast.error(errorData.error || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed");
      toast.error("Login failed");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <button onClick={onBack} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800">
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6">Log in to your account</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
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
          <select
            className="w-full p-3 border rounded mb-4"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="babu">Babu</option>
            <option value="admin">Admin</option>
          </select>
          <Button
            type="submit"
            className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 cursor-pointer relative"
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? (
              <Loader2 className="animate-spin  " />
            ) : (
              "Log In"
            )}
          </Button>
        </form>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <div className="bg-slate-300 h-[2px] mt-4"></div>

        <p className="mt-4 text-gray-600">
          Don't have an account?{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}