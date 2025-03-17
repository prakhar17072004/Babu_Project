import { X } from "lucide-react"; // Import close icon

interface LoginFormProps {
  onBack: () => void; // Function to handle closing
}

export default function LoginForm({ onBack }: LoginFormProps) {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        {/* Close Icon */}
        <button onClick={onBack} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800">
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6">Log in to your account</h2>
        <form>
          <input type="text" placeholder="Email or Phone No" className="w-full p-3 border rounded mb-4" />
          <input type="password" placeholder="Password" className="w-full p-3 border rounded mb-4" />
          <button className="w-full bg-green-500 text-white p-3 rounded-lg">Login</button>
        </form>
      </div>
    </div>
  );
}
