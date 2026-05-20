import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Eye } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function ProductCard({ product, index = 0 }) {
  const { addToCart, wishlist, toggleWishlist } = useApp();
  const isWished = wishlist.includes(product.id);
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }}
      className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300">
      <div className="relative overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-1 flex-col">
          {product.badge && (
            <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-semibold rounded-full">{product.badge}</span>
          )}
          {discount > 0 && (
            <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-semibold rounded-full">-{discount}%</span>
          )}
        </div>

        {/* Actions overlay */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => toggleWishlist(product.id)}
            className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-colors ${isWished ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500'}`}>
            <Heart className="w-4 h-4" fill={isWished ? 'currentColor' : 'none'} />
          </button>
          <Link to={`/product/${product.id}`}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors">
            <Eye className="w-4 h-4" />
          </Link>
        </div>

        {!product.inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white text-gray-800 text-sm font-semibold px-3 py-1 rounded-full">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <p className="text-xs text-green-600 dark:text-green-400 font-medium mb-1">{product.category} · {product.vendor}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-sm leading-snug mb-2 hover:text-green-600 dark:hover:text-green-400 transition-colors line-clamp-2">{product.name}</h3>
        </Link>

        <div className="flex items-center gap-1 mb-3">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{product.rating}</span>
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-gray-900 dark:text-white">₹{product.price}</span>
            <span className="text-xs text-gray-400 ml-1">{product.unit}</span>
            {product.originalPrice && (
              <div className="text-xs text-gray-400 line-through">₹{product.originalPrice}</div>
            )}
          </div>
          <button onClick={() => product.inStock && addToCart(product)} disabled={!product.inStock}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${product.inStock ? 'bg-green-600 hover:bg-green-700 text-white shadow-sm hover:shadow-md' : 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'}`}>
            <ShoppingCart className="w-3.5 h-3.5" /> Add
          </button>
        </div>
      </div>
    </motion.div>
  );
}
