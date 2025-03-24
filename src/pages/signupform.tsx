import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react"; // Import close icon
import "../app/globals.css";

interface SignupFormProps {
  onBack: () => void;
}

export default function SignupForm({ onBack }: SignupFormProps) {
  const [role, setRole] = useState<"user" | "babu" | "admin" | "">("");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile_number: "",
    password: "",
    confirmPassword: "",
    babu_id: "",
    admin_code: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          mobile_number: formData.mobile_number,
          password: formData.password,
          role,
          babu_id: role === "babu" ? formData.babu_id : undefined,
          admin_code: role === "admin" ? formData.admin_code : undefined,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Signup failed");

      alert("User registered successfully!");
      setRole("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <button
          onClick={onBack}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <X size={24} />
        </button>

        {!role ? (
          <div>
            <h3 className="text-lg font-semibold mb-4">Select Your Role</h3>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                onClick={() => setRole("user")}
              >
                User
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-lg"
                onClick={() => setRole("babu")}
              >
                Babu
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                onClick={() => setRole("admin")}
              >
                Admin
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Signup as {role.charAt(0).toUpperCase() + role.slice(1)}
            </h3>
            <form className="text-left" onSubmit={handleSubmit}>
              <div className="flex gap-2">
                <div className="mb-4 w-1/2">
                  <label className="block font-semibold">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    placeholder="First name"
                    className="w-full p-3 border rounded"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4 w-1/2">
                  <label className="block font-semibold">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    placeholder="Last name"
                    className="w-full p-3 border rounded"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block font-semibold">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full p-3 border rounded"
                  value={formData.email}
                  onChange={handleChange}
                  // pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                  // title="Please enter a valid email address"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block font-semibold">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="mobile_number"
                  placeholder="Enter your phone number"
                  className="w-full p-3 border rounded"
                  value={formData.mobile_number}
                  onChange={handleChange}
                  pattern="\d{10}"
                  minLength={10}
                  maxLength={10}
                  title="Phone number must be exactly 10 digits"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block font-semibold">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full p-3 border rounded"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  // pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                  // title="Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
                />
              </div>

              <div className="mb-4">
                <label className="block font-semibold">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  className="w-full p-3 border rounded"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  // pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                  // title="Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
                />
              </div>

              {role === "babu" && (
                <div className="mb-4">
                  <label className="block font-semibold">
                    Babu ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="babu_id"
                    placeholder="Enter Babu ID"
                    className="w-full p-3 border rounded"
                    value={formData.babu_id}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              {role === "admin" && (
                <div className="mb-4">
                  <label className="block font-semibold">
                    Admin Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="admin_code"
                    placeholder="Enter Admin Code"
                    className="w-full p-3 border rounded"
                    value={formData.admin_code}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              {error && <p className="text-red-500">{error}</p>}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-3 rounded-lg"
                disabled={loading}
              >
                {loading ? "Signing up..." : "Signup"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
