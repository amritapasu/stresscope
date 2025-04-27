"use client";
import NavBar from "@/components/NavBar";
import { useEffect, useRef, useState } from "react";

export default function LiveMonitoringPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [stressScore, setStressScore] = useState<number>(0);

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing webcam:", err);
      }
    }

    startCamera();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isCapturing) {
      interval = setInterval(async () => {
        if (!videoRef.current) return;

        const canvas = document.createElement("canvas");
        const video = videoRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const frameData = canvas.toDataURL("image/jpeg");

          try {
            // Update the backend URL to your deployed FastAPI backend
            const response = await fetch("https://stresscope.vercel.app/api/stress", {  // Use the Vercel backend URL here
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ image: frameData }),
            });

            if (!response.ok) {
              throw new Error("Failed to fetch stress score");
            }

            // Parse the response from the backend
            const data = await response.json();
            console.log("Stress Score:", data.stressScore);

            // Store the stress score in localStorage
            const today = new Date().toISOString().split("T")[0]; // Current date
            const stressLogs = JSON.parse(localStorage.getItem("stressLogs") || "{}");

            if (!stressLogs[today]) {
              stressLogs[today] = [];
            }

            stressLogs[today].push(data.stressScore);
            localStorage.setItem("stressLogs", JSON.stringify(stressLogs));

            // Update the state to reflect the new stress score
            setStressScore(data.stressScore);

          } catch (error) {
            console.error("Error fetching stress score:", error);
          }
        }
      }, 3000); // Set the interval to 1 second
    }

    return () => clearInterval(interval);
  }, [isCapturing]);

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-b from-blue-100 via-white to-green-100">
      <NavBar />

      <section className="flex flex-col items-center justify-center flex-grow p-6 gap-8">
        <h1 className="text-3xl font-bold">Live Stress Monitoring</h1>

        {/* MIRRORED VIDEO */}
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="rounded-lg shadow-lg w-full max-w-md transform scale-x-[-1]"
        />

        <div className="mt-4 text-center bg-white/70 backdrop-blur-md p-6 rounded-lg shadow-md flex flex-col items-center">
          <h2 className="text-xl font-semibold text-gray-700">Current Stress Score:</h2>
          <p className="text-4xl font-bold text-blue-600 mt-2">{stressScore.toFixed(2)}%</p>

          <div className="w-full bg-gray-300 rounded-full h-4 mt-4">
            <div
              className={`h-4 rounded-full ${
                stressScore < 33 ? "bg-green-500" : stressScore < 66 ? "bg-yellow-500" : "bg-red-500"
              }`}
              style={{ width: `${stressScore}%` }}
            ></div>
          </div>
        </div>

        <button
          onClick={() => setIsCapturing((prev) => !prev)}
          className={`mt-6 px-6 py-3 rounded text-white font-semibold ${
            isCapturing ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isCapturing ? "Stop Capturing" : "Start Capturing"}
        </button>
      </section>
    </main>
  );
}
