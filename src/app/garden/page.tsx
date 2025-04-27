"use client";

import NavBar from "@/components/NavBar";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LeafParticles from "@/components/LeafParticles";

export default function GardenPage() {
  const [growthStage, setGrowthStage] = useState(0);
  const [stressToday, setStressToday] = useState(0);
  const [dailyResults, setDailyResults] = useState<("✅" | "❌" | "➖")[]>([]);

  useEffect(() => {
    const logs = JSON.parse(localStorage.getItem("stressLogs") || "{}");
    const today = new Date().toISOString().split("T")[0];

    // 🌱 Check if garden already started
    let startDate = localStorage.getItem("gardenStartDate");
    if (!startDate) {
      startDate = today;
      localStorage.setItem("gardenStartDate", startDate);
    }

    const todayLogs = logs[today] || [];
    if (todayLogs.length > 0) {
      const avgTodayStress = todayLogs.reduce((sum: number, val: number) => sum + val, 0) / todayLogs.length;
      setStressToday(avgTodayStress);
    } else {
      setStressToday(0);
    }

    let successfulDays = 0;
    const results: ("✅" | "❌" | "➖")[] = [];

    for (let i = 13; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split("T")[0];

      // 🧠 Only count days AFTER garden start
      if (dateString >= startDate) {
        const dayLogs = logs[dateString] || [];

        if (dayLogs.length > 0) {
          const avg = dayLogs.reduce((sum: number, val: number) => sum + val, 0) / dayLogs.length;
          if (avg < 50) {
            successfulDays++;
            results.push("✅");
          } else {
            results.push("❌");
          }
        } else {
          results.push("➖");
        }
      } else {
        results.push("➖"); // don't count old days
      }
    }

    setDailyResults(results);
    setGrowthStage(successfulDays);
  }, []);

  const getTreeEmoji = (stage: number) => {
    if (stage <= 1) return "🌱";
    if (stage <= 3) return "🌿";
    if (stage <= 5) return "🌳";
    if (stage <= 7) return "🌴";
    return "🎄";
  };

  const getTreeMessage = (stage: number) => {
    if (stage <= 1) return "Your sapling is just starting!";
    if (stage <= 3) return "Your sprout is growing!";
    if (stage <= 5) return "Your small tree is thriving!";
    if (stage <= 7) return "Your tree is strong and proud!";
    return "Your tree has reached legendary status! ✨🌟";
  };

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-b from-green-200 via-green-100 to-blue-100 relative">
      <NavBar />
      <LeafParticles stage={growthStage} stressToday={stressToday} />

      <section className="flex flex-col items-center justify-center flex-grow p-6 gap-6 relative z-10">
        <motion.div
          key={growthStage}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
          className={`text-[8rem] ${growthStage >= 7 ? "text-green-600 animate-pulse" : ""}`}
        >
          {getTreeEmoji(growthStage)}
        </motion.div>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-700 text-center">{getTreeMessage(growthStage)}</h1>

        <div className="text-center mt-6 text-gray-500">
          Today&apos;s Average Stress: {stressToday.toFixed(2)}%
        </div>

        {/* 📅 Mini Calendar */}
        <div className="mt-8 grid grid-cols-7 gap-4">
          {[...dailyResults].reverse().map((result, idx) => (
            <div
              key={idx}
              className="w-10 h-10 flex items-center justify-center rounded-full text-xl font-bold 
                        bg-white/70 backdrop-blur-md shadow-md"
            >
              {result}
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-400 mt-2">(Past 14 days)</p>
      </section>
    </main>
  );
}
