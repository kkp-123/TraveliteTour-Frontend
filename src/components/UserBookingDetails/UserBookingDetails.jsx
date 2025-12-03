import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import jsPDF from "jspdf";
import {autoTable} from "jspdf-autotable";


export default function UserBookingDetails(){
    const navigate = useNavigate();
    const loginData = JSON.parse(localStorage.getItem('logindetails'));
    const Base_url = import.meta.env.VITE_BASE_URL;
    if(!loginData)
    {
        navigate("/Login");
    }
    
    const userid = loginData?.userid
    console.log(userid);
    const [userTourData,setUserTourData] = useState([]);

   // reciept code
const downloadReceipt = (tour) => {
  const doc = new jsPDF();

  // heading
  doc.setFontSize(18);
  doc.setTextColor("#1f2937"); // gray-800
  doc.text("Travelite Tours & Travels", 14, 20);

  doc.setFontSize(11);
  doc.setTextColor("#6b7280"); // gray-500
  doc.text("Booking Receipt", 14, 30);

  doc.setLineWidth(0.5);
  doc.setDrawColor("#e5e7eb"); // gray-200
  doc.line(14, 35, 195, 35);

  // Booking Details
  const rows = [
    ["Booking ID", tour._id],
    ["Tour Name", tour?.title],
    ["Customer Name", tour.name],
    ["Email", tour.email],
    ["Departure Date", new Date(tour.departure_date).toLocaleDateString()],
    ["Persons", tour.persons],
  ];

  autoTable(doc,{
    startY: 45,
    head: [["Field", "Details"]],
    body: rows,
    theme: "grid",
    headStyles: {
      fillColor: [59, 130, 246], // blue-500
      textColor: 255,
      halign: "center",
    },
    bodyStyles: { textColor: "#1f2937" },
    styles: { fontSize: 11 },
    columnStyles: {
      0: { cellWidth: 50, fontStyle: "bold" },
      1: { cellWidth: 130 },
    },
  });

  //  Price Box 
  const finalY = doc.lastAutoTable.finalY + 15;

  doc.setFillColor("#f3f4f6"); // gray-100
  doc.rect(14, finalY, 182, 25, "F");

  doc.setFontSize(13);
  doc.setTextColor("#1f2937"); // dark
  doc.text(`Total Price: ₹${tour.price}`, 20, finalY + 17);

  // --- Footer ---
  doc.setFontSize(10);
  doc.setTextColor("#9ca3af"); // gray-400
  doc.text("Thank you for booking with Travelite Tours & Travels.", 14, finalY + 40);

  doc.save(`Booking_Receipt_${tour._id}_${Date.now()}.pdf`);
};


    useEffect(()=>{

        const fetchTour = async()=>{

            const tdata = await fetch(`${Base_url}/BookingDetails`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({userid:userid})
            }) 
            const result = await tdata.json();
            if(result.success)
            {
                console.log("data fetch successfully",result.data);
                setUserTourData(result.data)
            }
        }
        fetchTour();
    },[])
    return(
       <div className="w-full min-h-screen bg-gray-100 py-10 px-4">
  <h1 className="text-3xl font-bold text-center mb-8">Your Bookings</h1>

  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
    {userTourData.length === 0 ? (
      <p className="text-center text-gray-600 col-span-full text-lg">
        No bookings found.
      </p>
    ) : (
      userTourData.map((tour) => (
        <div
  key={tour._id}
  className="bg-white rounded-xl shadow-lg p-5 hover:shadow-2xl transition-all border"
>
  {/* IMAGE */}
  <img
    src={tour?.tourid?.img_url}
    alt="Tour Image"
    className="w-full h-48 object-cover rounded-lg mb-3"
  />

  <h2 className="text-2xl font-semibold text-indigo-600 mb-2">
    {tour?.tourid?.title}
  </h2>

  <div className="space-y-2 text-gray-700">
    <p><span className="font-semibold">Name:</span> {tour.name}</p>
    <p><span className="font-semibold">Email:</span> {tour.email}</p>
    <p><span className="font-semibold">Departure Date:</span> {new Date(tour.departure_date).toLocaleDateString()}</p>
    <p><span className="font-semibold">Persons:</span> {tour.persons}</p>
    <p>
      <span className="font-semibold">Price:</span> ₹{tour.price}
    </p>
  </div>


  <button
  className="mt-2 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
  onClick={() => downloadReceipt(tour)}
>
  Download Receipt
</button>
</div>
     ))
    )}
  </div>
</div>

    )
}