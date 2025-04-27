"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = () => {
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    if (users[username]) {
      alert("Username already exists!");
    } else {
      users[username] = password;
      localStorage.setItem("users", JSON.stringify(users));
      alert("Signup successful!");
      router.push("/login");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-400 via-green-100 to-white">
      <div className="bg-white/40 backdrop-blur-lg p-10 rounded-xl shadow-lg w-full max-w-md animate-fadeInLeft">
        <h1 className="text-4xl font-extrabold text-center text-green-700 mb-8">
          Sign Up
        </h1>

        <div className="flex flex-col gap-6">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-3 rounded-md bg-white/70 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700 placeholder-gray-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-md bg-white/70 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700 placeholder-gray-400"
          />
          <button
            onClick={handleSignup}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-md transition"
          >
            Sign Up
          </button>
        </div>

        <p className="text-center text-gray-600 mt-6 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-green-500 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </main>
  );
}
