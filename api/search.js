export default async function handler(req, res) {
  try {
    const query = new URLSearchParams({
      ...req.query,
      api_key: "30aea772d3cd7b6a7e69ea460719809473b55459c346738bde871eb91ce9e5ec",
    });
    const response = await fetch(`https://serpapi.com/search?${query}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}