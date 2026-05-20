import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Search, Menu, X, Sun, Moon, ChevronDown, Heart, User, Leaf } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { categories } from '../../data/dummy';

export default function Navbar() {
  const { darkMode, toggleDark, cartCount } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchVal.trim()) navigate(`/products?search=${searchVal}`);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-green-100 dark:border-green-900 shadow-sm">
      {/* Top bar */}
      <div className="bg-green-700 text-white text-xs py-1.5 text-center">
        🌿 Free delivery on orders above ₹500 | Use code <strong>FRESH10</strong> for 10% off
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-xl font-bold text-green-800 dark:text-green-400">Gro<span className="text-green-500">part</span></span>
          </Link>

          {/* Categories dropdown */}
          <div className="hidden md:block relative" onMouseEnter={() => setCatOpen(true)} onMouseLeave={() => setCatOpen(false)}>
            <button className="flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-green-600 px-3 py-2 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/30 transition-all">
              Categories <ChevronDown className={`w-4 h-4 transition-transform ${catOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {catOpen && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-green-100 dark:border-green-900 overflow-hidden z-50">
                  {categories.map(cat => (
                    <Link key={cat.id} to={`/products?category=${cat.name}`}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors text-sm text-gray-700 dark:text-gray-300">
                      <span className="text-lg">{cat.icon}</span>
                      <span>{cat.name}</span>
                      <span className="ml-auto text-xs text-gray-400 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded-full">{cat.count}</span>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-4 relative">
            <input value={searchVal} onChange={e => setSearchVal(e.target.value)}
              placeholder="Search fresh vegetables, fruits..."
              className="w-full pl-4 pr-10 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-green-400 dark:focus:border-green-500 text-gray-800 dark:text-gray-200 placeholder-gray-400 transition-all" />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors">
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <button onClick={toggleDark} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-all">
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <Link to="/wishlist" className="hidden sm:flex p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-all">
              <Heart className="w-4 h-4" />
            </Link>
            <Link to="/cart" className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-all">
              <ShoppingCart className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 text-white text-xs rounded-full flex items-center justify-center font-bold">{cartCount}</span>
              )}
            </Link>
            <div className="hidden sm:flex items-center gap-1 ml-2">
              <Link to="/login" className="px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-green-600 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/30 transition-all">Login</Link>
              <Link to="/register" className="px-3 py-1.5 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-sm transition-all">Register</Link>
            </div>
            <Link to="/vendor" className="hidden lg:flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-green-700 dark:text-green-400 border border-green-200 dark:border-green-700 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/30 transition-all ml-1">
              <User className="w-3.5 h-3.5" /> Vendor
            </Link>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-all ml-1">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
            <div className="px-4 py-4 space-y-3">
              <form onSubmit={handleSearch} className="relative">
                <input value={searchVal} onChange={e => setSearchVal(e.target.value)} placeholder="Search products..."
                  className="w-full pl-4 pr-10 py-2.5 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-green-400 text-gray-800 dark:text-gray-200" />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><Search className="w-4 h-4" /></button>
              </form>
              <div className="grid grid-cols-2 gap-2">
                {categories.slice(0, 6).map(cat => (
                  <Link key={cat.id} to={`/products?category=${cat.name}`} onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors">
                    <span>{cat.icon}</span>{cat.name}
                  </Link>
                ))}
              </div>
              <div className="flex gap-2 pt-1">
                <Link to="/login" onClick={() => setMobileOpen(false)} className="flex-1 py-2 text-center text-sm font-medium border border-green-200 rounded-xl text-green-700 hover:bg-green-50 transition-colors">Login</Link>
                <Link to="/register" onClick={() => setMobileOpen(false)} className="flex-1 py-2 text-center text-sm font-medium bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors">Register</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
