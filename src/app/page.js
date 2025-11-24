"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loginStatus = localStorage.getItem('loginStatus')
    if (loginStatus) {
      router.push("/dashboard");
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault(); // prevent page reload
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://api2.firststartup.in/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.responseCode === 200) {
        // Store token and user info in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.responsResult));
        localStorage.setItem("loginStatus", "true");

        toast.success(data.responseMessage || "Login Successful!");
        router.push("/dashboard");


      } else {
        toast.error(data.responseMessage || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[linear-gradient(135deg,#0a3d62,#dff0ff)] dark:bg-blue">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* LEFT SIDE (Centered Card) */}
      <div className="flex w-full md:w-1/2 items-center justify-center px-6 md:px-10">
        <div className="w-full max-w-md bg-white dark:bg-zinc-900 shadow-lg rounded-2xl p-10">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <h1 className="text-4xl font-extrabold tracking-wide text-blue-600">
              First<span className="text-black dark:text-white">Startup</span>
            </h1>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 text-center">
            Welcome Back 👋
          </h2>
          <p className="text-center mt-1 mb-8 text-zinc-600 dark:text-zinc-400">
            Please login to continue.
          </p>

          {/* Form */}
          <form className="flex flex-col gap-5" onSubmit={handleLogin}>
            <div>
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Email
              </label>
              <input
                type="email"
                placeholder="example@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent px-4 py-2 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="flex justify-end items-center">
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white py-2 transition-all disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div className="hidden md:flex w-1/2 relative">
        <Image
          src="/login.png"
          alt="Login Page Illustration"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
