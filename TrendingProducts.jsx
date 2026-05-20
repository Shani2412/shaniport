import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame } from 'lucide-react';
import { products } from '../../data/dummy';
import ProductCard from '../product/ProductCard';

const tabs = ['All', 'Vegetables', 'Fruits', 'Grains', 'Dairy'];

export default function TrendingProducts() {
  const [activeTab, setActiveTab] = useState('All');

  const filtered = activeTab === 'All' ? products.slice(0, 8) :
    products.filter(p => p.category.toLowerCase().includes(activeTab.toLowerCase())).slice(0, 8);

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-green-600 dark:text-green-400 text-sm font-semibold uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Flame className="w-4 h-4" /> Trending
            </p>
            <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white">Popular Products</h2>
          </div>
          <Link to="/products" className="flex items-center gap-1 text-sm font-medium text-green-600 hover:text-green-700 dark:text-green-400 shrink-0">
            View all products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-xl transition-all whitespace-nowrap ${activeTab === tab ? 'bg-green-600 text-white shadow-sm' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600'}`}>
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
