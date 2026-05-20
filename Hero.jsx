import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Star, Package, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const stats = [
  { icon: Package, value: '50,000+', label: 'Products' },
  { icon: Users, value: '10,000+', label: 'Farmers' },
  { icon: Star, value: '4.9', label: 'Avg Rating' },
];

const tags = ['Organic Tomatoes', 'Alphonso Mangoes', 'Basmati Rice', 'Raw Honey', 'Free-range Eggs'];

export default function Hero() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden grain">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-800 to-emerald-900">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(34,197,94,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(16,185,129,0.1) 0%, transparent 50%)' }} />
        {/* Decorative circles */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-green-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      {/* Floating produce icons */}
      {['🌽', '🍅', '🥬', '🍎', '🌿', '🥕'].map((emoji, i) => (
        <motion.span key={i} className="absolute text-4xl select-none pointer-events-none opacity-20"
          initial={{ y: 0 }} animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
          style={{ left: `${8 + i * 15}%`, top: `${10 + (i % 3) * 25}%` }}>
          {emoji}
        </motion.span>
      ))}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/20 border border-green-500/30 rounded-full text-green-300 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              India's #1 Agriculture Marketplace
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Farm Fresh,<br />
            <span className="text-green-400">Delivered</span> Direct<br />to Your Door
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-green-200 text-lg mb-8 max-w-xl leading-relaxed">
            Shop from thousands of verified farmers and vendors. Organic, fresh, and sustainably grown produce at the best prices.
          </motion.p>

          {/* Search bar */}
          <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={e => { e.preventDefault(); navigate(`/products?search=${search}`); }}
            className="flex gap-2 mb-6 max-w-lg">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search organic tomatoes, honey..."
                className="w-full pl-10 pr-4 py-3.5 bg-white/95 rounded-xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 shadow-lg" />
            </div>
            <button type="submit" className="px-5 py-3 bg-green-500 hover:bg-green-400 text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg transition-all hover:scale-105">
              Search <ArrowRight className="w-4 h-4" />
            </button>
          </motion.form>

          {/* Popular tags */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex flex-wrap gap-2">
            <span className="text-green-300 text-sm">Popular:</span>
            {tags.map(tag => (
              <button key={tag} onClick={() => navigate(`/products?search=${tag}`)}
                className="text-xs px-3 py-1 bg-white/10 hover:bg-white/20 text-green-200 rounded-full border border-white/10 transition-colors">
                {tag}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="flex gap-8 mt-12 pt-12 border-t border-white/10">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                <Icon className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-xl font-bold text-white">{value}</p>
                <p className="text-xs text-green-300">{label}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
