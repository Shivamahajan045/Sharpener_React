import { MedicineProvider } from "./context/MedicineContext";
import { CartProvider } from "./context/CartContext";
import AddMedicineForm from "./components/AddMedicineForm";
import MedicineList from "./components/MedicineList";
import Cart from "./components/Cart";
import "./App.css";

export default function App() {
  return (
    <MedicineProvider>
      <CartProvider>
        <div className="page">
          <header className="header">
            <span className="header-logo">💊</span>
            <div>
              <h1 className="header-title">MediTrack</h1>
              <p className="header-sub">Medicine Shop Inventory Management</p>
            </div>
          </header>
          <main className="layout">
            <div className="left-col">
              <AddMedicineForm />
              <MedicineList />
            </div>
            <div className="right-col">
              <Cart />
            </div>
          </main>
        </div>
      </CartProvider>
    </MedicineProvider>
  );
}
