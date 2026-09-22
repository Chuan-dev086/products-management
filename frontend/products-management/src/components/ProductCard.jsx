function ProductCard({ product }) {
  console.log(product);
  const { name, description, price, category, imageUrl } = product;

  return (
    <div className="flex-col overflow-hidden bg-white border border-slate-100 rounded-2xl shadow-sm w-full max-w-sm flex hover:shadow-md transition-shadow duration-300">
      {/* Visual Placeholder / Category Badge */}
      <div className="p-6 bg-slate-50 h-48 justify-center border-b border-slate-50 relative flex items-center">
        <span className="px-2.5 py-1 top-4 bg-slate-900/5 text-slate-800 text-xs font-semibold rounded-full absolute left-4 backdrop-blur-md uppercase tracking-wider">
          {category}
        </span>
        {/* Simple placeholder icon style using the first letter */}
        <div className=" rounded-2xl bg-indigo-50 justify-center text-indigo-600 text-2xl font-bold shadow-sm flex items-center">
          <img src={imageUrl} alt="Product Image" />
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-col flex-1 p-5 flex">
        <div className="gap-2 mb-2 justify-between flex items-start">
          <h3 className="font-semibold text-slate-900 text-lg leading-snug line-clamp-1">
            {name}
          </h3>
          <span className="font-bold text-indigo-600 text-lg whitespace-nowrap">
            ${price.toFixed(2)}
          </span>
        </div>

        <p className="flex-1 mb-5 text-sm text-slate-500 line-clamp-2">
          {description}
        </p>

        {/* Action Button */}
        <button className="py-2.5 px-4 w-full bg-slate-900 text-white font-medium rounded-xl text-sm hover:bg-slate-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
