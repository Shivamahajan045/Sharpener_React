import "./App.css";
import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./UI/Navbar";
import Header from "./components/Header";
import AboutSection from "./components/AboutSection";
import ToursSection from "./components/ToursSection";
import Footer from "./components/Footer";
import CartModal from "./components/CartModal";
import StoreSection from "./components/StoreSection";
import { CartProvider } from "./context/CartContext";
import { productsArr } from "./data/products";

function HomePage() {
  return (
    <>
      <Header />
      <main className="page-shell">
        <ToursSection />
      </main>
    </>
  );
}

function AboutPage() {
  return (
    <main className="page-shell">
      <AboutSection />
    </main>
  );
}

function StorePage() {
  return (
    <main className="page-shell">
      <StoreSection title="Music" products={productsArr} />
    </main>
  );
}

function Storefront() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <Navbar onCartClick={() => setIsCartOpen(true)} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Storefront />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
