import "./App.css";
import { useState } from "react";
import Navbar from "./UI/Navbar";
import Header from "./components/Header";
import AboutSection from "./components/AboutSection";
import ToursSection from "./components/ToursSection";
import Footer from "./components/Footer";
import CartModal from "./components/CartModal";
import StoreSection from "./components/StoreSection";
import { CartProvider } from "./context/CartContext";
import { productsArr } from "./data/products";

function Storefront() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  return (
    <>
      <Navbar
        activeSection={activeSection}
        onCartClick={() => setIsCartOpen(true)}
        onSectionChange={setActiveSection}
      />

      {activeSection === "home" && (
        <>
          <Header />
          <main className="page-shell">
            <ToursSection />
          </main>
        </>
      )}

      {activeSection === "about" && (
        <main className="page-shell">
          <AboutSection />
        </main>
      )}

      {activeSection === "store" && (
        <main className="page-shell">
          <StoreSection title="Music" products={productsArr} />
        </main>
      )}

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Footer />
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <Storefront />
    </CartProvider>
  );
}

export default App;
