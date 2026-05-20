import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ChevronRight, Tag, CreditCard, Smartphone, Building2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Cart() {
  const { cart, removeFromCart, updateQty, cartTotal } = useApp();
  const [step, setStep] = useState(1); // 1=cart, 2=address, 3=payment
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [payMethod, setPayMethod] = useState('upi');

  const delivery = cartTotal > 500 ? 0 : 60;
  const discount = couponApplied ? Math.round(cartTotal * 0.1) : 0;
  const total = cartTotal + delivery - discount;

  const stepTitles = ['Cart', 'Address', 'Payment'];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {step === 1 ? 'Shopping Cart' : step === 2 ? 'Delivery Address' : 'Payment'}
        </h1>

        {/* Steps */}
        <div className="flex items-center gap-2 mb-8">
          {stepTitles.map((t, i) => (
            <div key={t} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step > i + 1 ? 'bg-green-600 text-white' : step === i + 1 ? 'bg-green-600 text-white ring-4 ring-green-100 dark:ring-green-900' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>{i + 1}</div>
              <span className={`text-sm font-medium hidden sm:block ${step === i + 1 ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`}>{t}</span>
              {i < 2 && <ChevronRight className="w-4 h-4 text-gray-300 mx-1" />}
            </div>
          ))}
        </div>

        {cart.length === 0 && step === 1 ? (
          <div className="text-center py-20">
            <ShoppingBag className="w-16 h-16 text-gray-200 dark:text-gray-700 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Your cart is empty</h3>
            <p className="text-gray-400 mb-6">Add some fresh produce to get started</p>
            <Link to="/products" className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-colors">Browse Products</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-4">
              {step === 1 && (
                <>
                  {cart.map((item, i) => (
                    <motion.div key={item.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                      className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 flex gap-4">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-400 mb-0.5">{item.vendor}</p>
                        <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm truncate">{item.name}</h3>
                        <p className="text-green-600 dark:text-green-400 font-bold mt-1">₹{item.price}<span className="text-gray-400 font-normal text-xs">{item.unit}</span></p>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
                            <button onClick={() => updateQty(item.id, -1)} className="px-2 py-1 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"><Minus className="w-3 h-3 text-gray-600 dark:text-gray-400" /></button>
                            <span className="px-3 text-sm font-semibold text-gray-800 dark:text-gray-200">{item.quantity}</span>
                            <button onClick={() => updateQty(item.id, 1)} className="px-2 py-1 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"><Plus className="w-3 h-3 text-gray-600 dark:text-gray-400" /></button>
                          </div>
                          <span className="text-sm font-bold text-gray-900 dark:text-white">₹{item.price * item.quantity}</span>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 transition-colors self-start p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}

                  {/* Coupon */}
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
                    <div className="flex gap-2">
                      <div className="flex-1 relative">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input value={coupon} onChange={e => setCoupon(e.target.value.toUpperCase())} placeholder="Enter coupon code"
                          className="w-full pl-9 pr-3 py-2.5 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-green-400 text-gray-800 dark:text-gray-200" />
                      </div>
                      <button onClick={() => { if (coupon === 'FRESH10') setCouponApplied(true); }}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-xl transition-colors">Apply</button>
                    </div>
                    {couponApplied && <p className="text-green-600 text-xs mt-2 flex items-center gap-1">✓ Coupon applied! 10% off on your order</p>}
                    <p className="text-xs text-gray-400 mt-2">Try: <button className="text-green-600 font-medium" onClick={() => setCoupon('FRESH10')}>FRESH10</button></p>
                  </div>
                </>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 space-y-4">
                  <h2 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Delivery Details</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {[['Full Name', 'text', 'John Doe'], ['Phone', 'tel', '+91 98765 43210'], ['Email', 'email', 'john@email.com'], ['Pincode', 'text', '400050']].map(([label, type, ph]) => (
                      <div key={label}>
                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">{label}</label>
                        <input type={type} placeholder={ph} className="w-full px-3 py-2.5 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-green-400 text-gray-800 dark:text-gray-200" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Address Line 1</label>
                    <input placeholder="House no, Building name, Street" className="w-full px-3 py-2.5 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-green-400 text-gray-800 dark:text-gray-200" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[['City', 'Mumbai'], ['State', 'Maharashtra']].map(([label, ph]) => (
                      <div key={label}>
                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">{label}</label>
                        <input placeholder={ph} className="w-full px-3 py-2.5 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-green-400 text-gray-800 dark:text-gray-200" />
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3 pt-2">
                    {['Home', 'Work', 'Other'].map(t => (
                      <button key={t} className="px-4 py-1.5 text-sm border border-gray-200 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-green-400 hover:text-green-600 transition-colors">{t}</button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 space-y-4">
                  <h2 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Choose Payment Method</h2>
                  {[
                    { id: 'upi', icon: Smartphone, label: 'UPI Payment', sub: 'Google Pay, PhonePe, Paytm' },
                    { id: 'card', icon: CreditCard, label: 'Credit / Debit Card', sub: 'Visa, Mastercard, RuPay' },
                    { id: 'netbanking', icon: Building2, label: 'Net Banking', sub: 'All major banks' },
                    { id: 'cod', icon: ShoppingBag, label: 'Cash on Delivery', sub: 'Pay when delivered' },
                  ].map(({ id, icon: Icon, label, sub }) => (
                    <label key={id} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${payMethod === id ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-100 dark:border-gray-700 hover:border-green-200'}`}>
                      <input type="radio" name="pay" value={id} checked={payMethod === id} onChange={() => setPayMethod(id)} className="accent-green-600" />
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${payMethod === id ? 'bg-green-100 dark:bg-green-900/50' : 'bg-gray-100 dark:bg-gray-700'}`}>
                        <Icon className={`w-5 h-5 ${payMethod === id ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}`} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-200 text-sm">{label}</p>
                        <p className="text-xs text-gray-400">{sub}</p>
                      </div>
                    </label>
                  ))}
                  {payMethod === 'upi' && (
                    <div>
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">UPI ID</label>
                      <input placeholder="yourname@upi" className="w-full px-3 py-2.5 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-green-400 text-gray-800 dark:text-gray-200" />
                    </div>
                  )}
                </motion.div>
              )}

              <div className="flex gap-3">
                {step > 1 && (
                  <button onClick={() => setStep(s => s - 1)} className="px-5 py-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:border-green-400 transition-colors">
                    Back
                  </button>
                )}
                <button onClick={() => step < 3 ? setStep(s => s + 1) : alert('Order placed! 🎉')}
                  className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-all shadow-md hover:shadow-lg">
                  {step === 3 ? `Place Order · ₹${total}` : 'Continue'}
                </button>
              </div>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 sticky top-24">
                <h2 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Order Summary</h2>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Items ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
                    <span>₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Delivery</span>
                    <span className={delivery === 0 ? 'text-green-600' : ''}>{delivery === 0 ? 'FREE' : `₹${delivery}`}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Coupon (FRESH10)</span>
                      <span>-₹{discount}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-100 dark:border-gray-700 pt-2 flex justify-between font-bold text-gray-900 dark:text-white">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>
                {cartTotal < 500 && (
                  <p className="text-xs text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-3 py-2 rounded-lg">Add ₹{500 - cartTotal} more for free delivery!</p>
                )}
                <div className="mt-4 space-y-1.5 text-xs text-gray-400">
                  {['Freshness guaranteed', 'Secure checkout', 'Easy 7-day returns'].map(t => (
                    <p key={t} className="flex items-center gap-1.5">✅ {t}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
