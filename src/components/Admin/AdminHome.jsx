import React, { useEffect,useState } from "react";
import { Users, MapPin, Ticket, PlusCircle, Globe, BookMarked, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminHome() {

  const [users, setUsers] = useState(0);
  const [tours, setTours] = useState(0);
  const [bookings, setBookings] = useState(0);
  const [recentTours, setRecentTours] = useState([]);
   const baseUrl = import.meta.env.VITE_BASE_URL

  useEffect(() => {
    const loginData = JSON.parse(localStorage.getItem("logindetails"));

    if (!loginData || !loginData.isLogin) {
      // Not logged in → redirect to login page
      navigate("/Login");
      return;
    }
    
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/admin/adminHome`, {
          method: 'GET',
          headers: { "Content-Type": "application/json" }
        })

        const result = await response.json();
        if (result.success) {
          setUsers(result.data.users);
          setTours(result.data.tours);
          setBookings(result.data.bookings)
        }
        else
        {
          alert("data not found")
        }
      }
      catch (err) {
        console.log("error is: ", err)
      }

    }
    fetchData();
  }, [])
  useEffect(()=>{

    const fetchTourData = async()=>{

      const response = await fetch(`${baseUrl}/admin/recentTour`,{
        method:"GET",
        headers:{"Content-Type":"application/json"}
      })

      const result = await response.json();
      if(result.success)
      {
        setRecentTours(result.data);
      }
    }
    fetchTourData();
  },[])
  const statCards = [
    { title: "Total Users", count: users, icon: <Users className="w-8 h-8 text-blue-500" /> },
    { title: "Total Tours", count: tours, icon: <MapPin className="w-8 h-8 text-green-500" /> },
    { title: "Total Bookings", count: bookings, icon: <BookMarked className="w-8 h-8 text-indigo-500" /> },
    // { title: "Total Subscribers", count: subscribeCount, icon: <Mail className="w-8 h-8 text-pink-500" /> },
  ];

  const navCards = [
    { title: "Add Tour", icon: <PlusCircle className="w-8 h-8 text-orange-500" />, link: "/admin/adminAddTour" },
    { title: "View Users", icon: <Users className="w-8 h-8 text-cyan-500" />, link: "/admin/userDetails" },
    { title: "View Tours", icon: <Globe className="w-8 h-8 text-emerald-500" />, link: "/package" },
    { title: "View Bookings", icon: <Ticket className="w-8 h-8 text-purple-500" />, link: "/admin/allBooking" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 md:p-10">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-800">
        Admin Dashboard
      </h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {statCards.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center transition-all"
          >
            {item.icon}
            <h2 className="text-lg font-semibold mt-3 text-gray-700">{item.title}</h2>
            <p className="text-2xl font-bold text-green-600 mt-1">{item.count}</p>
          </motion.div>
        ))}
      </div>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {navCards.map((item, i) => (
          <motion.a
            href={item.link}
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-white to-gray-100 hover:from-blue-50 hover:to-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center text-center transition"
          >
            {item.icon}
            <h2 className="text-lg font-semibold mt-3 text-gray-800">{item.title}</h2>
          </motion.a>
        ))}
      </div>

      {/* Recent Tours Section */}
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Recent Tours</h2>

      {recentTours.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-8">
          {recentTours.map((tour, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="w-72 bg-white rounded-xl shadow-lg overflow-hidden transition-all"
            >
              <img
                src={tour.img_url}
                alt={tour.title}
                className="w-full h-44 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{tour.title}</h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">{tour.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-6">No tours available.</p>
      )}
    </div>
  );
}
