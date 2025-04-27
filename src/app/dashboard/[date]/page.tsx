// src/app/dashboard/[date]/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // For animations

export default function DayDiaryPage() {
  const { date } = useParams<{ date: string }>();
  const router = useRouter();

  const [stressLogs, setStressLogs] = useState<number[]>([]);
  const [entries, setEntries] = useState<{ mood: string; text: string; timestamp: string }[]>([]);
  const [selectedMood, setSelectedMood] = useState("");
  const [text, setText] = useState("");

  const moods = ["😃", "😐", "😠", "😭", "😮"];

  useEffect(() => {
    const logs = JSON.parse(localStorage.getItem("stressLogs") || "{}");
    const diaryLogs = JSON.parse(localStorage.getItem("diaryEntries") || "{}");

    if (logs[date]) {
      setStressLogs(logs[date]);
    }
    if (Array.isArray(diaryLogs[date])) {
      setEntries(diaryLogs[date]);
    }
  }, [date]);

  const handleSave = () => {
    if (!selectedMood.trim() || !text.trim()) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newEntry = { mood: selectedMood, text, timestamp };
    const updatedEntries = [...entries, newEntry];

    setEntries(updatedEntries);
    const allEntries = JSON.parse(localStorage.getItem("diaryEntries") || "{}");
    allEntries[date] = updatedEntries;
    localStorage.setItem("diaryEntries", JSON.stringify(allEntries));

    setSelectedMood("");
    setText("");
  };

  const handleDelete = (index: number) => {
    const updated = [...entries];
    updated.splice(index, 1);
    setEntries(updated);

    const allEntries = JSON.parse(localStorage.getItem("diaryEntries") || "{}");
    allEntries[date] = updated;
    localStorage.setItem("diaryEntries", JSON.stringify(allEntries));
  };

  const averageStress =
    stressLogs.length > 0
      ? (stressLogs.reduce((sum, val) => sum + val, 0) / stressLogs.length).toFixed(2)
      : "No data";

  return (
    <main className="flex flex-col items-center min-h-screen bg-gradient-to-b from-blue-100 via-white to-green-100 p-6">
      <button
        onClick={() => router.push("/history")}
        className="mb-4 self-start px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
      >
        Back to History
      </button>

      <h1 className="text-3xl font-bold mb-2">Diary for {date}</h1>
      <h2 className="text-xl text-gray-700 mb-6">Average Stress: {averageStress}%</h2>

      <div className="flex flex-col items-center w-full max-w-2xl bg-white/70 backdrop-blur-md p-6 rounded-lg shadow-md">
        <div className="flex justify-center mb-4 gap-3">
          {moods.map((m) => (
            <button
              key={m}
              onClick={() => setSelectedMood(m)}
              className={`text-3xl transition-transform hover:scale-125 ${selectedMood === m ? "ring-2 ring-blue-400 rounded-full" : ""}`}
            >
              {m}
            </button>
          ))}
        </div>
        <textarea
          placeholder="Write your thoughts..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 mb-4 border rounded h-32"
        />
        <button
          onClick={handleSave}
          className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded mb-4"
        >
          Save Entry
        </button>

        <div className="w-full mt-6">
          <AnimatePresence>
            {entries.length === 0 ? (
              <p className="text-gray-500 text-center">No entries yet. Start by adding one!</p>
            ) : (
              entries.map((entry, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="border-b border-gray-300 py-4 flex flex-col items-start gap-1"
                >
                  <div className="text-sm text-gray-500">{entry.timestamp}</div>
                  <div className="text-2xl">{entry.mood}</div>
                  <div className="text-gray-700">{entry.text}</div>
                  <button
                    onClick={() => handleDelete(idx)}
                    className="text-red-500 hover:underline text-sm mt-1"
                  >
                    Delete
                  </button>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}