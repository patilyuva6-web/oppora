import { NextResponse } from "next/server";
import { ApifyClient } from "apify-client";

const token = process.env.APIFY_API_TOKEN;

console.log("APIFY TOKEN LOADED:", !!token);

const client = new ApifyClient({
  token,
});

export async function GET() {
  try {
    const input = {
      opportunityTypes: [
        "hackathons",
        "competitions",
        "jobs",
        "internships",
        "quizzes",
        "scholarships",
        "workshops",
        "conferences",
      ],
      maxResults: 20,
    };

    const run = await client
      .actor("solidcode/unstop-scraper")
      .call(input);

    const { items } = await client
      .dataset(run.defaultDatasetId)
      .listItems();

    return NextResponse.json({
      success: true,
      opportunities: items,
    });
  } catch (error) {
    console.error("APIFY ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        opportunities: [],
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}