import { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Package, ShoppingBag, BarChart2, PlusCircle, Settings, LogOut, TrendingUp, Star, DollarSign, Menu, X, Edit, Trash2, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { revenueData, vendorProducts, orders } from '../data/dummy';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: Package, label: 'Products', id: 'products' },
  { icon: ShoppingBag, label: 'Orders', id: 'orders' },
  { icon: BarChart2, label: 'Analytics', id: 'analytics' },
  { icon: PlusCircle, label: 'Add Product', id: 'add' },
  { icon: Settings, label: 'Settings', id: 'settings' },
];

const statusColors = { Active: 'text-green-600 bg-green-50 dark:bg-green-900/20', 'Out of Stock': 'text-red-600 bg-red-50 dark:bg-red-900/20', 'Low Stock': 'text-amber-600 bg-amber-50 dark:bg-amber-900/20' };
const orderStatusIcons = { Delivered: CheckCircle, Processing: Clock, Shipped: TrendingUp, Cancelled: X };

export default function VendorDashboard() {
  const [active, setActive] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    { icon: DollarSign, label: 'Total Revenue', value: '₹1,24,500', change: '+23%', color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' },
    { icon: ShoppingBag, label: 'Total Orders', value: '842', change: '+18%', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { icon: Package, label: 'Products', value: '47', change: '+5', color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
    { icon: Star, label: 'Avg Rating', value: '4.9', change: '+0.2', color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20' },
  ];

  const Sidebar = ({ mobile }) => (
    <div className={`${mobile ? 'w-64' : 'w-56'} bg-white dark:bg-gray-800 h-full border-r border-gray-100 dark:border-gray-700 flex flex-col`}>
      <div className="p-5 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 dark:bg-green-900/40 rounded-xl flex items-center justify-center text-2xl">🌱</div>
          <div>
            <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm">Green Farms</p>
            <p className="text-xs text-gray-400">Verified Vendor</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map(({ icon: Icon, label, id }) => (
          <button key={id} onClick={() => { setActive(id); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${active === id ? 'bg-green-600 text-white shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200'}`}>
            <Icon className="w-4 h-4" /> {label}
          </button>
        ))}
      </nav>
      <div className="p-3 border-t border-gray-100 dark:border-gray-700">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden md:block h-full">
        <Sidebar />
      </div>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} className="relative z-10">
            <Sidebar mobile />
          </motion.div>
          <div className="flex-1 bg-black/40" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 text-gray-600 dark:text-gray-400"><Menu className="w-5 h-5" /></button>
            <div>
              <h1 className="font-semibold text-gray-900 dark:text-white capitalize">{active === 'add' ? 'Add New Product' : active}</h1>
              <p className="text-xs text-gray-400">Vendor Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">Store Online</span>
          </div>
        </div>

        <div className="p-6">
          {/* Dashboard */}
          {active === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map(({ icon: Icon, label, value, change, color, bg }, i) => (
                  <motion.div key={label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700">
                    <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3`}>
                      <Icon className={`w-5 h-5 ${color}`} />
                    </div>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">{value}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{label}</p>
                    <p className="text-xs text-green-600 font-medium mt-1">↑ {change} this month</p>
                  </motion.div>
                ))}
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
                <h2 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Revenue Overview</h2>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={revenueData.slice(-6)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
                    <Tooltip formatter={v => [`₹${v.toLocaleString()}`, 'Revenue']} />
                    <Line type="monotone" dataKey="revenue" stroke="#16a34a" strokeWidth={2.5} dot={{ fill: '#16a34a', r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
                <h2 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Recent Orders</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-gray-400 text-xs uppercase">
                        <th className="text-left py-2 pr-4">Order</th>
                        <th className="text-left py-2 pr-4">Customer</th>
                        <th className="text-left py-2 pr-4 hidden sm:table-cell">Date</th>
                        <th className="text-left py-2 pr-4">Total</th>
                        <th className="text-left py-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 4).map(o => {
                        const Icon = orderStatusIcons[o.status] || Clock;
                        return (
                          <tr key={o.id} className="border-t border-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                            <td className="py-3 pr-4 font-medium text-gray-800 dark:text-gray-200">{o.id}</td>
                            <td className="py-3 pr-4 text-gray-600 dark:text-gray-400">{o.customer}</td>
                            <td className="py-3 pr-4 text-gray-400 hidden sm:table-cell">{o.date}</td>
                            <td className="py-3 pr-4 font-semibold text-gray-900 dark:text-white">₹{o.total}</td>
                            <td className="py-3">
                              <span className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full w-fit ${o.status === 'Delivered' ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400' : o.status === 'Processing' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : o.status === 'Cancelled' ? 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                                <Icon className="w-3 h-3" /> {o.status}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Products */}
          {active === 'products' && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="p-5 flex justify-between items-center border-b border-gray-100 dark:border-gray-700">
                <h2 className="font-semibold text-gray-800 dark:text-gray-200">My Products ({vendorProducts.length})</h2>
                <button onClick={() => setActive('add')} className="flex items-center gap-1.5 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-medium transition-colors">
                  <PlusCircle className="w-4 h-4" /> Add New
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 dark:bg-gray-700/50">
                    <tr className="text-gray-500 dark:text-gray-400 text-xs uppercase">
                      <th className="text-left py-3 px-5">Product</th>
                      <th className="text-left py-3 px-4 hidden sm:table-cell">Category</th>
                      <th className="text-left py-3 px-4">Price</th>
                      <th className="text-left py-3 px-4">Stock</th>
                      <th className="text-left py-3 px-4 hidden md:table-cell">Sold</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendorProducts.map(p => (
                      <tr key={p.id} className="border-t border-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                        <td className="py-3.5 px-5 font-medium text-gray-800 dark:text-gray-200">{p.name}</td>
                        <td className="py-3.5 px-4 text-gray-500 dark:text-gray-400 hidden sm:table-cell">{p.category}</td>
                        <td className="py-3.5 px-4 font-semibold text-gray-900 dark:text-white">₹{p.price}</td>
                        <td className="py-3.5 px-4 text-gray-600 dark:text-gray-400">{p.stock}</td>
                        <td className="py-3.5 px-4 text-gray-600 dark:text-gray-400 hidden md:table-cell">{p.sold}</td>
                        <td className="py-3.5 px-4">
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColors[p.status] || ''}`}>{p.status}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex gap-2">
                            <button className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"><Edit className="w-3.5 h-3.5" /></button>
                            <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Add Product */}
          {active === 'add' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 space-y-5">
                <h2 className="font-semibold text-gray-800 dark:text-gray-200">Add New Product</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[['Product Name', 'text', 'e.g. Organic Tomatoes'], ['Price (₹)', 'number', '0'], ['Unit', 'text', 'e.g. /kg, /bundle'], ['Stock Quantity', 'number', '100']].map(([label, type, ph]) => (
                    <div key={label}>
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">{label}</label>
                      <input type={type} placeholder={ph} className="w-full px-3 py-2.5 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-green-400 text-gray-800 dark:text-gray-200" />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Category</label>
                  <select className="w-full px-3 py-2.5 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-green-400 text-gray-800 dark:text-gray-200">
                    {['Vegetables', 'Fruits', 'Grains', 'Dairy', 'Spices', 'Honey'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Description</label>
                  <textarea rows={3} placeholder="Describe your product..." className="w-full px-3 py-2.5 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-green-400 text-gray-800 dark:text-gray-200 resize-none" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Product Images</label>
                  <div className="border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-xl p-8 text-center hover:border-green-400 transition-colors cursor-pointer">
                    <div className="text-3xl mb-2">📷</div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-all shadow-md">Publish Product</button>
                  <button className="px-5 py-3 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 rounded-xl font-medium hover:border-green-400 transition-colors">Save Draft</button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Analytics */}
          {active === 'analytics' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
                <h2 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Monthly Revenue & Orders</h2>
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                    <YAxis yAxisId="left" tick={{ fontSize: 11 }} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#16a34a" strokeWidth={2.5} dot={false} name="Revenue" />
                    <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#f97316" strokeWidth={2} dot={false} name="Orders" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {(active === 'orders' || active === 'settings') && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 text-center">
              <div className="text-5xl mb-3">{active === 'orders' ? '📦' : '⚙️'}</div>
              <h3 className="font-semibold text-gray-800 dark:text-gray-200">{active === 'orders' ? 'Order Management' : 'Settings'}</h3>
              <p className="text-gray-400 text-sm mt-1">This section is fully functional in the complete version.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
