import React, { useState } from "react";

function FormSection() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    busNumber: "Bus 1",
  });

  const [bus, setBus] = useState([]);

  const [editIndex, setEditIndex] = useState(null);

  const [filterBus, setFilterBus] = useState("ALL");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedBus = [...bus];
      updatedBus[editIndex] = user;
      setBus(updatedBus);
      setEditIndex(null);
    } else {
      setBus([...bus, user]);
    }

    setUser({
      name: "",
      email: "",
      phone: "",
      busNumber: "Bus 1",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleDelete = (id) => {
    setBus(bus.filter((_, index) => id !== index));
  };

  const handleEdit = (id) => {
    const usertobeEdited = bus[id];
    setUser(usertobeEdited);
    setEditIndex(id);
  };

  const handleSelectChange = (e) => {
    setFilterBus(e.target.value);
  };

  const filteredBus =
    filterBus === "ALL"
      ? bus
      : bus.filter((item) => item.busNumber === filterBus);

  return (
    <>
      <section className="container">
        <div className="form-card">
          <form onSubmit={handleFormSubmit}>
            <div>
              <label>Name</label>
              <input
                name="name"
                value={user.name}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label>Email</label>
              <input
                name="email"
                value={user.email}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label>Phone</label>
              <input
                name="phone"
                value={user.phone}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label>Bus Number</label>
              <select
                name="busNumber"
                value={user.busNumber}
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

        <div className="filter">
          <label>Filter by Bus:</label>
          <select value={filterBus} onChange={handleSelectChange}>
            <option value="ALL">All</option>
            <option value="Bus 1">Bus 1</option>
            <option value="Bus 2">Bus 2</option>
            <option value="Bus 3">Bus 3</option>
          </select>
        </div>

        <div className="list-card">
          <h3>Bookings</h3>
          <ul>
            {filteredBus.map((item, index) => (
              <li key={index} className="list-item">
                <span>
                  <strong>{item.name}</strong>
                  <small>{item.email}</small>
                  <small>
                    📞 {item.phone} &nbsp; 🚌 {item.busNumber}
                  </small>
                </span>

                <div className="actions">
                  <button onClick={() => handleEdit(index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default FormSection;
