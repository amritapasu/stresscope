"use client";

import { motion } from "framer-motion";

export default function LeafParticles({ stage, stressToday }: { stage: number; stressToday: number }) {
  const leavesByStage = [
    ["🌱"],        // stage 0–1
    ["🍃", "🌿"],  // stage 2–3
    ["🍂", "🍁"],  // stage 4+
  ];

  const leaves =
    stage <= 1 ? leavesByStage[0] : stage <= 3 ? leavesByStage[1] : leavesByStage[2];

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {Array.from({ length: 20 }).map((_, i) => {
        const randomLeaf = leaves[Math.floor(Math.random() * leaves.length)];
        const randomLeft = Math.random() * 100;
        const randomDelay = Math.random() * 5;
        const randomDuration = 5 + Math.random() * 5;

        return (
          <motion.div
            key={i}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: "110vh", opacity: [0.8, 0.4, 0] }}
            transition={{
              duration: randomDuration * (stressToday > 50 ? 0.5 : 1), // 50% faster if stressed
              delay: randomDelay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              top: 0,
              left: `${randomLeft}%`,
              fontSize: stage >= 4 ? "2rem" : "1.5rem", // bigger leaves when advanced
              zIndex: 0,
            }}
          >
            {randomLeaf}
          </motion.div>
        );
      })}
    </div>
  );
}
