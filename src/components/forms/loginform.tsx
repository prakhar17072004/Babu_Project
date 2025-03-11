interface LoginFormProps {
  onBack: () => void; // Explicitly defining onBack as a function that returns void
}

export default function LoginForm({ onBack }: LoginFormProps) {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-2xl font-bold mb-6">Log in to your account</h2>
        <form>
          <input type="text" placeholder="Email or Phone No" className="w-full p-3 border rounded mb-4" />
          <input type="password" placeholder="Password" className="w-full p-3 border rounded mb-4" />
          <button className="w-full bg-green-500 text-white p-3 rounded-lg">Login</button>
        </form>
        <button className="mt-4 text-blue-500" onClick={onBack}>Back</button>
      </div>
    </div>
  );
}
