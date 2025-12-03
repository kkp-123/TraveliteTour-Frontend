import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function AdminAddTour() {
  const location = useLocation();
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  // If editing, state contains the tour object
  const editData = location.state || null;

  // Form data should not initialize until we know editing or adding
  const [formData, setFormData] = useState(null);

  // Load form data on first render
  useEffect(() => {
    if (editData) {
      // Set existing data for editing
      setFormData({
        title: editData.title,
        description: editData.description,
        price: editData.price,
        duration: editData.duration,
        start_location: editData.start_location,
        end_location: editData.end_location,
        img_url: editData.img_url,
        offer:editData?.offer.discountPercent || 0
      });
    } else {
      // Empty form for adding
      setFormData({
        title: "",
        description: "",
        price: "",
        duration: "",
        start_location: "",
        end_location: "",
        img_url: "",
        offer: 0,
      });
    }
  }, [editData]);

  // loadin data 
  
  if (!formData) return <div className="p-10 text-center">Loading...</div>;

  // Update form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    let val = value;
    if (name === "offer") {
      val = Number(value);
      if (val < 0) val = 0;
      if (val > 100) val = 100;
    }
    setFormData(prev => ({ ...prev, [name]: val }));
  };


  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editData) {
      const confirmUpdate = window.confirm("Are you sure you want to update this tour?");
      if (!confirmUpdate) return; // Stop if user clicks Cancel
    }



    try {
      const url = editData
        ? `${baseUrl}/admin/updateTour/${editData._id}`
        : `${baseUrl}/admin/addTour`;

      const method = editData ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.success) {

        navigate("/package");
      }
      else {
        console.log(result.message);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 flex justify-center items-center py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl w-full max-w-lg p-8 space-y-5"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {editData ? "Update Tour" : "Add New Tour"}
        </h2>

        {/* Title */}
        <div>
          <label htmlFor="title" className="block font-medium text-gray-700 mb-1">
            Title<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block font-medium text-gray-700 mb-1">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Duration */}
        <div>
          <label htmlFor="duration" className="block font-medium text-gray-700 mb-1">
            Duration
          </label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Start Location */}
        <div>
          <label htmlFor="start_location" className="block font-medium text-gray-700 mb-1">
            Start Location
          </label>
          <input
            type="text"
            id="start_location"
            name="start_location"
            value={formData.start_location}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* End Location */}
        <div>
          <label htmlFor="end_location" className="block font-medium text-gray-700 mb-1">
            End Location
          </label>
          <input
            type="text"
            id="end_location"
            name="end_location"
            value={formData.end_location}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Image URL */}
        <div>
          <label htmlFor="img_url" className="block font-medium text-gray-700 mb-1">
            Image URL
          </label>
          <input
            type="url"
            id="img_url"
            name="img_url"
            value={formData.img_url}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="img_url" className="block font-medium text-gray-700 mb-1">
            Offer
          </label>

          <input
            type="number"
            id="offer"
            name="offer"
            value={formData.offer}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg font-semibold transition duration-200"
        >
          {editData ? "Update Tour" : "Add Tour"}
        </button>
      </form>
    </div>
  );
}
