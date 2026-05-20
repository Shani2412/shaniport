import Hero from '../components/home/Hero';
import { FeaturedCategories, TopVendors, Testimonials, WhyUs } from '../components/home/Sections';
import TrendingProducts from '../components/home/TrendingProducts';

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedCategories />
      <TrendingProducts />
      <WhyUs />
      <TopVendors />
      <Testimonials />
    </main>
  );
}
