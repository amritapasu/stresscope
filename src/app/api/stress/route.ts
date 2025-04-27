import { NextResponse } from "next/server";

async function fetchStressScoreFromModel(imageBase64: string) {
  try {
    // Assuming your FastAPI backend is deployed and accessible from the Vercel serverless function
    const response = await fetch("https://stresscope.vercel.app/api/stress", { // Replace with your deployed FastAPI URL
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: imageBase64, // Send the base64 image
      }),
    });

    if (!response.ok) {
      throw new Error("Error fetching stress score from FastAPI");
    }

    const data = await response.json();
    return data.stressScore;
  } catch (error) {
    console.error("Error during FastAPI request:", error);
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    const { image } = await request.json(); // Extract base64 image from request body

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    console.log("Received image, predicting stress score...");

    // Fetch the stress score from the FastAPI backend
    const stressScore = await fetchStressScoreFromModel(image);

    console.log("Predicted stress score: ", stressScore);

    // Return the response
    return NextResponse.json({ stressScore });
  } catch (error) {
    console.error("Error in POST /api/stress:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
