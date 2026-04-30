import { useState } from "react";
import { useMedicine } from "../context/MedicineContext";

export default function AddMedicineForm() {
  const { addMedicine } = useMedicine();
  const [form, setForm] = useState({ name: "", desc: "", price: "", qty: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!form.name || !form.price || !form.qty) {
      setError("Name, price and quantity are required.");
      return;
    }
    addMedicine({ ...form, price: Number(form.price), qty: Number(form.qty) });
    setForm({ name: "", desc: "", price: "", qty: "" });
    setError("");
  };

  return (
    <div className="card">
      <h2 className="section-title">Add New Medicine</h2>
      {error && <p className="error">{error}</p>}
      <div className="form-grid">
        <div className="form-group">
          <label>Medicine Name</label>
          <input
            name="name"
            placeholder="e.g. Paracetamol"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            name="desc"
            placeholder="e.g. Used for fever"
            value={form.desc}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Price (₹)</label>
          <input
            name="price"
            type="number"
            placeholder="e.g. 50"
            value={form.price}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Quantity Available</label>
          <input
            name="qty"
            type="number"
            placeholder="e.g. 100"
            value={form.qty}
            onChange={handleChange}
          />
        </div>
      </div>
      <button className="btn-primary" onClick={handleSubmit}>
        Add Medicine
      </button>
    </div>
  );
}
