export const categories = [
  { id: 1, name: 'Fresh Vegetables', icon: '🥦', count: 234, color: 'from-green-400 to-green-600' },
  { id: 2, name: 'Organic Fruits', icon: '🍎', count: 189, color: 'from-red-400 to-red-600' },
  { id: 3, name: 'Dairy & Eggs', icon: '🥛', count: 97, color: 'from-yellow-400 to-yellow-600' },
  { id: 4, name: 'Grains & Cereals', icon: '🌾', count: 156, color: 'from-amber-400 to-amber-600' },
  { id: 5, name: 'Herbs & Spices', icon: '🌿', count: 212, color: 'from-emerald-400 to-emerald-600' },
  { id: 6, name: 'Seeds & Nuts', icon: '🥜', count: 143, color: 'from-orange-400 to-orange-600' },
  { id: 7, name: 'Honey & Jams', icon: '🍯', count: 88, color: 'from-yellow-500 to-amber-600' },
  { id: 8, name: 'Fertilizers', icon: '🧪', count: 67, color: 'from-blue-400 to-blue-600' },
];

export const products = [
  { id: 1, name: 'Organic Tomatoes', price: 45, originalPrice: 60, unit: '/kg', image: 'https://images.unsplash.com/photo-1546470427-e26264be0b11?w=400&q=80', category: 'Vegetables', rating: 4.8, reviews: 234, vendor: 'Green Farms', vendorId: 1, badge: 'Organic', inStock: true, description: 'Fresh hand-picked organic tomatoes grown without pesticides. Rich in vitamins and antioxidants. Perfect for salads, sauces, and cooking.' },
  { id: 2, name: 'Red Apple (Shimla)', price: 180, originalPrice: 220, unit: '/kg', image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&q=80', category: 'Fruits', rating: 4.9, reviews: 412, vendor: 'Himalayan Orchards', vendorId: 2, badge: 'Premium', inStock: true, description: 'Premium Shimla apples from the orchards of Himachal Pradesh. Crispy, sweet, and loaded with fiber and vitamins.' },
  { id: 3, name: 'Basmati Rice (5kg)', price: 450, originalPrice: 520, unit: '/bag', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80', category: 'Grains', rating: 4.7, reviews: 189, vendor: 'Punjab Grain House', vendorId: 3, badge: 'Best Seller', inStock: true, description: 'Long-grain aromatic basmati rice from the fertile plains of Punjab. Aged for 2 years for perfect taste and aroma.' },
  { id: 4, name: 'Fresh Spinach', price: 30, originalPrice: 40, unit: '/bundle', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&q=80', category: 'Vegetables', rating: 4.6, reviews: 156, vendor: 'Green Farms', vendorId: 1, badge: 'Fresh', inStock: true, description: 'Freshly harvested spinach leaves, packed with iron, calcium and essential vitamins. Great for smoothies and cooking.' },
  { id: 5, name: 'Raw Honey (500g)', price: 320, originalPrice: 380, unit: '/jar', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=80', category: 'Honey', rating: 4.9, reviews: 298, vendor: 'Bee Natural', vendorId: 4, badge: 'Pure', inStock: true, description: 'Unprocessed raw honey sourced from forest bee colonies. Rich in enzymes, antioxidants and has natural healing properties.' },
  { id: 6, name: 'Organic Carrots', price: 55, originalPrice: 70, unit: '/kg', image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&q=80', category: 'Vegetables', rating: 4.5, reviews: 123, vendor: 'Earth Roots Farm', vendorId: 5, badge: 'Organic', inStock: true, description: 'Sweet and crunchy organic carrots harvested fresh. High in beta-carotene and great for juicing or cooking.' },
  { id: 7, name: 'Alphonso Mango (Dozen)', price: 380, originalPrice: 450, unit: '/dozen', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&q=80', category: 'Fruits', rating: 5.0, reviews: 567, vendor: 'Konkan Farms', vendorId: 6, badge: 'Seasonal', inStock: true, description: 'The king of mangoes! Premium Alphonso mangoes from Ratnagiri, Maharashtra. GI tagged, rich saffron pulp, divine taste.' },
  { id: 8, name: 'Free-Range Eggs (12)', price: 120, originalPrice: 140, unit: '/dozen', image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=400&q=80', category: 'Dairy', rating: 4.8, reviews: 341, vendor: 'Happy Hens Farm', vendorId: 7, badge: 'Free-Range', inStock: true, description: 'Fresh eggs from free-range hens. No hormones, no antibiotics. Higher in omega-3 and vitamins than caged eggs.' },
  { id: 9, name: 'Turmeric Powder (200g)', price: 85, originalPrice: 100, unit: '/pack', image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&q=80', category: 'Spices', rating: 4.7, reviews: 201, vendor: 'Spice Route', vendorId: 8, badge: 'Organic', inStock: true, description: 'Pure organic turmeric powder with high curcumin content. Anti-inflammatory, antioxidant. Direct from Kerala farms.' },
  { id: 10, name: 'Mixed Bell Peppers', price: 90, originalPrice: 110, unit: '/kg', image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&q=80', category: 'Vegetables', rating: 4.6, reviews: 88, vendor: 'Green Farms', vendorId: 1, badge: 'Fresh', inStock: false, description: 'Colorful mix of red, yellow and green bell peppers. Rich in vitamin C and antioxidants. Perfect for stir-fries.' },
  { id: 11, name: 'Coconut Oil (1L)', price: 220, originalPrice: 260, unit: '/bottle', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80', category: 'Oils', rating: 4.8, reviews: 445, vendor: 'Kerala Naturals', vendorId: 9, badge: 'Cold-Pressed', inStock: true, description: 'Cold-pressed virgin coconut oil. No chemicals or heat processing. Perfect for cooking, hair and skin care.' },
  { id: 12, name: 'Wheat Flour (10kg)', price: 380, originalPrice: 420, unit: '/bag', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=80', category: 'Grains', rating: 4.5, reviews: 167, vendor: 'Punjab Grain House', vendorId: 3, badge: 'Whole Wheat', inStock: true, description: 'Stone-ground whole wheat flour. High fiber, nutrients intact. Perfect for rotis, bread and baked goods.' },
];

export const vendors = [
  { id: 1, name: 'Green Farms', logo: '🌱', location: 'Maharashtra', rating: 4.9, products: 47, sales: 2340, joined: 'Jan 2022', verified: true, description: 'Family-owned organic farm delivering fresh produce since 2010.' },
  { id: 2, name: 'Himalayan Orchards', logo: '🏔️', location: 'Himachal Pradesh', rating: 4.8, products: 23, sales: 1890, joined: 'Mar 2022', verified: true, description: 'Premium mountain fruits from pristine Himalayan orchards.' },
  { id: 3, name: 'Punjab Grain House', logo: '🌾', location: 'Punjab', rating: 4.7, products: 34, sales: 3120, joined: 'Feb 2021', verified: true, description: 'Finest grains and cereals from the breadbasket of India.' },
  { id: 4, name: 'Bee Natural', logo: '🐝', location: 'Uttarakhand', rating: 4.9, products: 12, sales: 980, joined: 'Jun 2022', verified: true, description: 'Pure forest honey and bee products straight from the hive.' },
  { id: 5, name: 'Earth Roots Farm', logo: '🌍', location: 'Karnataka', rating: 4.6, products: 28, sales: 1450, joined: 'Apr 2022', verified: false, description: 'Certified organic vegetables grown with biodynamic practices.' },
  { id: 6, name: 'Konkan Farms', logo: '🥭', location: 'Ratnagiri', rating: 5.0, products: 8, sales: 2100, joined: 'Dec 2021', verified: true, description: 'GI-tagged Alphonso mangoes and tropical fruits from Konkan.' },
];

export const testimonials = [
  { id: 1, name: 'Priya Sharma', role: 'Home Cook', avatar: 'PS', rating: 5, text: 'Gropart has completely transformed how I shop for vegetables. The quality is exceptional and delivery is always on time. I love knowing exactly which farm my produce comes from!', location: 'Mumbai' },
  { id: 2, name: 'Rajesh Kumar', role: 'Restaurant Owner', avatar: 'RK', rating: 5, text: 'As a restaurant owner, freshness is everything. Gropart delivers consistently high-quality organic produce that my customers notice. The vendor diversity is fantastic.', location: 'Delhi' },
  { id: 3, name: 'Anita Mehta', role: 'Nutritionist', avatar: 'AM', rating: 4, text: 'I recommend Gropart to all my clients. The organic certification and transparent vendor profiles make it easy to trust what you\'re buying. Great for healthy living!', location: 'Bangalore' },
  { id: 4, name: 'Suresh Patel', role: 'Home Gardener', avatar: 'SP', rating: 5, text: 'Bought seeds and fertilizers here and the quality is outstanding. My garden has never been healthier. The customer support team is incredibly helpful.', location: 'Ahmedabad' },
];

export const orders = [
  { id: '#ORD-2847', customer: 'Priya Sharma', date: '20 May 2026', items: 3, total: 645, status: 'Delivered', payment: 'UPI' },
  { id: '#ORD-2846', customer: 'Rohan Verma', date: '20 May 2026', items: 5, total: 1240, status: 'Processing', payment: 'Card' },
  { id: '#ORD-2845', customer: 'Sunita Rao', date: '19 May 2026', items: 2, total: 380, status: 'Shipped', payment: 'COD' },
  { id: '#ORD-2844', customer: 'Amit Shah', date: '19 May 2026', items: 7, total: 1890, status: 'Delivered', payment: 'UPI' },
  { id: '#ORD-2843', customer: 'Kavitha Nair', date: '18 May 2026', items: 1, total: 180, status: 'Cancelled', payment: 'Card' },
  { id: '#ORD-2842', customer: 'Deepak Joshi', date: '18 May 2026', items: 4, total: 920, status: 'Delivered', payment: 'UPI' },
];

export const revenueData = [
  { month: 'Jan', revenue: 42000, orders: 340 },
  { month: 'Feb', revenue: 38000, orders: 290 },
  { month: 'Mar', revenue: 55000, orders: 410 },
  { month: 'Apr', revenue: 67000, orders: 520 },
  { month: 'May', revenue: 82000, orders: 640 },
  { month: 'Jun', revenue: 74000, orders: 580 },
  { month: 'Jul', revenue: 91000, orders: 720 },
  { month: 'Aug', revenue: 88000, orders: 690 },
  { month: 'Sep', revenue: 96000, orders: 750 },
  { month: 'Oct', revenue: 110000, orders: 870 },
  { month: 'Nov', revenue: 125000, orders: 980 },
  { month: 'Dec', revenue: 143000, orders: 1120 },
];

export const categoryData = [
  { name: 'Vegetables', value: 35, color: '#22c55e' },
  { name: 'Fruits', value: 25, color: '#f97316' },
  { name: 'Grains', value: 15, color: '#eab308' },
  { name: 'Dairy', value: 10, color: '#60a5fa' },
  { name: 'Spices', value: 8, color: '#a855f7' },
  { name: 'Others', value: 7, color: '#ec4899' },
];

export const adminStats = {
  totalRevenue: 1243500,
  totalOrders: 8420,
  totalVendors: 156,
  totalUsers: 24890,
  revenueGrowth: 23.5,
  ordersGrowth: 18.2,
  vendorGrowth: 12.1,
  userGrowth: 34.7,
};

export const vendorProducts = [
  { id: 1, name: 'Organic Tomatoes', category: 'Vegetables', price: 45, stock: 234, sold: 1240, status: 'Active' },
  { id: 2, name: 'Fresh Spinach', category: 'Vegetables', price: 30, stock: 89, sold: 567, status: 'Active' },
  { id: 3, name: 'Mixed Bell Peppers', category: 'Vegetables', price: 90, stock: 0, sold: 345, status: 'Out of Stock' },
  { id: 4, name: 'Cucumber', category: 'Vegetables', price: 25, stock: 145, sold: 890, status: 'Active' },
  { id: 5, name: 'Broccoli', category: 'Vegetables', price: 80, stock: 56, sold: 234, status: 'Low Stock' },
];

export const cartItems = [
  { id: 1, name: 'Organic Tomatoes', price: 45, unit: '/kg', quantity: 2, image: 'https://images.unsplash.com/photo-1546470427-e26264be0b11?w=400&q=80', vendor: 'Green Farms' },
  { id: 2, name: 'Raw Honey (500g)', price: 320, unit: '/jar', quantity: 1, image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&q=80', vendor: 'Bee Natural' },
  { id: 3, name: 'Basmati Rice (5kg)', price: 450, unit: '/bag', quantity: 1, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80', vendor: 'Punjab Grain House' },
];
