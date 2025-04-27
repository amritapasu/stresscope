"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import NavBar from "@/frontend/components/NavBar";

export default function HistoryPage() {
  const [history, setHistory] = useState<{ [date: string]: number[] }>({});

  useEffect(() => {
    const logs = JSON.parse(localStorage.getItem("stressLogs") || "{}");
    setHistory(logs);
  }, []);

  const sortedDates = Object.keys(history).sort((a, b) => (a < b ? 1 : -1)); // Newest first

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-b from-blue-100 via-white to-green-100">
      <NavBar />
      <section className="flex flex-col items-center justify-center flex-grow p-6 gap-4">
        <h1 className="text-3xl font-bold mb-6">Stress History</h1>

        <div className="w-full max-w-2xl flex flex-col gap-4">
          {sortedDates.map((date) => {
            const scores = history[date];
            const avg = scores.reduce((sum, x) => sum + x, 0) / scores.length;
            return (
              <Link key={date} href={`/dashboard/${date}`}>
                <div className="p-4 rounded-lg shadow-md bg-white/70 backdrop-blur-md hover:bg-white/90 transition">
                  <h2 className="text-xl font-semibold text-gray-700">{date}</h2>
                  <p className="text-gray-600 mt-2">Average Stress: {avg.toFixed(2)}%</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
