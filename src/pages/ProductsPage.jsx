import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Errore nel recupero prodotti");
        }
        return res.json();
      })
      .then((data) => {
        console.log("DATI:", data); // debug
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Caricamento...</p>;
  if (error) return <p>❌ {error}</p>;

  return (
    <div className="container-fluid px-4">
      <h1 className="mb-4 text-center">Prodotti</h1>

      <div className="row justify-content-center g-4">
        {products.map((p) => {
          return (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={p.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={p.image}
                  alt={p.title}
                  className="card-img-top p-3"
                  style={{ height: "180px", objectFit: "contain" }}
                />

                <div className="card-body d-flex flex-column text-center">
                  <h6 className="card-title">{p.title}</h6>
                  <p className="fw-bold mt-auto">{p.price} €</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
