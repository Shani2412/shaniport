import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, ArrowRight, CheckCircle2 } from 'lucide-react';
import { categories, vendors, testimonials } from '../../data/dummy';

export function FeaturedCategories() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-green-600 dark:text-green-400 text-sm font-semibold uppercase tracking-wider mb-1">Browse</p>
            <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white">Featured Categories</h2>
          </div>
          <Link to="/products" className="flex items-center gap-1 text-sm font-medium text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <motion.div key={cat.id} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Link to={`/products?category=${cat.name}`}
                className="group flex flex-col items-center gap-3 p-5 bg-gray-50 dark:bg-gray-800 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-700 transition-all text-center">
                <div className={`w-14 h-14 bg-gradient-to-br ${cat.color} rounded-2xl flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform`}>
                  {cat.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">{cat.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{cat.count} items</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TopVendors() {
  return (
    <section className="py-16 bg-green-50 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-green-600 dark:text-green-400 text-sm font-semibold uppercase tracking-wider mb-1">Meet</p>
            <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white">Top Vendors</h2>
          </div>
          <Link to="/products" className="flex items-center gap-1 text-sm font-medium text-green-600 hover:text-green-700 dark:text-green-400">
            All vendors <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.map((vendor, i) => (
            <motion.div key={vendor.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all group">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-green-100 dark:bg-green-900/40 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                  {vendor.logo}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm truncate">{vendor.name}</h3>
                    {vendor.verified && <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">📍 {vendor.location}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{vendor.rating}</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">{vendor.description}</p>
              <div className="flex gap-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                <div className="text-center flex-1">
                  <p className="text-base font-bold text-gray-900 dark:text-white">{vendor.products}</p>
                  <p className="text-xs text-gray-400">Products</p>
                </div>
                <div className="text-center flex-1">
                  <p className="text-base font-bold text-gray-900 dark:text-white">{vendor.sales.toLocaleString()}</p>
                  <p className="text-xs text-gray-400">Sales</p>
                </div>
                <Link to={`/products?vendor=${vendor.id}`}
                  className="flex-1 text-xs text-center py-1.5 bg-green-50 dark:bg-green-900/30 hover:bg-green-100 dark:hover:bg-green-900/50 text-green-700 dark:text-green-400 font-medium rounded-lg transition-colors">
                  View Store
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-green-600 dark:text-green-400 text-sm font-semibold uppercase tracking-wider mb-2">Reviews</p>
          <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white">What Our Customers Say</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-3">Trusted by over 24,000 happy customers across India</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={t.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-5 italic">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold">{t.avatar}</div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role} · {t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyUs() {
  const features = [
    { icon: '🌱', title: 'Certified Organic', desc: 'All products verified by national organic certification bodies.' },
    { icon: '🚚', title: 'Farm-to-Door Delivery', desc: 'Fresh produce delivered within 24 hours of harvest.' },
    { icon: '💰', title: 'Fair Farm Prices', desc: 'We ensure farmers get paid fairly for their hard work.' },
    { icon: '🔒', title: 'Secure Payments', desc: 'Multiple payment options with bank-grade security.' },
  ];
  return (
    <section className="py-16 bg-gradient-to-br from-green-800 to-green-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold text-white mb-3">Why Choose Gropart?</h2>
          <p className="text-green-200">We're committed to connecting you with the freshest produce sustainably</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="text-center p-6 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm">
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-white font-semibold mb-2">{f.title}</h3>
              <p className="text-green-200 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
