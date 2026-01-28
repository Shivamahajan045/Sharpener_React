import React from "react";

function BookingForm({
  handleFormSubmit,
  handleInputChange,
  formData,
  editIndex,
}) {
  return (
    <div className="form-card">
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Phone</label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Bus Number</label>
          <select
            name="busNumber"
            value={formData.busNumber}
            onChange={handleInputChange}
          >
            <option value="Bus 1">Bus 1</option>
            <option value="Bus 2">Bus 2</option>
            <option value="Bus 3">Bus 3</option>
          </select>
        </div>

        <button type="submit">
          {editIndex !== null ? "Update Booking" : "Book"}
        </button>
      </form>
    </div>
  );
}

export default BookingForm;
