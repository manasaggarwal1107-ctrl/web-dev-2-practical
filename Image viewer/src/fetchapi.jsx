import { useState, useEffect } from "react";

const API_URL = "https://fakestoreapi.com/products";

const IMAGES_PER_PAGE = 4;

export default function FetchAPI() {
   const [images, setImages] = useState([]);

   const [page, setPage] = useState(0);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((products) => setImages(products.map((p) => p.image)));
  }, []);

  const totalPages = Math.ceil(images.length / IMAGES_PER_PAGE);

  const start = page * IMAGES_PER_PAGE;
  const currentImages = images.slice(start, start + IMAGES_PER_PAGE);

  const next = () => setPage((p) => Math.min(p + 1, totalPages - 1));
  const prev = () => setPage((p) => Math.max(p - 1, 0));

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h2>Product Images (4 at a time)</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 10,
          flexWrap: "wrap",
          margin: "20px 0",
        }}
      >
        {currentImages.map((src, i) => (
          <img
            key={i}
            src={src}
            alt="product"
            style={{ width: 120, height: 120, objectFit: "cover" }}
          />
        ))}
      </div>

      <div>
        <button onClick={prev} disabled={page === 0} style={{ margin: 5 }}>
          Previous
        </button>
        <button onClick={next} disabled={page >= totalPages - 1} style={{ margin: 5 }}>
          Next
        </button>
      </div>
    </div>
  );
}

