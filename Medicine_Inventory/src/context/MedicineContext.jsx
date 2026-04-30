import { createContext, useContext, useState } from "react";

const MedicineContext = createContext();

export function MedicineProvider({ children }) {
  const [medicines, setMedicines] = useState([
    {
      id: 1,
      name: "Paracetamol",
      desc: "Reduces fever & pain",
      price: 20,
      qty: 100,
    },
    {
      id: 2,
      name: "Amoxicillin",
      desc: "Antibiotic for infections",
      price: 150,
      qty: 30,
    },
    {
      id: 3,
      name: "Cetirizine",
      desc: "Antihistamine for allergies",
      price: 45,
      qty: 1,
    },
  ]);

  const addMedicine = (med) =>
    setMedicines((prev) => [...prev, { ...med, id: Date.now() }]);

  const decreaseQty = (id) =>
    setMedicines((prev) =>
      prev.map((m) => (m.id === id ? { ...m, qty: m.qty - 1 } : m)),
    );

  const increaseQty = (id, amount = 1) =>
    setMedicines((prev) =>
      prev.map((m) => (m.id === id ? { ...m, qty: m.qty + amount } : m)),
    );

  return (
    <MedicineContext.Provider
      value={{ medicines, addMedicine, decreaseQty, increaseQty }}
    >
      {children}
    </MedicineContext.Provider>
  );
}

export const useMedicine = () => useContext(MedicineContext);
