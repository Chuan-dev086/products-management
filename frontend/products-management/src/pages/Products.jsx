import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router";

export default function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const userToken = localStorage.getItem("token");
        console.log(userToken);
        if (userToken == null) throw new Error("User Token is unavailable");

        const response = await axios.get("http://localhost:3000/products", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.log(error);
        localStorage.removeItem("token");
        navigate("/");
      }
    };
    getAllProducts();
  }, []);

  useEffect(() => {
    console.log(products);
  }, [products]);

  const onLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation Header */}
      <header className="px-6 py-4 top-0 z-10 bg-white/80 border-b border-slate-100 sticky backdrop-blur-md">
        <div className="max-w-7xl mx-auto justify-between flex items-center">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Storefront
          </h1>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="gap-2 px-4 py-2 text-sm font-medium text-slate-600 border border-slate-200 rounded-xl flex items-center hover:text-red-600 hover:bg-red-50 hover:border-red-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            {/* Simple Logout Icon */}
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </button>
        </div>
      </header>

      {/* Main Grid Content */}
      <main className="p-6">
        <div className="grid grid-cols-1 gap-6 max-w-7xl mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}
