// src/app/api/stress/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {

  // 🧠 (Placeholder: here is where you run your ML model!)

  // For now, simulate it:
  const fakeStressScore = Math.random() * 100; // random 0-100

  console.log("Received frame, calculated stress:", fakeStressScore);

  return NextResponse.json({ stressScore: fakeStressScore });
}
