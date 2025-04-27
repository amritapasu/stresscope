"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Camera, BookOpen, TreePine, LogOut } from "lucide-react";

export default function NavBar() {
  const pathname = usePathname();

  const linkClasses = (href: string) =>
    `flex items-center gap-2 font-semibold px-3 py-2 rounded-md ${
      pathname === href
        ? "bg-blue-100 text-blue-700"
        : "text-gray-700 hover:text-blue-600"
    }`;

  return (
    <nav className="sticky top-0 bg-white/70 backdrop-blur-md shadow-md z-50 p-4 flex justify-between items-center">
      {/* Left: App Name */}
      <h1 className="text-2xl font-bold text-blue-700">StressScope</h1>

      {/* Right: Buttons */}
      <div className="flex gap-4 items-center">
        <Link href="/dashboard" className={linkClasses("/dashboard")}>
          <Home size={20} />
        </Link>
        <Link href="/live" className={linkClasses("/live")}>
          <Camera size={20} />
        </Link>
        <Link href="/history" className={linkClasses("/history")}>
          <BookOpen size={20} />
        </Link>
        <Link href="/garden" className={linkClasses("/garden")}>
          <TreePine size={20} />
        </Link>
        <button
          onClick={() => {
            localStorage.removeItem("loggedIn");
            localStorage.removeItem("currentUser");
            window.location.href = "/login";
          }}
          className="flex items-center gap-2 text-red-500 hover:text-red-600 font-semibold"
        >
          <LogOut size={20} />
        </button>
      </div>
    </nav>
  );
}
