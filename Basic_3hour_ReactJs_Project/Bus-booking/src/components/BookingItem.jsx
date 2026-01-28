import React from "react";

function BookingItem({ item, handleDelete, handleEdit }) {
  return (
    <li className="list-item">
      <span>
        <strong>{item.name}</strong>
        <small>{item.email}</small>
        <small>
          📞 {item.phone} &nbsp; 🚌 {item.busNumber}
        </small>
      </span>

      <div className="actions">
        <button onClick={() => handleEdit(item.id)}>Edit</button>
        <button onClick={() => handleDelete(item.id)}>Delete</button>
      </div>
    </li>
  );
}

export default BookingItem;
