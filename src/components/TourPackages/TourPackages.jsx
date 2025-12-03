import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TourPackages() {
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [toursData, setTourData] = useState([]);

  const loginData = JSON.parse(localStorage.getItem("logindetails"));

  // for filters section
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    duration: "",
    location: "",
    hasOffer: ""
  });


  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this tour?")) return;

    try {
      const res = await fetch(`${baseUrl}/admin/deleteTour/${id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (result.success) {
        alert("Tour deleted successfully");
        setTourData((prev) => prev.filter((tour) => tour._id !== id));
      } else {
        alert(result.message);
      }
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  useEffect(() => {
    if (!loginData || !loginData?.isLogin) {
      navigate("/Login");
      return;
    }

    const fetchTourData = async () => {
      try {
        const response = await fetch(`${baseUrl}/tourPackage`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) throw new Error("Failed to fetch tour packages");

        const result = await response.json();

        if (result.data && result.data.tourData) {
          setTourData(result.data.tourData);
        }
      } catch (err) {
        console.error("Error fetching tours:", err);
      }
    };

    fetchTourData();
  }, []);

  // filter tour logic
  const uniqueLocations = [...new Set(toursData.map(tour => tour.start_location))];
  const filteredTours = toursData.filter((tour) => {
    const price = tour.offer?.hasOffer ? tour.offer.finalPrice : tour.price;

    // Price filter
    if (filters.minPrice && price < Number(filters.minPrice)) return false;
    if (filters.maxPrice && price > Number(filters.maxPrice)) return false;

    // Duration filter
    if (filters.duration && tour.duration !== Number(filters.duration)) return false;

    // Location filter
    if (filters.location && !tour.start_location?.toLowerCase().includes(filters.location.toLowerCase()))
      return false;

    // Offer filter
    if (filters.hasOffer === "true" && !tour.offer?.hasOffer) return false;
    if (filters.hasOffer === "false" && tour.offer?.hasOffer) return false;

    return true;
  });


  return (
    <div className="packages-page">
      <h1 className="title text-center text-3xl font-semibold mt-8">
        Popular Destinations
      </h1>
      {/* filter section */}
      {/* Filters Section */}
      <h1 className="title text-center text-2xl font-semibold mt-8">
        Filters:
      </h1>
      <div className="w-full flex flex-wrap justify-center gap-4 mt-6">

        {/* Min Price */}
        <input
          type="number"
          placeholder="Min Price"
          className="border p-2 rounded-lg w-40"
          value={filters.minPrice}
          onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
        />

        {/* Max Price */}
        <input
          type="number"
          placeholder="Max Price"
          className="border p-2 rounded-lg w-40"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
        />

        

        {/* Location Filter */}
        <select
          name="location"
          value={filters.location}
          onChange={(e)=>setFilters({...filters,location:e.target.value})}
          className="border p-2 rounded-lg"
        >
          <option value="">All Locations</option>

          {uniqueLocations.map((loc, index) => (
            <option key={index} value={loc}>
              {loc}
            </option>
          ))}
        </select>


        {/* Offer Filter */}
        <select
          className="border p-2 rounded-lg w-40"
          value={filters.hasOffer}
          onChange={(e) => setFilters({ ...filters, hasOffer: e.target.value })}
        >
          <option value="">All</option>
          <option value="true">Offer Only</option>
          <option value="false">No Offer</option>
        </select>
      </div>
      {/* main section */}

      <div className="destination-container flex flex-wrap justify-center gap-6 p-6">
        {filteredTours.map((dest) => (
          <div
            key={dest._id}
            className="destination-card w-72 border border-gray-200 shadow-md rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 relative"
          >
            {/* Offer Badge */}
            {dest.offer?.hasOffer && (
              <div className="absolute top-2 left-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold z-10 shadow-md">
                {dest.offer.discountPercent}% OFF
              </div>
            )}

            <img
              src={dest.img_url}
              alt={dest.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-4 text-center">
              <h2 className="text-xl font-bold mb-2">{dest.title}</h2>
              <p className="text-gray-600 text-sm mb-2">{dest.description}</p>

              {/* Price */}
              {dest.offer?.hasOffer ? (<p className="text-gray-800 font-semibold mb-2 line-through">
                Price: ₹{dest.price}
              </p>) : (<p className="text-gray-800 font-semibold mb-2">
                Price: ₹{dest.price}
              </p>)}


              {/* Final Price if offer exists */}
              {dest.offer?.hasOffer && (
                <p className="text-green-600 font-bold mb-2">
                  Now: ₹{dest.offer.finalPrice}
                </p>
              )}
              <p className="text-gray-600 text-sm mb-2">Start Location: {dest.start_location}</p>
              <p className="text-gray-600 text-sm mb-2">End Location: {dest.end_location}</p>
              

              {/* Admin / User Actions */}
              {loginData?.userType === "admin" ? (
                <div className="flex justify-center gap-2">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all hover:cursor-pointer"
                    onClick={() =>
                      navigate("/admin/adminAddTour", { state: dest })
                    }
                  >
                    Edit Package
                  </button>

                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all hover:cursor-pointer"
                    onClick={() => handleDelete(dest._id)}
                  >
                    Delete
                  </button>
                </div>
              ) : (
                <button
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all hover:cursor-pointer"
                  onClick={() => navigate("/booktour", { state: dest })}
                >
                  Book Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
