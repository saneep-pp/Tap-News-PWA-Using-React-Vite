import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginWithGoogle } from "../firebase";
import { FcGoogle } from "react-icons/fc";
import { Toaster, toast } from "react-hot-toast";
import { CiUser } from "react-icons/ci";
import { InspectionPanel } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLocalLogin = () => {
    if (!username.trim()) return toast.error("Username is required!");
    if (!password.trim()) return toast.error("Password is required!");
    if (password.length < 4)
      return toast.error("Password must be at least 4 characters");

    if (
      import.meta.env.VITE_USERNAME === username &&
      import.meta.env.VITE_PASSWORD === password
    ) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: username,
          password: password,
          email: null,
          photo: null,
          method: "local",
        })
      );
      toast.success("✅ Login Successful!");
      setTimeout(() => {
        navigate("/");
      }, 800);
    } else {
      toast.error("Invalid Credentials!");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const user = await loginWithGoogle();
      toast.success(`✅ Welcome, ${user.displayName || "User"}!`);
      setTimeout(() => {
        navigate("/");
      }, 800);
    } catch (error: any) {
      console.error("Google login error:", error.code, error.message);
      toast.error(`Google login failed: ${error.message || "Unknown error"}`);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center flex-col gap-6 px-4 bg-[#f9fafb]">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full max-w-xs">
        <div className="flex w-full justify-center items-center">
          <div className="flex p-4 rounded-sm border-x-[#2563eb] border-y-cyan-700">
            <InspectionPanel size={32} color="#2563eb" />
            <h1 className="w-full text-center text-2xl font-bold font-mono text-[#2563eb]">
              Tap-post
            </h1>
          </div>
        </div>

        <div className="flex w-full items-center justify-center h-1/3">
          <div className="flex p-2 rounded-full border-2 w-20 h-20 items-center justify-center border-[#111827]">
            <CiUser color="#111827" size={46} />
          </div>
        </div>

        <div className="flex w-full flex-col h-2/3">
          <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className="w-full px-4 py-2 border rounded mb-4"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full px-4 py-2 border rounded mb-4"
          />

          <button
            onClick={handleLocalLogin}
            className="w-full bg-[#5183f1] text-white px-4 py-2 rounded mb-2 hover:bg-[#2563eb] font-bold"
          >
            Login
          </button>

          <div className="text-center my-4 text-gray-500">or</div>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 border px-4 py-2 rounded hover:bg-gray-100"
          >
            <FcGoogle className="text-xl" />
            <span>Sign in with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}
