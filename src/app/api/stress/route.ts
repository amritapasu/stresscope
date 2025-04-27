//src/app/api/stress/route.ts
import { NextResponse } from "next/server";
import fetch from "node-fetch";  // Import fetch if you're doing server-side requests

// Placeholder function for ML model interaction (for now, simulate prediction)
async function fetchStressScoreFromModel(imageBase64: string) {
  // Simulate a call to your FastAPI server
  const response = await fetch("http://127.0.0.1:8000/api/stress", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image: imageBase64,  // Pass the base64 string directly
    }),
  });

  if (!response.ok) {
    throw new Error("Error fetching stress score");
  }

  const data = await response.json();
  return data.stressScore;
}

export async function POST(request: Request) {
  try {
    const { image } = await request.json(); // Extract the base64 image from the request body

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    console.log("Received image, predicting stress score...");

    // Get the stress score from the FastAPI model
    const stressScore = await fetchStressScoreFromModel(image);

    console.log("Predicted stress score: ", stressScore);

    // Return the response in a consistent format
    return NextResponse.json({ stressScore });
  } catch (error) {
    console.error("Error in POST /api/stress:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}