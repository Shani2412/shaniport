import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import ProductsPage from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import { Login, Register, ForgotPassword } from './pages/Auth';
import VendorDashboard from './pages/VendorDashboard';
import AdminDashboard from './pages/AdminDashboard';

function Layout() {
  const location = useLocation();
  const noLayout = ['/vendor', '/admin', '/login', '/register', '/forgot-password'].some(p => location.pathname.startsWith(p));

  return (
    <div className="min-h-screen flex flex-col">
      {!noLayout && <Navbar />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/vendor/*" element={<VendorDashboard />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>
      </main>
      {!noLayout && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </AppProvider>
  );
}
