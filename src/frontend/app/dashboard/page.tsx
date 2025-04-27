"use client";
import NavBar from "@/frontend/components/NavBar";

export default function DashboardPage() {
  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-b from-blue-100 via-white to-green-100">
      <NavBar /> {/* Top navigation */}
      <section className="flex flex-col items-center justify-center flex-grow p-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-700 mt-10">
          Welcome to StressScope!
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mt-6 max-w-2xl">
          Track, monitor, and reflect on your emotional well-being daily.
        </p>
      </section>
    </main>
  );
}
