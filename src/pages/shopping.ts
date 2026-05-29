import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const API_KEY = process.env.SERP_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: "API key not configured" });
  }

  const url = `https://serpapi.com/search.json?engine=google_shopping&q=bag&location_requested=Austin,Texas,United States&google_domain=google.com&hl=en&gl=us&device=desktop&api_key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch from SerpAPI" });
  }
}