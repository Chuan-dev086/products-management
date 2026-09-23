function ProductCard({ product, onEdit }) {
  const { _id, name, description, price, category, imageUrl } = product;

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden w-full h-40 flex hover:border-slate-300 transition-colors duration-200">
      {/* 🖼️ Product Image Asset Container */}
      <div className="flex-shrink-0 p-2 w-36 h-full bg-slate-50 border-r border-slate-100 justify-center relative flex items-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-contain mix-blend-multiply transition-opacity duration-200"
            onError={(e) => {
              // Fallback if image path breaks or fails to load
              e.target.onerror = null;
              e.target.parentElement.innerHTML = `<span class="text-xs text-slate-400 font-medium">No Image</span>`;
            }}
          />
        ) : (
          /* Sleek alternative layout block if no image asset exists */
          <div className="flex-col gap-1 text-slate-400 flex items-center">
            <svg
              className="w-5 h-5 opacity-70"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
            <span className="text-[10px] font-medium tracking-wide uppercase">
              No Media
            </span>
          </div>
        )}
      </div>

      {/* 📝 Content & Info Area */}
      <div className="flex-col flex-1 p-4 min-w-0 flex">
        <div className="gap-2 mb-1 justify-between flex items-center">
          <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-semibold rounded uppercase tracking-wider">
            {category}
          </span>
          <span className="text-[10px] text-slate-400 font-mono">
            ID: {_id.slice(-6)}
          </span>
        </div>

        <h3
          className="font-semibold text-slate-900 text-sm leading-tight truncate"
          title={name}
        >
          {name}
        </h3>

        <span className="mt-0.5 mb-1.5 font-bold text-slate-900 text-sm block">
          ${price.toFixed(2)}
        </span>

        <p className="flex-1 text-xs text-slate-500 line-clamp-2 pr-2">
          {description}
        </p>

        {/* 🛠️ Action Control Bar */}
        <div className="gap-3 mt-2 pt-2 justify-end border-t border-slate-50 flex">
          <button
            onClick={() => onEdit(product)}
            className="gap-1 text-xs font-medium text-indigo-600 flex items-center hover:text-indigo-700 transition-colors"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
            Edit
          </button>

          <button
            onClick={() => onDelete(_id)}
            className="gap-1 text-xs font-medium text-red-600 flex items-center hover:text-red-700 transition-colors"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
