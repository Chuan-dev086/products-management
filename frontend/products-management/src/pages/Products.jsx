import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router";
import ProductModal from "../components/ProductModal";
import api from "../utils/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const userToken = localStorage.getItem("token");
        // console.log(userToken);
        if (userToken == null) throw new Error("User Token is unavailable");

        const response = await axios.get("http://localhost:3000/products", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        setProducts(response.data);
      } catch (error) {
        // console.log(error);
        localStorage.removeItem("token");
        navigate("/");
      }
    };
    getAllProducts();
  }, []);

  useEffect(() => {
    // console.log(products);
  }, [products]);

  const onLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleOpenAddForm = () => {
    setCurrentProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEditForm = (product) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const handleAddSave = async (payload) => {
    try {
      const response = await api.post("/products", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data);
      // OPTIONAL FIX: Use the response data (which usually includes the database ID)
      // instead of the raw payload, so your UI has the correct item IDs.
      setProducts([...products, response.data]);
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to add product. Please check your connection.");
    }
  };

  return (
    <>
      <div className="flex-col min-h-screen bg-slate-50 flex">
        {/* Top Management Header */}
        <header className="px-6 py-4 top-0 z-10 bg-white border-b border-slate-200 sticky">
          <div className="gap-4 max-w-7xl mx-auto justify-between flex items-center">
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                Inventory Management
              </h1>
              <p className="mt-0.5 text-xs text-slate-500">
                Manage details, categories, and pricing for {products.length}{" "}
                listed items.
              </p>
            </div>

            <div className="gap-3 flex items-center">
              {/* Create Trigger */}
              <button
                onClick={handleOpenAddForm}
                className="gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-xl flex items-center hover:bg-slate-800 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                Add Product
              </button>

              <button
                onClick={onLogout}
                className="px-4 py-2 text-sm font-medium text-slate-600 border border-slate-200 rounded-xl bg-white hover:text-slate-900 transition-all duration-150 hover:bg-slate-50"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Main Admin Space */}
        <main className="flex-1 p-6">
          <div className="grid grid-cols-1 gap-4 max-w-7xl mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onEdit={handleOpenEditForm}
                // onDelete={onDeleteProduct}
              />
            ))}
          </div>
        </main>
      </div>
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddSave}
        editingProduct={currentProduct}
      />
    </>
  );
}
