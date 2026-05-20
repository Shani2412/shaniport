import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Leaf, Mail, Lock, User, Phone, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

function AuthInput({ icon: Icon, ...props }) {
  return (
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input {...props} className="w-full pl-9 pr-4 py-3 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 dark:focus:ring-green-900 text-gray-800 dark:text-gray-200 placeholder-gray-400 transition-all" />
    </div>
  );
}

export function Login() {
  const [showPw, setShowPw] = useState(false);
  const { setUser } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ name: 'Demo User', email: 'demo@gropart.in' });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center shadow-md">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-2xl font-bold text-green-800 dark:text-green-400">Gro<span className="text-green-500">part</span></span>
          </Link>
          <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white">Welcome back</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Sign in to your account</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-4">
            <AuthInput icon={Mail} type="email" placeholder="Email address" defaultValue="demo@gropart.in" />
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type={showPw ? 'text' : 'password'} placeholder="Password" defaultValue="password123"
                className="w-full pl-9 pr-10 py-3 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 dark:focus:ring-green-900 text-gray-800 dark:text-gray-200 placeholder-gray-400 transition-all" />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600 dark:text-gray-400 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-green-600" /> Remember me
              </label>
              <Link to="/forgot-password" className="text-green-600 hover:text-green-700 font-medium">Forgot password?</Link>
            </div>

            <button type="submit" className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-all shadow-md hover:shadow-lg">
              Sign In
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200 dark:border-gray-700" /></div>
            <div className="relative flex justify-center text-xs text-gray-400 bg-white dark:bg-gray-800 px-3">or continue with</div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {['Google', 'Facebook'].map(p => (
              <button key={p} className="py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all">
                {p === 'Google' ? '🔍' : '📘'} {p}
              </button>
            ))}
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Don't have an account? <Link to="/register" className="text-green-600 font-semibold hover:text-green-700">Sign up</Link>
        </p>
      </motion.div>
    </div>
  );
}

export function Register() {
  const [showPw, setShowPw] = useState(false);
  const [role, setRole] = useState('buyer');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center shadow-md">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-2xl font-bold text-green-800 dark:text-green-400">Gro<span className="text-green-500">part</span></span>
          </Link>
          <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white">Create account</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Join India's largest agri marketplace</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
          {/* Role toggle */}
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1 mb-6">
            {['buyer', 'vendor'].map(r => (
              <button key={r} onClick={() => setRole(r)}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all capitalize ${role === r ? 'bg-white dark:bg-gray-600 text-green-700 dark:text-green-400 shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}>
                {r === 'buyer' ? '🛒 Buyer' : '🌾 Vendor/Farmer'}
              </button>
            ))}
          </div>

          <form onSubmit={e => { e.preventDefault(); navigate('/login'); }} className="space-y-4">
            <AuthInput icon={User} type="text" placeholder="Full name" />
            <AuthInput icon={Mail} type="email" placeholder="Email address" />
            <AuthInput icon={Phone} type="tel" placeholder="Phone number" />
            {role === 'vendor' && <AuthInput icon={User} type="text" placeholder="Farm/Business name" />}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type={showPw ? 'text' : 'password'} placeholder="Create password"
                className="w-full pl-9 pr-10 py-3 text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-green-400 text-gray-800 dark:text-gray-200 placeholder-gray-400" />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <label className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400">
              <input type="checkbox" className="w-4 h-4 accent-green-600 mt-0.5" />
              I agree to Gropart's <a href="#" className="text-green-600">Terms of Service</a> and <a href="#" className="text-green-600">Privacy Policy</a>
            </label>

            <button type="submit" className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-all shadow-md hover:shadow-lg">
              Create Account
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Already have an account? <Link to="/login" className="text-green-600 font-semibold hover:text-green-700">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}

export function ForgotPassword() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
          <Link to="/login" className="flex items-center gap-1 text-sm text-gray-500 hover:text-green-600 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to login
          </Link>

          {!sent ? (
            <>
              <div className="text-center mb-6">
                <div className="w-14 h-14 bg-green-100 dark:bg-green-900/40 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Mail className="w-7 h-7 text-green-600 dark:text-green-400" />
                </div>
                <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white">Forgot Password?</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Enter your email and we'll send a reset link</p>
              </div>
              <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-4">
                <AuthInput icon={Mail} type="email" placeholder="Your email address" />
                <button type="submit" className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-all shadow-md">
                  Send Reset Link
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="text-5xl mb-4">📧</div>
              <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white mb-2">Check your email</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">We've sent a password reset link to your email address.</p>
              <Link to="/login" className="block w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold text-center transition-all">
                Back to Login
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
