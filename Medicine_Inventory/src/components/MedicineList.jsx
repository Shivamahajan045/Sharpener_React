import { useMedicine } from "../context/MedicineContext";
import { useCart } from "../context/CartContext";

export default function MedicineList() {
  const { medicines } = useMedicine();
  const { addToCart } = useCart();

  return (
    <div className="card">
      <h2 className="section-title">Medicine Inventory</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Medicine</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((med) => {
              const outOfStock = med.qty <= 0;
              return (
                <tr key={med.id} style={{ opacity: outOfStock ? 0.6 : 1 }}>
                  <td>
                    <strong>{med.name}</strong>
                  </td>
                  <td className="muted">{med.desc || "—"}</td>
                  <td>₹{med.price}</td>
                  <td>
                    <span
                      className={
                        outOfStock ? "badge badge-out" : "badge badge-in"
                      }
                    >
                      {outOfStock ? "Out of stock" : `${med.qty} left`}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn-add"
                      disabled={outOfStock}
                      onClick={() => addToCart(med)}
                    >
                      {outOfStock ? "Unavailable" : "+ Add"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
