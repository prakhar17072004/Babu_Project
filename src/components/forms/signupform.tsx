import { useState } from "react";

interface SignupFormProps {
  onBack: () => void;
}

export default function SignupForm({ onBack }: SignupFormProps) {
  const [role, setRole] = useState<"user" | "babu" | "admin" | "">("");

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        {/* <h2 className="text-2xl font-bold mb-6">Signup</h2> */}

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
            <form className="text-left">
              <div className="flex gap-2">
              <div className="mb-4">
                <label className="block font-semibold">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder=" First name"
                  className="w-full p-3 border rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block font-semibold">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder=" Last name"
                  className="w-full p-3 border rounded"
                  required
                />
              </div>
              </div>

              <div className="mb-4">
                <label className="block font-semibold">
                  Email or Phone No <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter email or phone number"
                  className="w-full p-3 border rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block font-semibold">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
  type="password"
  placeholder="Enter your password"
  className="w-full p-3 border rounded"
  required
  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
  title="Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one special character (@, $, !, %, *, ?, &)."
/>
              </div>

              {/* Extra fields based on role */}
              {role === "babu" && (
                <div className="mb-4">
                  <label className="block font-semibold">
                    Babu ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Babu ID"
                    className="w-full p-3 border rounded"
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
                    placeholder="Enter Admin Code"
                    className="w-full p-3 border rounded"
                    required
                  />
                </div>
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
