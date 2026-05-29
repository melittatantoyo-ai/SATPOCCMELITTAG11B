import { useEffect, useState } from "react";
import "../index.css";

interface ShoppingItem {
  source: string;
  title: string;
  thumbnail: string;
}

interface DataType {
  shopping_results: ShoppingItem[];
}

function Preview() {
  const [data, setData] = useState<DataType | null>(null);

  const API_KEY = "30aea772d3cd7b6a7e69ea460719809473b55459c346738bde871eb91ce9e5ec";

  const ENDPOINT = "https://serpapi.com/search";

  const params = {
    engine: "google_shopping",
    q: "bag",
    location_requested: "Austin, Texas, United States",
    location_used: "Austin, Texas, United States",
    google_domain: "google.com",
    hl: "en",
    gl: "us",
    device: "desktop",
  };

  useEffect(() => {
    const queryString = new URLSearchParams({
      ...params,
      api_key: API_KEY,
    }).toString();

    const serpUrl = `${ENDPOINT}?${queryString}`;

    fetch("https://corsproxy.io/?" + encodeURIComponent(serpUrl))
      .then((res) => res.json())
      .then((result: DataType) => {
        console.log(result);
        setData(result);
      })
      .catch((err) => console.error("Error:", err));
  }, []);

  if (!data) {
    return (
      <div className="preview-loading">
        <span className="preview-loading__dot" />
        <span className="preview-loading__dot" />
        <span className="preview-loading__dot" />
      </div>
    );
  }

  return (
    <div className="preview-grid">
  {data?.shopping_results?.slice(0, 16).map(
    (item: ShoppingItem, index: number) => (
      <div className="preview-card" key={index}>
        <p className="preview-card__source">{item.source}</p>
        <h1 className="preview-card__title">{item.title}</h1>
        <img
          className="preview-card__image"
          src={item.thumbnail}
          alt={item.title}
        />
      </div>
    )
  )}
</div>
  );
}

export default Preview;