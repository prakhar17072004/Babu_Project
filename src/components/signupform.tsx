export function SignupForm({ onBack }) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Signup</h2>
        <form>
          <input
            type="text"
            placeholder="Email or Phone No"
            className="w-full p-2 border rounded mb-3"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded mb-3"
          />
          <div className="w-full h-12 bg-gray-200 flex items-center justify-center mb-3">
            CAPTCHA
          </div>
          <button className="w-full bg-blue-500 text-white p-2 rounded">Signup</button>
        </form>
        <button className="mt-4 text-blue-500" onClick={onBack}>Back</button>
      </div>
    );
  }
  