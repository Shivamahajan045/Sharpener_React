import React from "react";
import BookingItem from "./BookingItem";

function BookingList({ handleDelete, handleEdit, visibleBookings }) {
  return (
    <div className="list-card">
      <h3>Bookings</h3>
      <ul>
        {visibleBookings.map((item) => (
          <BookingItem
            key={item.id}
            item={item}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}

export default BookingList;
