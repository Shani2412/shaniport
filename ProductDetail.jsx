import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw, CheckCircle2, Minus, Plus } from 'lucide-react';
import { products, vendors } from '../data/dummy';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/product/ProductCard';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id)) || products[0];
  const vendor = vendors.find(v => v.id === product.vendorId) || vendors[0];
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const { addToCart, wishlist, toggleWishlist } = useApp();
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [addedAnim, setAddedAnim] = useState(false);

  const imgs = [product.image, product.image, product.image];
  const isWished = wishlist.includes(product.id);
  const discount = Math.round((1 - product.price / product.originalPrice) * 100);

  const handleAdd = () => {
    addToCart({ ...product, quantity: qty });
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-sm text-gray-500 dark:text-gray-400">
          <Link to="/" className="hover:text-green-600">Home</Link> /
          <Link to="/products" className="mx-1 hover:text-green-600">Products</Link> /
          <span className="ml-1 text-gray-800 dark:text-gray-200">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
          {/* Image gallery */}
          <div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative rounded-2xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
              <img src={imgs[activeImg]} alt={product.name} className="w-full h-80 sm:h-96 object-cover" />
              {discount > 0 && <span className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full">-{discount}%</span>}
              <button onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-colors ${isWished ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500'}`}>
                <Heart className="w-5 h-5" fill={isWished ? 'currentColor' : 'none'} />
              </button>
            </motion.div>
            <div className="flex gap-2 mt-3">
              {imgs.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  className={`w-20 h-16 rounded-xl overflow-hidden border-2 transition-all ${activeImg === i ? 'border-green-500' : 'border-transparent'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div>
            <p className="text-green-600 dark:text-green-400 text-sm font-medium mb-1">{product.category} · {product.vendor}</p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">{product.name}</h1>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{product.rating}</span>
              <span className="text-sm text-gray-400">({product.reviews} reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">₹{product.price}</span>
              <span className="text-gray-400 text-sm">{product.unit}</span>
              {product.originalPrice && <span className="text-gray-400 line-through text-lg">₹{product.originalPrice}</span>}
              {discount > 0 && <span className="text-green-600 font-semibold text-sm">Save {discount}%</span>}
            </div>

            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">{product.description}</p>

            {/* Quantity + Add to cart */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center border border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Minus className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>
                <span className="px-4 py-2.5 font-semibold text-gray-800 dark:text-gray-200 min-w-12 text-center">{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="px-3 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Plus className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
              <motion.button onClick={handleAdd}
                whileTap={{ scale: 0.97 }}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all shadow-md ${addedAnim ? 'bg-green-500' : 'bg-green-600 hover:bg-green-700'} text-white`}>
                {addedAnim ? <><CheckCircle2 className="w-5 h-5" /> Added!</> : <><ShoppingCart className="w-5 h-5" /> Add to Cart</>}
              </motion.button>
            </div>

            {/* Assurances */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              {[{ icon: Truck, text: 'Free Delivery', sub: 'Above ₹500' }, { icon: Shield, text: 'Fresh Guarantee', sub: '100% assured' }, { icon: RotateCcw, text: 'Easy Returns', sub: '7-day policy' }].map(({ icon: Icon, text, sub }) => (
                <div key={text} className="text-center">
                  <Icon className="w-5 h-5 text-green-600 dark:text-green-400 mx-auto mb-1" />
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">{text}</p>
                  <p className="text-xs text-gray-400">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vendor card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 mb-10">
          <h2 className="font-semibold text-gray-900 dark:text-white mb-4">About the Vendor</h2>
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-green-100 dark:bg-green-900/40 rounded-2xl flex items-center justify-center text-3xl">{vendor.logo}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-gray-900 dark:text-white">{vendor.name}</h3>
                {vendor.verified && <CheckCircle2 className="w-4 h-4 text-green-500" />}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">📍 {vendor.location} · Member since {vendor.joined}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{vendor.description}</p>
              <div className="flex gap-6 mt-3">
                <div><span className="font-bold text-gray-900 dark:text-white">{vendor.products}</span><span className="text-xs text-gray-400 ml-1">Products</span></div>
                <div><span className="font-bold text-gray-900 dark:text-white">{vendor.sales.toLocaleString()}</span><span className="text-xs text-gray-400 ml-1">Sales</span></div>
                <div className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /><span className="font-bold text-gray-900 dark:text-white">{vendor.rating}</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div>
            <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-6">Related Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
