import { Link } from 'react-router-dom';
import { Leaf, Share2, MessageCircle, Rss, Send, Phone, Mail, MapPin, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-green-900 dark:bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-green-500 rounded-xl flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="font-display text-xl font-bold">Gropart</span>
            </div>
            <p className="text-green-200 text-sm leading-relaxed mb-5">India's premium multi-vendor agriculture marketplace. Connecting farmers directly to your table.</p>
            <div className="flex gap-3">
              {[Share2, MessageCircle, Rss, Send].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 bg-green-800 hover:bg-green-500 rounded-lg flex items-center justify-center transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-green-400">Quick Links</h4>
            <ul className="space-y-2">
              {['About Us', 'Our Farms', 'Blog', 'Careers', 'Press'].map(l => (
                <li key={l}><a href="#" className="text-sm text-green-200 hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-green-400">Categories</h4>
            <ul className="space-y-2">
              {['Fresh Vegetables', 'Organic Fruits', 'Dairy & Eggs', 'Grains & Cereals', 'Herbs & Spices'].map(c => (
                <li key={c}><Link to={`/products?category=${c}`} className="text-sm text-green-200 hover:text-white transition-colors">{c}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-green-400">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-green-200"><Phone className="w-4 h-4 mt-0.5 text-green-400 shrink-0" /><span>+91 98765 43210<br/>Mon–Sat, 9am–7pm</span></li>
              <li className="flex items-start gap-2 text-sm text-green-200"><Mail className="w-4 h-4 mt-0.5 text-green-400 shrink-0" /><span>support@gropart.in</span></li>
              <li className="flex items-start gap-2 text-sm text-green-200"><MapPin className="w-4 h-4 mt-0.5 text-green-400 shrink-0" /><span>Bandra West, Mumbai<br/>Maharashtra, 400050</span></li>
            </ul>
            <div className="mt-5">
              <p className="text-xs text-green-400 mb-2 font-medium">NEWSLETTER</p>
              <div className="flex gap-1">
                <input placeholder="your@email.com" className="flex-1 bg-green-800 border border-green-700 rounded-lg px-3 py-2 text-sm text-white placeholder-green-500 focus:outline-none focus:border-green-400" />
                <button className="px-3 py-2 bg-green-500 hover:bg-green-400 rounded-lg text-sm font-medium transition-colors">Join</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-green-800 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-green-400">
          <span>© 2026 Gropart. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
