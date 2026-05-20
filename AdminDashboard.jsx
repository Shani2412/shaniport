import { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, Package, ShoppingBag, BarChart2, Settings, DollarSign, TrendingUp, Store, Menu, CheckCircle, Clock, X, Edit, Ban } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { revenueData, categoryData, vendors, orders, adminStats } from '../data/dummy';

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', id: 'overview' },
  { icon: Users, label: 'Users', id: 'users' },
  { icon: Store, label: 'Vendors', id: 'vendors' },
  { icon: ShoppingBag, label: 'Orders', id: 'orders' },
  { icon: Package, label: 'Products', id: 'products' },
  { icon: BarChart2, label: 'Analytics', id: 'analytics' },
  { icon: Settings, label: 'Settings', id: 'settings' },
];

export default function AdminDashboard() {
  const [active, setActive] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    { icon: DollarSign, label: 'Total Revenue', value: `₹${(adminStats.totalRevenue / 100000).toFixed(1)}L`, change: `+${adminStats.revenueGrowth}%`, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' },
    { icon: ShoppingBag, label: 'Total Orders', value: adminStats.totalOrders.toLocaleString(), change: `+${adminStats.ordersGrowth}%`, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { icon: Store, label: 'Vendors', value: adminStats.totalVendors, change: `+${adminStats.vendorGrowth}%`, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
    { icon: Users, label: 'Users', value: adminStats.totalUsers.toLocaleString(), change: `+${adminStats.userGrowth}%`, color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-900/20' },
  ];

  const Sidebar = ({ mobile }) => (
    <div className={`${mobile ? 'w-64' : 'w-56'} bg-gray-900 h-full flex flex-col`}>
      <div className="p-5 border-b border-gray-700">
        <p className="font-display font-bold text-white text-lg">Gro<span className="text-green-400">part</span></p>
        <p className="text-xs text-gray-400 mt-0.5">Admin Panel</p>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map(({ icon: Icon, label, id }) => (
          <button key={id} onClick={() => { setActive(id); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${active === id ? 'bg-green-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}>
            <Icon className="w-4 h-4" /> {label}
          </button>
        ))}
      </nav>
      <div className="p-3 border-t border-gray-700">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-7 h-7 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold">A</div>
          <div>
            <p className="text-xs text-white font-medium">Admin</p>
            <p className="text-xs text-gray-400">admin@gropart.in</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="hidden md:block h-full"><Sidebar /></div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} className="relative z-10"><Sidebar mobile /></motion.div>
          <div className="flex-1 bg-black/60" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        <div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 text-gray-600 dark:text-gray-400"><Menu className="w-5 h-5" /></button>
            <div>
              <h1 className="font-semibold text-gray-900 dark:text-white capitalize">{active === 'overview' ? 'Dashboard Overview' : active}</h1>
              <p className="text-xs text-gray-400">May 20, 2026</p>
            </div>
          </div>
          <span className="px-2.5 py-1 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400 text-xs font-semibold rounded-full">Super Admin</span>
        </div>

        <div className="p-6">
          {active === 'overview' && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map(({ icon: Icon, label, value, change, color, bg }, i) => (
                  <motion.div key={label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700">
                    <div className="flex justify-between items-start mb-3">
                      <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${color}`} />
                      </div>
                      <span className="text-xs text-green-600 font-semibold flex items-center gap-0.5">
                        <TrendingUp className="w-3 h-3" /> {change}
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
                    <p className="text-xs text-gray-400 mt-1">{label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Charts row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
                  <h2 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Revenue Trend (2026)</h2>
                  <ResponsiveContainer width="100%" height={220}>
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#16a34a" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
                      <Tooltip formatter={v => [`₹${v.toLocaleString()}`, 'Revenue']} />
                      <Area type="monotone" dataKey="revenue" stroke="#16a34a" strokeWidth={2.5} fill="url(#rev)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
                  <h2 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Sales by Category</h2>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie data={categoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                        {categoryData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                      </Pie>
                      <Tooltip formatter={v => [`${v}%`, 'Share']} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 gap-1 mt-2">
                    {categoryData.map(c => (
                      <div key={c.name} className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                        <div className="w-2 h-2 rounded-full" style={{ background: c.color }} />
                        {c.name} ({c.value}%)
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent orders */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between">
                  <h2 className="font-semibold text-gray-800 dark:text-gray-200">Recent Orders</h2>
                  <button onClick={() => setActive('orders')} className="text-sm text-green-600 font-medium hover:text-green-700">View all →</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 dark:bg-gray-700/50">
                      <tr className="text-gray-500 dark:text-gray-400 text-xs uppercase">
                        <th className="text-left py-3 px-5">Order ID</th>
                        <th className="text-left py-3 px-4">Customer</th>
                        <th className="text-left py-3 px-4 hidden md:table-cell">Date</th>
                        <th className="text-left py-3 px-4">Amount</th>
                        <th className="text-left py-3 px-4 hidden sm:table-cell">Payment</th>
                        <th className="text-left py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(o => (
                        <tr key={o.id} className="border-t border-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                          <td className="py-3.5 px-5 font-mono text-xs text-gray-600 dark:text-gray-400">{o.id}</td>
                          <td className="py-3.5 px-4 font-medium text-gray-800 dark:text-gray-200">{o.customer}</td>
                          <td className="py-3.5 px-4 text-gray-400 hidden md:table-cell">{o.date}</td>
                          <td className="py-3.5 px-4 font-bold text-gray-900 dark:text-white">₹{o.total}</td>
                          <td className="py-3.5 px-4 text-gray-500 dark:text-gray-400 hidden sm:table-cell">{o.payment}</td>
                          <td className="py-3.5 px-4">
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${o.status === 'Delivered' ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400' : o.status === 'Processing' ? 'bg-blue-50 text-blue-700' : o.status === 'Cancelled' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'}`}>
                              {o.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {active === 'vendors' && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="p-5 border-b border-gray-100 dark:border-gray-700">
                <h2 className="font-semibold text-gray-800 dark:text-gray-200">Vendor Management ({vendors.length})</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 dark:bg-gray-700/50">
                    <tr className="text-gray-500 dark:text-gray-400 text-xs uppercase">
                      <th className="text-left py-3 px-5">Vendor</th>
                      <th className="text-left py-3 px-4 hidden sm:table-cell">Location</th>
                      <th className="text-left py-3 px-4">Products</th>
                      <th className="text-left py-3 px-4 hidden md:table-cell">Sales</th>
                      <th className="text-left py-3 px-4">Rating</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendors.map(v => (
                      <tr key={v.id} className="border-t border-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30">
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/40 rounded-xl flex items-center justify-center text-lg">{v.logo}</div>
                            <div>
                              <p className="font-medium text-gray-800 dark:text-gray-200">{v.name}</p>
                              <p className="text-xs text-gray-400">Since {v.joined}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-gray-500 dark:text-gray-400 hidden sm:table-cell">{v.location}</td>
                        <td className="py-3.5 px-4 text-gray-600 dark:text-gray-400">{v.products}</td>
                        <td className="py-3.5 px-4 font-semibold text-gray-700 dark:text-gray-300 hidden md:table-cell">{v.sales.toLocaleString()}</td>
                        <td className="py-3.5 px-4">
                          <span className="flex items-center gap-1 text-amber-600 font-semibold">⭐ {v.rating}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          {v.verified ? (
                            <span className="flex items-center gap-1 text-xs text-green-700 bg-green-50 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full"><CheckCircle className="w-3 h-3" /> Verified</span>
                          ) : (
                            <span className="flex items-center gap-1 text-xs text-amber-700 bg-amber-50 px-2 py-1 rounded-full"><Clock className="w-3 h-3" /> Pending</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex gap-1.5">
                            <button className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"><Edit className="w-3.5 h-3.5" /></button>
                            <button className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"><Ban className="w-3.5 h-3.5" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {!['overview', 'vendors'].includes(active) && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-10 border border-gray-100 dark:border-gray-700 text-center">
              <div className="text-5xl mb-3">🔧</div>
              <h3 className="font-semibold text-gray-700 dark:text-gray-300 text-lg">{active.charAt(0).toUpperCase() + active.slice(1)} Management</h3>
              <p className="text-gray-400 text-sm mt-2">Full feature available in the production build.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
