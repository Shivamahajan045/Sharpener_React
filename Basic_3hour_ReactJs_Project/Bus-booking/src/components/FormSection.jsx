import React, { useState } from "react";
import BookingForm from "./BookingForm";
import Filter from "./Filter";
import BookingList from "./BookingList";

function FormSection() {
  const initialFormData = {
    name: "",
    email: "",
    phone: "",
    busNumber: "Bus 1",
  };
  const [formData, setFormData] = useState(initialFormData);

  const [bookings, setBookings] = useState([]);

  const [editIndex, setEditIndex] = useState(null);

  const [filterBus, setFilterBus] = useState("ALL");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === editIndex ? { ...formData, id: editIndex } : booking,
        ),
      );
      setEditIndex(null);
    } else {
      setBookings((prev) => [
        ...prev,
        { ...formData, id: crypto.randomUUID() },
      ]);
    }

    setFormData(initialFormData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDelete = (id) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  const handleEdit = (id) => {
    const bookingToEdit = bookings.find((b) => b.id === id);
    setFormData(bookingToEdit);
    setEditIndex(id);
  };

  const handleSelectChange = (e) => {
    setFilterBus(e.target.value);
  };

  const visibleBookings =
    filterBus === "ALL"
      ? bookings
      : bookings.filter((b) => b.busNumber === filterBus);

  return (
    <>
      <section className="container">
        <BookingForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleFormSubmit={handleFormSubmit}
          editIndex={editIndex}
        />

        <Filter filterBus={filterBus} handleSelectChange={handleSelectChange} />

        <BookingList
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          visibleBookings={visibleBookings}
        />
      </section>
    </>
  );
}

export default FormSection;
