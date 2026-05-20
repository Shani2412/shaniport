import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, ChevronDown, Grid2X2, List, X } from 'lucide-react';
import { products, categories } from '../data/dummy';
import ProductCard from '../components/product/ProductCard';
import { ProductSkeleton } from '../components/common/Skeleton';

const sortOptions = ['Relevance', 'Price: Low to High', 'Price: High to Low', 'Best Rated', 'Newest'];
const priceRanges = ['Under ₹50', '₹50 - ₹200', '₹200 - ₹500', 'Above ₹500'];

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('Relevance');
  const [filters, setFilters] = useState({ categories: [], price: '', badges: [] });
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 8;

  const searchQ = searchParams.get('search') || '';
  const catQ = searchParams.get('category') || '';

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [searchQ, catQ, sort, filters]);

  let filtered = [...products];
  if (searchQ) filtered = filtered.filter(p => p.name.toLowerCase().includes(searchQ.toLowerCase()) || p.category.toLowerCase().includes(searchQ.toLowerCase()));
  if (catQ) filtered = filtered.filter(p => p.category.toLowerCase().includes(catQ.toLowerCase()) || p.name.toLowerCase().includes(catQ.toLowerCase()));
  if (filters.categories.length) filtered = filtered.filter(p => filters.categories.includes(p.category));
  if (filters.badges.length) filtered = filtered.filter(p => filters.badges.includes(p.badge));
  if (sort === 'Price: Low to High') filtered.sort((a, b) => a.price - b.price);
  else if (sort === 'Price: High to Low') filtered.sort((a, b) => b.price - a.price);
  else if (sort === 'Best Rated') filtered.sort((a, b) => b.rating - a.rating);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paged = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  const toggleCat = (name) => setFilters(f => ({ ...f, categories: f.categories.includes(name) ? f.categories.filter(c => c !== name) : [...f.categories, name] }));
  const toggleBadge = (b) => setFilters(f => ({ ...f, badges: f.badges.includes(b) ? f.badges.filter(x => x !== b) : [...f.badges, b] }));

  const Sidebar = () => (
    <aside className="space-y-6">
      <div>
        <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map(cat => (
            <label key={cat.id} className="flex items-center gap-2.5 cursor-pointer group">
              <input type="checkbox" checked={filters.categories.includes(cat.name)} onChange={() => toggleCat(cat.name)}
                className="w-4 h-4 accent-green-600 rounded" />
              <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">{cat.name}</span>
              <span className="ml-auto text-xs text-gray-400 bg-gray-100 dark:bg-gray-700 px-1.5 rounded-full">{cat.count}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Price Range</h3>
        <div className="space-y-2">
          {priceRanges.map(r => (
            <label key={r} className="flex items-center gap-2.5 cursor-pointer group">
              <input type="radio" name="price" checked={filters.price === r} onChange={() => setFilters(f => ({ ...f, price: r }))}
                className="w-4 h-4 accent-green-600" />
              <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-green-600 transition-colors">{r}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Labels</h3>
        <div className="flex flex-wrap gap-2">
          {['Organic', 'Premium', 'Fresh', 'Best Seller', 'Seasonal'].map(b => (
            <button key={b} onClick={() => toggleBadge(b)}
              className={`px-3 py-1 text-xs rounded-full border transition-all ${filters.badges.includes(b) ? 'bg-green-600 text-white border-green-600' : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-green-400'}`}>
              {b}
            </button>
          ))}
        </div>
      </div>

      <button onClick={() => setFilters({ categories: [], price: '', badges: [] })}
        className="w-full py-2 text-sm text-red-500 hover:text-red-600 border border-red-200 hover:border-red-300 rounded-xl transition-colors">
        Clear All Filters
      </button>
    </aside>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white">
            {catQ || searchQ ? `Results for "${catQ || searchQ}"` : 'All Products'}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{filtered.length} products found</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <div className="hidden lg:block w-60 shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 sticky top-24">
              <Sidebar />
            </div>
          </div>

          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <button onClick={() => setFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300">
                <SlidersHorizontal className="w-4 h-4" /> Filters
                {(filters.categories.length + filters.badges.length + (filters.price ? 1 : 0)) > 0 && (
                  <span className="w-5 h-5 bg-green-600 text-white rounded-full text-xs flex items-center justify-center">
                    {filters.categories.length + filters.badges.length + (filters.price ? 1 : 0)}
                  </span>
                )}
              </button>
              <div className="flex items-center gap-2 ml-auto">
                <select value={sort} onChange={e => setSort(e.target.value)}
                  className="px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-green-400 text-gray-700 dark:text-gray-300">
                  {sortOptions.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>

            {/* Products grid */}
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)}
              </div>
            ) : paged.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">🌿</div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">No products found</h3>
                <p className="text-gray-400">Try adjusting your filters or search query</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                {paged.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
              </div>
            )}

            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
                  className="px-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 disabled:opacity-40 hover:border-green-400 transition-colors text-gray-700 dark:text-gray-300">
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                  <button key={n} onClick={() => setCurrentPage(n)}
                    className={`w-9 h-9 text-sm rounded-xl font-medium transition-all ${n === currentPage ? 'bg-green-600 text-white' : 'border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-green-400'}`}>
                    {n}
                  </button>
                ))}
                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                  className="px-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 disabled:opacity-40 hover:border-green-400 transition-colors text-gray-700 dark:text-gray-300">
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {filtersOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 bg-black/50" onClick={() => setFiltersOpen(false)}>
          <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} onClick={e => e.stopPropagation()}
            className="absolute left-0 top-0 bottom-0 w-72 bg-white dark:bg-gray-800 p-5 overflow-y-auto">
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200">Filters</h3>
              <button onClick={() => setFiltersOpen(false)} className="p-1 text-gray-500"><X className="w-5 h-5" /></button>
            </div>
            <Sidebar />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
