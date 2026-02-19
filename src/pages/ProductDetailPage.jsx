import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ProductDetailPage() {
  const { id } = useParams(); // prende l'id dalla URL

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Errore nel recupero dettaglio prodotto");
        }
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Caricamento...</p>;
  if (error) return <p>❌ {error}</p>;

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            {/* header */}
            <div className="d-flex align-items-center justify-content-between mb-4">
              <div>
                <h1 className="h4 mb-1">Dettaglio prodotto</h1>
                <div className="text-muted small">ID: {id}</div>
              </div>

              <Link to="/Prodotti" className="btn btn-outline-secondary">
                ← Torna ai prodotti
              </Link>
            </div>

            {/* card */}
            <div className="card shadow-sm border-0 overflow-hidden">
              <div className="row g-0">
                {/* immagine */}
                <div className="col-12 col-lg-5 bg-white d-flex align-items-center justify-content-center p-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="img-fluid"
                    style={{ maxHeight: "360px", objectFit: "contain" }}
                  />
                </div>

                {/* testo */}
                <div className="col-12 col-lg-7">
                  <div className="p-4 p-lg-5">
                    <span className="badge bg-secondary mb-3">
                      {product.category}
                    </span>

                    <h2 className="h3 mb-3">{product.title}</h2>

                    <div className="fs-3 fw-bold mb-3">{product.price} €</div>

                    <p
                      className="text-secondary mb-0"
                      style={{ lineHeight: 1.7 }}
                    >
                      {product.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
