import { useState } from "react";

interface SignupFormProps {
  onBack: () => void;
}

export default function SignupForm({ onBack }: SignupFormProps) {
  const [role, setRole] = useState<"user" | "babu" | "admin" | "">("");

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-2xl font-bold mb-6">Signup</h2>

        {/* Role Selection */}
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
            <form>
              <input
                type="text"
                placeholder="Email or Phone No"
                className="w-full p-3 border rounded mb-4"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 border rounded mb-4"
              />
              {/* Add extra fields based on role if needed */}
              {role === "babu" && (
                <input
                  type="text"
                  placeholder="Babu ID"
                  className="w-full p-3 border rounded mb-4"
                />
              )}
              {role === "admin" && (
                <input
                  type="text"
                  placeholder="Admin Code"
                  className="w-full p-3 border rounded mb-4"
                />
              )}
              <button className="w-full bg-blue-500 text-white p-3 rounded-lg">
                Signup
              </button>
            </form>
            <button className="mt-4 text-blue-500" onClick={() => setRole("")}>
              Back to Role Selection
            </button>
          </div>
        )}

        <button className="mt-4 text-gray-500" onClick={onBack}>
             Back to Get Started
        </button>
      </div>
    </div>
  );
}
