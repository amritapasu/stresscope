import { NextResponse } from "next/server";

// Function to fetch the stress score from the FastAPI model
async function fetchStressScoreFromModel(imageBase64: string) {
  try {
    // Assuming the FastAPI backend is deployed on Vercel
    const response = await fetch("https://stresscope.vercel.app/api/stress", { // Replace with your deployed FastAPI URL
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: imageBase64,  // Sending the base64 image string
      }),
    });

    if (!response.ok) {
      throw new Error("Error fetching stress score from FastAPI");
    }

    const data = await response.json();
    return data.stressScore;
  } catch (error) {
    console.error("Error during FastAPI request:", error);
    throw new Error("Failed to fetch stress score");
  }
}

// Serverless function handler for the POST request
export async function POST(request: Request) {
  try {
    // Parse the incoming request to get the base64 image data
    const { image } = await request.json();

    // Validate if image is provided
    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    console.log("Received image, predicting stress score...");

    // Fetch the stress score by calling FastAPI
    const stressScore = await fetchStressScoreFromModel(image);

    console.log("Predicted stress score: ", stressScore);

    // Return the stress score as a JSON response
    return NextResponse.json({ stressScore });
  } catch (error) {
    console.error("Error in POST /api/stress:", error);

    // Return a 500 response with the error details
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
