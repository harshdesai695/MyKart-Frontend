import React, { useState } from "react";
import "./modal.css";

export const AddressModal = ({ isOpen, onClose, onSubmit }) => {
  const initialFormState = {
    homeNo: "",
    streetLine1: "",
    streetLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    addressType: "",
  };

  const [address, setAddress] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(address);
    // Optional: Reset form after submission
    setAddress(initialFormState);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Add New Address</h3>
          <button className="modal-close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit} className="address-form">
            <div className="form-group">
              <label htmlFor="homeNo">Home No/AppartmentNo</label>
              <input
                type="text"
                id="homeNo"
                name="homeNo"
                value={address.homeNo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="streetLine1">Street Line 1</label>
              <input
                type="text"
                id="streetLine1"
                name="streetLine1"
                value={address.streetLine1}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="streetLine2">Street Line 2 (Optional)</label>
              <input
                type="text"
                id="streetLine2"
                name="streetLine2"
                value={address.streetLine2}
                onChange={handleChange}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={address.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={address.state}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="postalCode">Postal Code</label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={address.postalCode}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={address.country}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="addressType">Address Type</label>
              <select
                id="addressType"
                name="addressType"
                value={address.addressType}
                onChange={handleChange}
              >
                <option value="Home">Home</option>
                <option value="Work">Work</option>
                <option value="Friend">Friend</option>
              </select>
            </div>
            <div className="modal-footer">
              <button type="submit" className="submit-btn">
                Save Address
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
