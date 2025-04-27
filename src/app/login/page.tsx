"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    if (users[username] === password) {
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("currentUser", username);
      router.push("/dashboard");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-500 via-blue-100 to-white">
      <div className="bg-white/40 backdrop-blur-lg p-10 rounded-xl shadow-lg w-full max-w-md animate-fadeInLeft">
        <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-8">
          Log In
        </h1>

        <div className="flex flex-col gap-6">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-3 rounded-md bg-white/70 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-md bg-white/70 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400"
          />
          <button
            onClick={handleLogin}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition"
          >
            Log In
          </button>
        </div>

        <p className="text-center text-gray-600 mt-6 text-sm">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </main>
  );
}
